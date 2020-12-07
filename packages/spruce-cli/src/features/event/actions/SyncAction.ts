import { FieldTemplateItem, SchemaTemplateItem } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventAction.schema'
import SpruceError from '../../../errors/SpruceError'
import EventTemplateItemBuilder from '../../../templateItemBuilders/EventTemplateItemBuilder'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
import ValueTypeBuilder from '../../schema/ValueTypeBuilder'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventAction

export default class SyncAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'sync'
	public optionsSchema: OptionsSchema = syncEventActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const { contractDestinationDir, addonsLookupDir } = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			contractDestinationDir
		)

		this.ui.startLoading('Pulling contracts...')

		const {
			errors,
			schemaTemplateItems,
			fieldTemplateItems,
			eventContractTemplateItems,
		} = await this.generateTemplateItems(addonsLookupDir)

		if (errors && errors?.length > 0) {
			return {
				errors,
			}
		}

		this.ui.startLoading('Generating contracts...')

		const valueTypes = await this.generateValueTypes({
			resolvedDestination,
			schemaTemplateItems,
			fieldTemplateItems,
		})

		const generator = this.Generator('event')

		const files = await generator.generateContracts(resolvedDestination, {
			...normalizedOptions,
			eventContractTemplateItems,
			schemaTemplateItems,
			valueTypes,
		})

		return {
			files,
		}
	}

	private async generateTemplateItems(addonsLookupDir: string) {
		const store = this.Store('event')
		const contractResults = await store.fetchEventContracts()

		if (contractResults.errors.length > 0) {
			return {
				errors: contractResults.errors,
				eventContractTemplateItems: [],
				schemaTemplateItems: [],
				fieldTemplateItems: [],
			}
		}

		const itemBuilder = new EventTemplateItemBuilder()
		const {
			eventContractTemplateItems,
			schemaTemplateItems,
		} = itemBuilder.generateTemplateItems(contractResults.contracts)

		const {
			fieldTemplateItems,
			errors,
		} = await this.generateFieldTemplateItems(addonsLookupDir)

		return {
			eventContractTemplateItems,
			schemaTemplateItems,
			fieldTemplateItems,
			errors,
		}
	}

	private async generateFieldTemplateItems(
		addonsLookupDir: string
	): Promise<{
		fieldTemplateItems: FieldTemplateItem[]
		errors: SpruceError[]
	}> {
		const action = this.getFeature('schema').Action('fields.sync')
		const results = await action.execute({
			addonsLookupDir,
		})

		return {
			fieldTemplateItems: results.meta?.fieldTemplateItems ?? [],
			errors: results.errors ?? [],
		}
	}

	private async generateValueTypes(options: {
		resolvedDestination: string
		fieldTemplateItems: FieldTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
		globalNamespace?: string
	}) {
		const builder = new ValueTypeBuilder(
			this.Generator('schema'),
			this.Service('import')
		)

		return builder.generateValueTypes(options)
	}
}
