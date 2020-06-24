import path from 'path'
import { IFieldTemplateItem, ISchemaTemplateItem } from '@sprucelabs/schema'
import {
	templates,
	IDefinitionBuilderTemplateItem
} from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import { LATEST_HANDLEBARS } from '../constants'
import SpruceError from '../errors/SpruceError'
import ValueTypeService from '../services/ValueTypeService'
import { IGeneratedFile } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import versionUtil from '../utilities/version.utility'
import AbstractGenerator from './AbstractGenerator'

export interface IGenerateSchemaTypesOptions {
	fieldTemplateItems: IFieldTemplateItem[]
	schemaTemplateItems: ISchemaTemplateItem[]
	clean?: boolean
}

export interface ISchemaGeneratorBuildResults {
	generatedFiles: IGeneratedFile[]
}

export interface ISchemaGeneratorSyncResults {
	resultsByStage: ISchemaTypesGenerationStage[]
	generatedFiles: IGeneratedFile[]
	updatedFiles: IGeneratedFile[]
}

export interface ISchemaTypesGenerationStage {
	name: string
	errors: SpruceError[]
	successfulSchemas: number
	successfulFields: number
}
export default class SchemaGenerator extends AbstractGenerator {
	//@ts-ignore
	private valueTypeService: ValueTypeService

	public async generateBuilder(
		destinationDir: string,
		options: IDefinitionBuilderTemplateItem
	): Promise<ISchemaGeneratorBuildResults> {
		const resolvedBuilderDestination = versionUtil.resolveNewLatestPath(
			destinationDir,
			LATEST_HANDLEBARS,
			`${options.nameCamel}.builder.ts`
		)

		const definitionBuilder = templates.definitionBuilder(options)

		await diskUtil.writeFile(resolvedBuilderDestination, definitionBuilder)

		return {
			generatedFiles: [
				{
					name: 'Builder',
					path: resolvedBuilderDestination,
					description: 'The file from which all '
				}
			]
		}
	}

	/** Generate the type files required for a schema */
	public async generateSchemaTypes(
		destinationDir: string,
		options: IGenerateSchemaTypesOptions
	): Promise<ISchemaGeneratorSyncResults> {
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
		const normalizedDefinitions: {
			id: string
			name: string
			path: string
			description: string
		}[] = []

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
				await diskUtil.writeFile(fieldsTypesDestination, fieldsTypesContent)

				// Write out class map
				await diskUtil.writeFile(fieldClassMapDestination, fieldClassMapContent)

				// Write out field type enum
				await diskUtil.writeFile(fieldTypeDestination, fieldTypeContent)

				// Build the ValueType hash to pass to schemasTypes
				const {
					valueTypes,
					errors
				} = await this.valueTypeService.allValueTypes({
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
								namesUtil.toCamel(templateItem.namespace),
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
								name: `${templateItem.namePascal} definition`,
								id: templateItem.namePascal,
								path: destination,
								description:
									templateItem.definition.description ??
									`*** no description defined in ${destination} ***`
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
				await diskUtil.writeFile(schemaTypesDestination, schemaTypesContents)

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
			updatedFiles: [],
			generatedFiles: [
				{
					name: 'Schema types',
					path: schemaTypesDestination,
					description:
						'Registry of types, e.g. SpruceSchemas.Local.2020_01_10.Ball'
				},
				{
					name: 'Field enum',
					path: fieldTypeDestination,
					description: 'The enum to access all field types, e.g. FieldType.Text'
				},
				{
					name: 'Field types',
					path: fieldsTypesDestination,
					description: 'All the types needed for fields, including union types'
				},
				{
					name: 'Field class map',
					path: fieldClassMapDestination,
					description:
						'A hash to find any field by type, e.g. FieldClassMap[FieldType.Text]'
				},
				...normalizedDefinitions
			]
		}
	}
}
