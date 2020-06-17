import path from 'path'
import { ISchemaDefinition } from '@sprucelabs/schema'
import { IFieldTemplateItem, ISchemaTemplateItem } from '@sprucelabs/schema'
import { templates } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
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
	public async generateTypesFromDefinitionFile(options: {
		sourceFile: string
		destinationDir: string
		schemaLookupDir: string
		template: 'errorTypes'
	}): Promise<{
		nameCamel: string
		namePascal: string
		description: string
		nameReadable: string
		definition: ISchemaDefinition
		generatedFiles: {
			schemaTypes: string
		}
	}> {
		const {
			sourceFile,
			destinationDir,
			schemaLookupDir,
			template = 'errorTypes'
		} = options

		const definition = await this.services.vm.importDefinition(sourceFile)

		//Get variations on name
		const {
			nameCamel,
			namePascal,
			nameReadable
		} = this.utilities.schema.buildNames(definition)
		const description = definition.description

		// Files
		const newFileName = `${nameCamel}.types.ts`
		const destination = path.join(destinationDir, newFileName)

		// Relative paths
		const relativeToDefinition = path.relative(
			path.dirname(destination),
			sourceFile
		)

		const schemaTemplateItems = await this.stores.schema.schemaTemplateItems({
			includeErrors: false,
			localLookupDir: schemaLookupDir
		})

		// Contents
		const contents = this.templates[template]({
			schemaTemplateItems,
			definition,
			nameCamel,
			namePascal,
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
			nameCamel,
			namePascal,
			definition,
			description: description || '*definition missing*',
			nameReadable,
			generatedFiles: {
				schemaTypes: destination
			}
		}
	}

	/** Generate the type files required for a schema */
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
			normalizedDefinitions: { id: string; path: string }[]
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
			i => i.namespace === 'Core'
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
		const normalizedDefinitions: { id: string; path: string }[] = []

		let successfulSchemas = 0
		let successfulFields = 0

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

				successfulFields += fieldTemplateItems.length

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
				// definitions for each schema
				await Promise.all(
					schemaTemplateItems.map(async templateItem => {
						// only normalize this schema once for all stages
						if (!normalizedDefinitions.find(n => n.id === templateItem.id)) {
							const destination = path.join(
								destinationDir,
								this.utilities.names.toCamel(templateItem.namespace),
								`${templateItem.nameCamel}.definition.ts`
							)

							const definition = templates.definition({
								...templateItem,
								schemaTemplateItems,
								fieldTemplateItems,
								valueTypes
							})

							await fs.ensureFile(destination)
							await fs.writeFile(destination, definition)

							normalizedDefinitions.push({
								id: templateItem.namePascal,
								path: destination
							})

							successfulSchemas++
						}
					})
				)

				// Schema types
				const schemaTypesContents = templates.schemasTypes({
					schemaTemplateItems,
					fieldTemplateItems,
					valueTypes
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
					successfulFields,
					successfulSchemas
				})
			}
		}

		return {
			resultsByStage,
			generatedFiles: {
				schemaTypes: schemaTypesDestination,
				fieldType: fieldTypeDestination,
				fieldsTypes: fieldsTypesDestination,
				fieldClassMap: fieldClassMapDestination,
				normalizedDefinitions
			}
		}
	}
}
