import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { Service } from '../../../factories/ServiceFactory'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import { IFeatureActionExecuteResponse } from '../../features.types'

export interface ISyncSchemaOptionsDefinition extends ISchemaDefinition {
	id: 'createSchemaOption'
	name: 'Create schema options'
	fields: {
		typesDestinationDir: {
			type: FieldType.Text
			label: 'Destination directory'
			defaultValue: '#spruce/schemas'
			isRequired: true
		}
		addonsLookupDir: {
			type: FieldType.Text
			label: 'Id'
			isRequired: true
			defaultValue: 'src/addons'
		}
		lookupDir: {
			type: FieldType.Text
			isRequired: true
			defaultValue: 'src/schemas'
		}
	}
}

export const syncSchemasActionOptionsDefinition: ISyncSchemaOptionsDefinition = {
	id: 'createSchemaOption',
	name: 'Create schema options',
	fields: {
		typesDestinationDir: {
			type: FieldType.Text,
			label: 'Destination directory',
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
}

export default class SyncAction extends AbstractFeatureAction<
	ISyncSchemaOptionsDefinition
> {
	public name = 'sync'
	public optionsDefinition = syncSchemasActionOptionsDefinition

	public async execute(
		options: SchemaDefinitionValues<ISyncSchemaOptionsDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

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

		const definitionsToDelete = await schemaGeneratorUtil.filterDefinitionFilesBySchemaIds(
			resolvedDestination,
			schemaTemplateItems.map((i) => i.id)
		)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))

		const generator = new SchemaGenerator(this.templates)
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

		const results = generator.generateSchemaTypes(resolvedDestination, {
			fieldTemplateItems,
			schemaTemplateItems,
			valueTypes,
		})

		return { files: results }
	}
}
