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
			label: 'Destination directory',
			hint: 'Where types and interfaces will be generated.',
			defaultValue: '#spruce/schemas',
			isRequired: true,
		},
		addonsLookupDir: {
			type: FieldType.Text,
			label: 'Id',
			isRequired: true,
			hint: "Where I'll look for new schema fields to be registered.",
			defaultValue: 'src/addons',
		},
		schemaLookupDir: {
			type: FieldType.Text,
			isRequired: true,
			hint: 'Where I should look for your schema builders?',
			defaultValue: 'src/schemas',
		},
		enableVersioning: {
			type: FieldType.Boolean,
			isRequired: true,
			defaultValue: true,
			label: 'Enable versioning',
			isPrivate: true,
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

		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<ISyncSchemasActionDefinition>

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			normalizedOptions.schemaTypesDestinationDir
		)

		const {
			schemas: { items: schemaTemplateItems },
			fields: { items: fieldTemplateItems },
		} = await this.Store('schema').fetchAllTemplateItems(
			normalizedOptions.schemaLookupDir,
			normalizedOptions.addonsLookupDir,
			normalizedOptions.enableVersioning
		)

		await this.deleteOrphanedDefinitions(
			resolvedDestination,
			schemaTemplateItems
		)

		const valueTypes = await this.generateValueTypes(
			resolvedDestination,
			fieldTemplateItems,
			schemaTemplateItems
		)

		const results = this.schemaGenerator.generateSchemaTypes(
			resolvedDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
				valueTypes,
			}
		)

		this.term.stopLoading()

		return { files: results }
	}

	private async generateValueTypes(
		resolvedDestination: string,
		fieldTemplateItems: IFieldTemplateItem[],
		schemaTemplateItems: ISchemaTemplateItem[]
	) {
		const generator = this.schemaGenerator
		await generator.generateFieldTypes(resolvedDestination, {
			fieldTemplateItems,
		})

		const valueTypeResults = await generator.generateValueTypes(
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
