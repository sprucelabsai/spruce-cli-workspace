import path from 'path'
import pathUtil from 'path'
import { IFieldTemplateItem, ISchemaTemplateItem } from '@sprucelabs/schema'
import {
	IDefinitionBuilderTemplateItem,
	IValueTypes
} from '@sprucelabs/spruce-templates'
import { LATEST_HANDLEBARS } from '../constants'
import SpruceError from '../errors/SpruceError'
import { IGeneratedFile } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'
import versionUtil from '../utilities/version.utility'
import AbstractGenerator from './AbstractGenerator'

export interface IGenerateSchemaTypesOptions {
	fieldTemplateItems: IFieldTemplateItem[]
	schemaTemplateItems: ISchemaTemplateItem[]
	clean?: boolean
}

export interface IGenerateFieldTypesOptions {
	fieldTemplateItems: IFieldTemplateItem[]
}

export interface IGenerateSchemaTypesOptions {
	fieldTemplateItems: IFieldTemplateItem[]
	schemaTemplateItems: ISchemaTemplateItem[]
	valueTypes: IValueTypes
}

export interface ISchemaGeneratorBuildResults {
	generatedFiles: IGeneratedFile[]
}

export interface ISchemaGeneratorValueTypeResults {
	generatedFiles: IGeneratedFile[]
}

export interface ISchemaGeneratorFieldResults {
	generatedFiles: IGeneratedFile[]
	updatedFiles: IGeneratedFile[]
}

export interface ISchemaGeneratorSchemaSyncResults {
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
	private readonly fieldTemplates: {
		filename: string
		templateFuncName: 'fieldsTypes' | 'fieldClassMap' | 'fieldTypeEnum'
		nameReadable: string
		description: string
	}[] = [
		{
			filename: 'fields.types.ts',
			templateFuncName: 'fieldsTypes',
			nameReadable: 'Field types',
			description:
				'All the interfaces generated for every type of schema field (text, number, address, etc)'
		},
		{
			filename: 'fieldClassMap.ts',
			templateFuncName: 'fieldClassMap',
			nameReadable: 'Field class map',
			description:
				'An object that is injected into the FieldFactory and ensures 3rd party fields are integrated'
		},
		{
			filename: 'fieldTypeEnum.ts',
			templateFuncName: 'fieldTypeEnum',
			nameReadable: 'Field type enum',
			description:
				'This is your autogenerated, skill-specific enumeration of all the fields you have access to'
		}
	]

	public async generateBuilder(
		destinationDir: string,
		options: IDefinitionBuilderTemplateItem
	): Promise<ISchemaGeneratorBuildResults> {
		const resolvedBuilderDestination = versionUtil.resolveNewLatestPath(
			destinationDir,
			LATEST_HANDLEBARS,
			`${options.nameCamel}.builder.ts`
		)

		const definitionBuilder = this.templates.definitionBuilder(options)

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

	public async generateFieldTypes(
		destinationDir: string,
		options: IGenerateFieldTypesOptions
	): Promise<ISchemaGeneratorFieldResults> {
		const { fieldTemplateItems } = options

		const results: ISchemaGeneratorFieldResults = {
			generatedFiles: [],
			updatedFiles: []
		}

		this.fieldTemplates.forEach(fileAndFunc => {
			const {
				filename,
				templateFuncName,
				nameReadable,
				description
			} = fileAndFunc

			const resolvedDestination = path.join(destinationDir, 'fields', filename)

			const contents = this.templates[templateFuncName]({
				fieldTemplateItems
			})

			diskUtil.writeFile(resolvedDestination, contents)

			results.generatedFiles.push({
				name: nameReadable,
				description,
				path: resolvedDestination
			})
		})

		return results
	}

	public async generateSchemaTypes(
		destinationDir: string,
		options: IGenerateSchemaTypesOptions
	): Promise<ISchemaGeneratorSchemaSyncResults> {
		const { fieldTemplateItems, schemaTemplateItems, valueTypes } = options
		const schemaTypesDestination = path.join(destinationDir, 'schemas.types.ts')

		const results: ISchemaGeneratorSchemaSyncResults = {
			updatedFiles: [],
			generatedFiles: []
		}

		const schemaTypesContents = this.templates.schemasTypes({
			schemaTemplateItems,
			fieldTemplateItems,
			valueTypes
		})

		await diskUtil.writeFile(schemaTypesDestination, schemaTypesContents)

		return results
	}

	public async generateValueTypes(
		destinationDir: string,
		options: {
			schemaTemplateItems: ISchemaTemplateItem[]
			fieldTemplateItems: IFieldTemplateItem[]
		}
	): Promise<ISchemaGeneratorValueTypeResults> {
		const contents = this.templates.valueTypes(options)
		const destination = pathUtil.join(destinationDir, 'valueType.tmp.ts')

		diskUtil.writeFile(destination, contents)

		return {
			generatedFiles: [
				{
					name: 'Value type builder',
					path: destination,
					description:
						'For constructing what goes to the right of the : after each property in the interface.'
				}
			]
		}
	}
}
