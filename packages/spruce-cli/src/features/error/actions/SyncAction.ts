import {
	buildSchemaDefinition,
	SchemaDefinitionValues,
	ISchemaTemplateItem,
} from '@sprucelabs/schema'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { Service } from '../../../factories/ServiceFactory'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import SchemaGenerator from '../../../generators/SchemaGenerator'
import diskUtil from '../../../utilities/disk.utility'
import schemaGeneratorUtil from '../../../utilities/schemaGenerator.utility'
import { IFeatureActionExecuteResponse } from '../../features.types'
import { syncSchemasActionOptionsDefinition } from '../../schema/actions/SyncAction'

export const syncErrorsActionOptionsDefinition = buildSchemaDefinition({
	id: 'errorSync',
	name: 'Sync error',
	fields: {
		...syncSchemasActionOptionsDefinition.fields,
		errorLookupDir: {
			type: FieldType.Text,
			isRequired: true,
			hint: 'Where I should look for your error builders?',
			defaultValue: 'src/errors',
		},
		errorTypesDestinationDir: {
			type: FieldType.Text,
			label: 'Types destination dir',
			isRequired: true,
			hint: 'This is where error options and type information will be written',
			defaultValue: '#spruce/errors',
		},
	},
})

export type ISyncErrorsActionDefinition = typeof syncErrorsActionOptionsDefinition

export default class SyncAction extends AbstractFeatureAction {
	public name = 'sync'
	public optionsDefinition = syncErrorsActionOptionsDefinition

	public async execute(
		options: SchemaDefinitionValues<ISyncErrorsActionDefinition>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(
			options
		) as SchemaDefinitionValues<ISyncErrorsActionDefinition>

		const schemaSyncResults = await this.getFeature('schema')
			.Action('sync')
			.execute(normalizedOptions)

		const {
			errorTypesDestinationDir,
			errorLookupDir,
			addonsLookupDir,
		} = normalizedOptions

		const errorGenerator = new ErrorGenerator(this.templates)
		const schemaGenerator = new SchemaGenerator(this.templates)

		const errorStore = this.Store('error')
		const schemaStore = this.Store('schema')

		const storeResults = await errorStore.fetchErrorTemplateItems(
			errorLookupDir
		)

		const errorTemplateItems = storeResults.items

		const resolvedTypesDestination = diskUtil.resolvePath(
			this.cwd,
			errorTypesDestinationDir
		)

		if (errorTemplateItems.length === 0) {
			diskUtil.deleteDir(resolvedTypesDestination)
			return {}
		}

		const optionsResults = await errorGenerator.generateOptionsTypesFile(
			resolvedTypesDestination,
			storeResults.items
		)

		const fieldTemplateItemsResults = await schemaStore.fetchFieldTemplateItems(
			addonsLookupDir
		)

		await this.deleteOrphanedDefinitions(
			resolvedTypesDestination,
			storeResults.items
		)

		const valueTypeResults = await schemaGenerator.generateValueTypes(
			resolvedTypesDestination,
			{
				fieldTemplateItems: fieldTemplateItemsResults.items,
				schemaTemplateItems: storeResults.items,
			}
		)

		const valueTypes: IValueTypes = await this.Service(
			Service.Import
		).importDefault(valueTypeResults[0].path)

		const schemaTypesResults = schemaGenerator.generateSchemaTypes(
			diskUtil.resolvePath(resolvedTypesDestination, 'errors.types.ts'),
			{
				fieldTemplateItems: fieldTemplateItemsResults.items,
				schemaTemplateItems: storeResults.items,
				valueTypes,
				namespacePrefix: 'SpruceErrors',
			}
		)

		return {
			files: [
				...(schemaSyncResults.files ?? []),
				...optionsResults,
				...schemaTypesResults,
			],
		}
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
