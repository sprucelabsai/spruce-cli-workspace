// TODO this class does two things. Part writer, part utility (writeContracts, getUniqueSchemasFromContracts))
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	normalizeSchemaToIdWithVersion,
	Schema,
	SchemaTemplateItem,
} from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { EventContractTemplateItem } from '@sprucelabs/spruce-templates'
import { isEqual } from 'lodash'
import SpruceError from '../../../errors/SpruceError'
import EventTemplateItemBuilder from '../../../templateItemBuilders/EventTemplateItemBuilder'
import { GraphicsInterface } from '../../../types/cli.types'
import { FeatureActionResponse } from '../../features.types'
import SkillStore from '../../skill/stores/SkillStore'
import validateAndNormalizeUtil from '../../validateAndNormalize.utility'
import EventStore from '../stores/EventStore'
import EventWriter from './EventWriter'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.SyncEventAction

export default class EventContractController {
	private optionsSchema: OptionsSchema
	private ui: GraphicsInterface
	private eventWriter: EventWriter
	private cwd: string
	private eventStore: EventStore
	private cachedTemplateItems?: {
		errors: SpruceError[]
		eventContractTemplateItems: EventContractTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
	}
	private skillStore: SkillStore

	public constructor(options: {
		optionsSchema: OptionsSchema
		ui: GraphicsInterface
		eventGenerator: EventWriter
		cwd: string
		eventStore: EventStore
		skillStore: SkillStore
	}) {
		this.optionsSchema = options.optionsSchema
		this.ui = options.ui
		this.eventWriter = options.eventGenerator
		this.cwd = options.cwd
		this.eventStore = options.eventStore
		this.skillStore = options.skillStore
	}

	public async fetchAndWriteContracts(
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
		} = await this.fetchAndBuildTemplateItems()

		if (errors && errors?.length > 0) {
			return {
				errors,
			}
		}

		this.ui.startLoading('Generating contracts...')

		const files = await this.eventWriter.writeContracts(resolvedDestination, {
			...normalizedOptions,
			eventContractTemplateItems,
			schemaTemplateItems,
		})

		return {
			files,
		}
	}

	public async fetchContractsAndGenerateUniqueSchemas(
		existingSchemas: Schema[]
	): Promise<FeatureActionResponse & { schemas?: Schema[] }> {
		const {
			errors,
			schemaTemplateItems,
		} = await this.fetchAndBuildTemplateItems()

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

	private async fetchAndBuildTemplateItems() {
		if (this.cachedTemplateItems) {
			return this.cachedTemplateItems
		}

		this.ui.startLoading('Fetching and building event contracts...')

		const namespace = await this.skillStore.loadCurrentSkillsNamespace()

		const contractResults = await this.eventStore.fetchEventContracts({
			localNamespace: namespace,
		})

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
		} = itemBuilder.buildTemplateItems(contractResults.contracts)

		this.cachedTemplateItems = {
			eventContractTemplateItems,
			schemaTemplateItems,
			errors: [],
		}

		return this.cachedTemplateItems
	}
}
