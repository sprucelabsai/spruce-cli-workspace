import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	normalizeSchemaToIdWithVersion,
	Schema,
	SchemaTemplateItem,
} from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { EventContractTemplateItem } from '@sprucelabs/spruce-templates'
import { isEqual } from 'lodash'
import SpruceError from '../../errors/SpruceError'
import EventGenerator from '../../generators/EventGenerator'
import EventStore from '../../stores/EventStore'
import EventTemplateItemBuilder from '../../templateItemBuilders/EventTemplateItemBuilder'
import { GraphicsInterface } from '../../types/cli.types'
import { FeatureActionResponse } from '../features.types'
import validateAndNormalizeUtil from '../validateAndNormalize.utility'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventAction

export default class EventContractUnifiedGenerator {
	private optionsSchema: OptionsSchema
	private ui: GraphicsInterface
	private eventGenerator: EventGenerator
	private cwd: string
	private eventStore: EventStore
	private cachedTemplateItems?: {
		errors: SpruceError[]
		eventContractTemplateItems: EventContractTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
	}

	public constructor(options: {
		optionsSchema: OptionsSchema
		ui: GraphicsInterface
		eventGenerator: EventGenerator
		cwd: string
		eventStore: EventStore
	}) {
		this.optionsSchema = options.optionsSchema
		this.ui = options.ui
		this.eventGenerator = options.eventGenerator
		this.cwd = options.cwd
		this.eventStore = options.eventStore
	}

	public async generateContracts(
		options: Options
	): Promise<FeatureActionResponse> {
		const normalizedOptions = validateAndNormalizeUtil.validateAndNormalize(
			this.optionsSchema,
			options
		)

		const { contractDestinationDir } = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			contractDestinationDir
		)

		this.ui.startLoading('Pulling contracts...')

		const {
			errors,
			schemaTemplateItems,
			eventContractTemplateItems,
		} = await this.generateTemplateItems()

		if (errors && errors?.length > 0) {
			return {
				errors,
			}
		}

		this.ui.startLoading('Generating contracts...')

		const files = await this.eventGenerator.generateContracts(
			resolvedDestination,
			{
				...normalizedOptions,
				eventContractTemplateItems,
				schemaTemplateItems,
			}
		)

		return {
			files,
		}
	}

	public async getUniqueSchemasFromContracts(
		existingSchemas: Schema[]
	): Promise<FeatureActionResponse & { schemas?: Schema[] }> {
		const { errors, schemaTemplateItems } = await this.generateTemplateItems()

		if (errors && errors?.length > 0) {
			return {
				errors,
			}
		}

		const filteredSchemas = this.filterSchemasBasedOnCallbackPayload(
			existingSchemas,
			schemaTemplateItems
		)

		return {
			schemas: filteredSchemas,
		}
	}

	private filterSchemasBasedOnCallbackPayload(
		existingSchemas: Schema[],
		schemaTemplateItems: SchemaTemplateItem[]
	) {
		const schemas = schemaTemplateItems.map((i) => i.schema)
		const filteredSchemas = schemas.filter((schema) => {
			const idWithVersion = normalizeSchemaToIdWithVersion(schema)
			return !existingSchemas.find((s) =>
				isEqual(normalizeSchemaToIdWithVersion(s), idWithVersion)
			)
		})

		return filteredSchemas
	}

	private async generateTemplateItems() {
		if (this.cachedTemplateItems) {
			return this.cachedTemplateItems
		}

		const contractResults = await this.eventStore.fetchEventContracts()

		if (contractResults.errors.length > 0) {
			this.cachedTemplateItems = {
				errors: contractResults.errors,
				eventContractTemplateItems: [],
				schemaTemplateItems: [],
			}

			return this.cachedTemplateItems
		}

		const itemBuilder = new EventTemplateItemBuilder()
		const {
			eventContractTemplateItems,
			schemaTemplateItems,
		} = itemBuilder.generateTemplateItems(contractResults.contracts)

		this.cachedTemplateItems = {
			eventContractTemplateItems,
			schemaTemplateItems,
			errors: [],
		}

		return this.cachedTemplateItems
	}
}
