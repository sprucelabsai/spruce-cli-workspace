import { SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncSchemaFieldsActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncSchemaFieldsAction.schema'
import FieldTemplateItemBuilder from '../../../templateItemBuilders/FieldTemplateItemBuilder'
import { GeneratedFile } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type SyncFieldsSchema = SpruceSchemas.SpruceCli.v2020_07_22.ISyncSchemaFieldsActionSchema

export default class FieldsSyncAction extends AbstractFeatureAction<
	SyncFieldsSchema
> {
	public name = 'fields.sync'
	public optionsSchema = syncSchemaFieldsActionSchema

	public async execute(
		options: SchemaValues<SyncFieldsSchema>
	): Promise<FeatureActionResponse> {
		this.ui.startLoading(`Syncing fields...`)

		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			fieldTypesDestinationDir,
			addonsLookupDir,
			generateFieldTypes,
		} = normalizedOptions

		const resolvedFieldTypesDestination = diskUtil.resolvePath(
			this.cwd,
			fieldTypesDestinationDir
		)

		const generatedFiles: GeneratedFile[] = []
		const schemaStore = this.Store('schema')

		const { fields, errors } = await schemaStore.fetchFields({
			localAddonsDir: diskUtil.resolvePath(this.cwd, addonsLookupDir),
		})

		const fieldTemplateItemBuilder = new FieldTemplateItemBuilder()
		const fieldTemplateItems = fieldTemplateItemBuilder.generateTemplateItems(
			fields
		)

		const schemaGenerator = this.Generator('schema')
		if (generateFieldTypes) {
			const results = await schemaGenerator.generateFieldTypes(
				resolvedFieldTypesDestination,
				{
					fieldTemplateItems,
				}
			)

			generatedFiles.push(...results)
		}

		this.ui.stopLoading()

		return {
			files: generatedFiles,
			errors: errors.length > 0 ? errors : undefined,
			meta: {
				fieldTemplateItems,
			},
		}
	}
}
