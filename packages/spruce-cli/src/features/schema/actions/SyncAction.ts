import pathUtil from 'path'
import {
	SchemaDefinitionValues,
	ISchemaTemplateItem,
	IFieldTemplateItem,
	buildSchemaDefinition,
} from '@sprucelabs/schema'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { Service } from '../../../factories/ServiceFactory'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import { IGeneratedFile } from '../../../types/cli.types'
import diskUtil from '../../../utilities/disk.utility'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import { IFeatureActionExecuteResponse } from '../../features.types'

export const syncSchemasActionOptionsDefinition = buildSchemaDefinition({
	id: 'syncSchemaAction',
	name: 'Sync schemas',
	description:
		'Keep all your schemas and types in sync with your builders and contracts.',
	fields: {
		schemaTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Schema types destination directory',
			hint: 'Where schema types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
		},
		fieldTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Field types directory',
			hint: 'Where field types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
			isPrivate: true,
		},
		addonsLookupDir: {
			type: FieldType.Text,
			label: 'Id',
			hint: "Where I'll look for new schema fields to be registered.",
			defaultValue: 'src/addons',
		},
		schemaLookupDir: {
			type: FieldType.Text,
			hint: 'Where I should look for your schema builders?',
			defaultValue: 'src/schemas',
		},
		enableVersioning: {
			type: FieldType.Boolean,
			defaultValue: true,
			label: 'Enable versioning',
			isPrivate: true,
		},
		namespacePrefix: {
			type: FieldType.Text,
			label: 'Namespace prefix',
			isPrivate: true,
		},
		fetchRemoteSchemas: {
			type: FieldType.Boolean,
			label: 'Fetch remote schemas',
			isPrivate: true,
			hint:
				'I will check the server and your contracts to pull down schemas you need.',
			defaultValue: true,
		},
		generateFieldTypes: {
			type: FieldType.Boolean,
			label: 'Generate field types',
			isPrivate: true,
			hint: 'Should I generate field types too?',
			defaultValue: true,
		},
	},
})

export type ISyncSchemasActionDefinition = typeof syncSchemasActionOptionsDefinition

export default class SyncAction extends AbstractFeatureAction<
	ISyncSchemasActionDefinition
> {
	public name = 'sync'
	public optionsDefinition = syncSchemasActionOptionsDefinition

	private readonly schemaGenerator = new SchemaGenerator(this.templates)

	public async execute(
		options: SchemaDefinitionValues<ISyncSchemasActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		this.term.startLoading(`Syncing schemas...`)

		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			schemaTypesDestinationDir,
			fieldTypesDestinationDir,
			schemaLookupDir,
			addonsLookupDir,
			enableVersioning,
			namespacePrefix,
			fetchRemoteSchemas,
			generateFieldTypes,
		} = normalizedOptions

		const resolvedSchemaTypesDestination = diskUtil.resolvePath(
			this.cwd,
			schemaTypesDestinationDir
		)

		const resolvedFieldTypesDestination = diskUtil.resolvePath(
			this.cwd,
			fieldTypesDestinationDir ?? schemaTypesDestinationDir
		)

		const resolvedFieldTypesDestinationDir = pathUtil.dirname(
			resolvedSchemaTypesDestination
		)

		const {
			schemas: { items: schemaTemplateItems },
			fields: { items: fieldTemplateItems },
		} = await this.Store('schema').fetchAllTemplateItems({
			localSchemaDir: schemaLookupDir,
			localAddonDir: addonsLookupDir,
			enableVersioning,
			fetchRemoteSchemas,
		})

		if (schemaTemplateItems.length === 0) {
			diskUtil.deleteDir(resolvedFieldTypesDestinationDir)
			return {}
		}

		await this.deleteOrphanedDefinitions(
			resolvedFieldTypesDestinationDir,
			schemaTemplateItems
		)

		const fieldResults: IGeneratedFile[] = []

		if (generateFieldTypes) {
			const results = await this.schemaGenerator.generateFieldTypes(
				resolvedFieldTypesDestination,
				{
					fieldTemplateItems,
				}
			)

			fieldResults.push(...results)
		}

		const valueTypes = await this.generateValueTypes(
			resolvedFieldTypesDestination,
			fieldTemplateItems,
			schemaTemplateItems
		)

		const results = this.schemaGenerator.generateSchemaTypes(
			resolvedSchemaTypesDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
				valueTypes,
				namespacePrefix: namespacePrefix ?? undefined,
			}
		)

		this.term.stopLoading()

		return {
			files: [...results, ...fieldResults],
			meta: {
				schemaTemplateItems,
				fieldTemplateItems,
			},
		}
	}

	private async generateValueTypes(
		resolvedDestination: string,
		fieldTemplateItems: IFieldTemplateItem[],
		schemaTemplateItems: ISchemaTemplateItem[]
	) {
		const valueTypeResults = await this.schemaGenerator.generateValueTypes(
			resolvedDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
			}
		)

		const valueTypes: IValueTypes = await this.Service(
			Service.Import
		).importDefault(valueTypeResults[0].path)

		return valueTypes
	}

	private async deleteOrphanedDefinitions(
		resolvedDestination: string,
		schemaTemplateItems: ISchemaTemplateItem[]
	) {
		const definitionsToDelete = await schemaGeneratorUtil.filterDefinitionFilesBySchemaIds(
			resolvedDestination,
			schemaTemplateItems.map((i) => i.id)
		)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))
	}
}
