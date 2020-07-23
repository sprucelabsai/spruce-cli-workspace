import {
	buildSchemaDefinition,
	SchemaDefinitionValues,
} from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractFeatureAction from '../../../featureActions/AbstractFeatureAction'
import ErrorGenerator from '../../../generators/ErrorGenerator'
import diskUtil from '../../../utilities/disk.utility'
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

		const { errorTypesDestinationDir, errorLookupDir } = normalizedOptions

		const errorGenerator = new ErrorGenerator(this.templates)

		const errorStore = this.Store('error')

		const storeResults = await errorStore.fetchErrorTemplateItems(
			errorLookupDir
		)

		const resolvedTypesDestination = diskUtil.resolvePath(
			this.cwd,
			errorTypesDestinationDir
		)

		const optionsResults = await errorGenerator.generateOptionsTypesFile(
			resolvedTypesDestination,
			storeResults.items
		)

		return {
			files: [...(schemaSyncResults.files ?? []), ...optionsResults],
		}
	}
}
