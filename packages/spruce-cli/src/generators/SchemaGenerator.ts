import path from 'path'
import { ISchemaDefinition } from '@sprucelabs/schema'
import { IFieldTemplateItem, ISchemaTemplateItem } from '@sprucelabs/schema'
import { templates } from '@sprucelabs/spruce-templates'
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import AbstractGenerator from './AbstractGenerator'

export interface IGenerateSchemaTypesOptions {
	fieldTemplateItems: IFieldTemplateItem[]
	schemaTemplateItems: ISchemaTemplateItem[]
	clean: boolean
}

export interface ISchemaTypesGenerationPhase {
	name: string
	errors: SpruceError[]
	successfulSchemas: number
	successfulFields: number
}
export default class SchemaGenerator extends AbstractGenerator {
	/** Generate a type file from a definition file */
	public async generateTypesFromDefinitionFile(
		sourceFile: string,
		destinationDir: string,
		template: 'errorTypes' = 'errorTypes'
	): Promise<{
		camelName: string
		pascalName: string
		description: string
		readableName: string
		definition: ISchemaDefinition
		generatedFiles: {
			schemaTypes: string
		}
	}> {
		const definition = await this.services.vm.importDefinition(sourceFile)

		//Get variations on name
		const {
			camelName,
			pascalName,
			readableName
		} = this.utilities.schema.generateNames(definition)
		const description = definition.description

		// Files
		const newFileName = `${camelName}.types.ts`
		const destination = path.join(destinationDir, newFileName)

		// Relative paths
		const relativeToDefinition = path.relative(
			path.dirname(destination),
			sourceFile
		)

		// TODO what should the namespace be? slug pulled from somewhere
		const schemaTemplateItems = await this.stores.schema.schemaTemplateItems({
			includeErrors: false
		})

		// Contents
		const contents = this.templates[template]({
			schemaTemplateItems,
			definition,
			camelName,
			pascalName,
			description:
				description || `Description missing in schema defined in ${sourceFile}`,
			relativeToDefinition: relativeToDefinition.replace(
				path.extname(relativeToDefinition),
				''
			)
		})

		// Does a file exist already, erase it
		this.deleteFile(destination)

		// Write
		this.writeFile(destination, contents)

		return {
			camelName,
			pascalName,
			definition,
			description: description || '*definition missing*',
			readableName,
			generatedFiles: {
				schemaTypes: destination
			}
		}
	}

	/** Generate the field type unions */
	public async generateSchemaTypes(
		destinationDir: string,
		options: IGenerateSchemaTypesOptions
	): Promise<{
		resultsByStage: ISchemaTypesGenerationPhase[]
		generatedFiles: {
			schemaTypes: string
			fieldsTypes: string
			fieldType: string
			fieldClassMap: string
		}
	}> {
		const { fieldTemplateItems, schemaTemplateItems } = options

		// Destinations
		const fieldsTypesDestination = path.join(
			destinationDir,
			'fields',
			'fields.types.ts'
		)
		const fieldClassMapDestination = path.join(
			destinationDir,
			'fields',
			'fieldClassMap.ts'
		)
		const fieldTypeDestination = path.join(
			destinationDir,
			'fields',
			'fieldType.ts'
		)

		const schemaTypesDestination = path.join(destinationDir, 'schemas.types.ts')

		// Generate in stages, starting with core only
		const coreSchemaTemplateItems = schemaTemplateItems.filter(
			i => i.namespace === 'core'
		)

		const coreFieldTemplateItems = fieldTemplateItems.filter(
			i => i.package === '@sprucelabs/schema'
		)

		const stages = [
			{
				// Stage 1, core
				name: 'core',
				schemaTemplateItems: coreSchemaTemplateItems,
				fieldTemplateItems: coreFieldTemplateItems
			},
			{
				// Stage 2, everything
				name: 'everything',
				schemaTemplateItems,
				fieldTemplateItems
			}
		]

		const resultsByStage = []

		for (const stage of stages) {
			const {
				schemaTemplateItems: schemaTemplateItemsStage,
				fieldTemplateItems,
				name
			} = stage
			try {
				// We may need to remove template items if they error below
				let schemaTemplateItems = [...schemaTemplateItemsStage]

				// Field Types
				const fieldsTypesContent = templates.fieldsTypes({
					fieldTemplateItems
				})

				// Field class map
				const fieldClassMapContent = templates.fieldClassMap({
					fieldTemplateItems
				})

				// Field type enum
				const fieldTypeContent = templates.fieldType({
					fieldTemplateItems
				})

				// Write out field types
				await this.writeFile(fieldsTypesDestination, fieldsTypesContent)

				// Write out class map
				await this.writeFile(fieldClassMapDestination, fieldClassMapContent)

				// Write out field type enum
				await this.writeFile(fieldTypeDestination, fieldTypeContent)

				// Build the ValueType hash to pass to schemasTypes
				const {
					valueTypes,
					errors
				} = await this.services.valueType.allValueTypes({
					schemaTemplateItems,
					fieldTemplateItems
				})

				// If there were errors, remove any definitions that had them
				if (errors.length > 0) {
					errors.forEach(err => {
						const { options } = err
						if (options.code === ErrorCode.ValueTypeServiceError) {
							schemaTemplateItems = schemaTemplateItems.filter(
								item => item.id !== options.schemaId
							)
						}
					})
				}

				// Schema types
				const schemaTypesContents = templates.schemasTypes({
					schemaTemplateItems,
					fieldTemplateItems,
					valueTypeGenerator: (renderAs, definition) => {
						// If there is a value set on the definition, return that instead of the generated type
						if (typeof definition.value !== 'undefined') {
							if (typeof definition.value === 'string') {
								return '`' + definition.value + '`'
							} else {
								return JSON.stringify(definition.value)
							}
						}

						const key = this.services.valueType.generateKey(
							renderAs,
							definition
						)
						const valueType = valueTypes[key]
						if (!valueType) {
							throw new Error(
								`failed to field ${renderAs} for ${key}: field: ${JSON.stringify(
									definition
								)}`
							)
						}
						return valueType
					}
				})

				//Write out schema types
				await this.writeFile(schemaTypesDestination, schemaTypesContents)

				resultsByStage.push({
					name,
					errors,
					successfulSchemas: schemaTemplateItems.length,
					successfulFields: fieldTemplateItems.length
				})
			} catch (err) {
				resultsByStage.push({
					name,
					errors: [
						new SpruceError({
							code: ErrorCode.ValueTypeServiceStageError,
							stage: name,
							originalError: err
						})
					],
					// TODO: Make this work
					successfulFields: 0,
					successfulSchemas: 0
				})
			}
		}

		return {
			resultsByStage,
			generatedFiles: {
				schemaTypes: schemaTypesDestination,
				fieldType: fieldTypeDestination,
				fieldsTypes: fieldsTypesDestination,
				fieldClassMap: fieldClassMapDestination
			}
		}
	}
}
