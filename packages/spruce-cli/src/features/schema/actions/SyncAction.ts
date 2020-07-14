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
		typesDestinationDir: {
			type: FieldType.Text,
			label: 'Destination directory',
			hint: 'Where types and interfaces will be saved.',
			defaultValue: '#spruce/schemas',
			isRequired: true,
		},
		addonsLookupDir: {
			type: FieldType.Text,
			label: 'Id',
			isRequired: true,
			defaultValue: 'src/addons',
		},
		lookupDir: {
			type: FieldType.Text,
			isRequired: true,
			defaultValue: 'src/schemas',
		},
	},
})

export type ISyncSchemaActionDefinition = typeof syncSchemasActionOptionsDefinition

export default class SyncAction extends AbstractFeatureAction<
	ISyncSchemaActionDefinition
> {
	public name = 'sync'
	public optionsDefinition = syncSchemasActionOptionsDefinition

	private readonly schemaGenerator = new SchemaGenerator(this.templates)

	public async execute(
		options: SchemaDefinitionValues<ISyncSchemaActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<ISyncSchemaActionDefinition>

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			normalizedOptions.typesDestinationDir
		)

		const {
			schemas: { items: schemaTemplateItems },
			fields: { items: fieldTemplateItems },
		} = await this.Store('schema').fetchAllTemplateItems(
			normalizedOptions.lookupDir,
			normalizedOptions.addonsLookupDir
		)

		await this.deleteOrphanedDefinitions(
			resolvedDestination,
			schemaTemplateItems
		)

		const valueTypes = await this.generateTypes(
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

		return { files: results }
	}

	private async generateTypes(
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
