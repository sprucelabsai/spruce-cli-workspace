import { EventContract } from '@sprucelabs/mercury-types'
import {
	normalizeSchemaValues,
	SchemaTemplateItem,
	SelectChoice,
} from '@sprucelabs/schema'
import { eventContractUtil } from '@sprucelabs/spruce-event-utils'
import {
	diskUtil,
	namesUtil,
	MERCURY_API_NAMESPACE,
} from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import eventListenActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/listenEventAction.schema'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventAction.schema'
import SpruceError from '../../../errors/SpruceError'
import EventTemplateItemBuilder from '../../../templateItemBuilders/EventTemplateItemBuilder'
import mergeUtil from '../../../utilities/merge.utility'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const SKILL_EVENT_NAMESPACE = 'skill'
type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema
export default class ListenAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'listen'
	public optionsSchema: OptionsSchema = eventListenActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventAction
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		try {
			let response: FeatureActionResponse = {}

			let {
				eventsDestinationDir,
				version,
				eventName,
				eventNamespace,
				schemaTypesLookupDir,
				contractDestinationDir,
			} = normalizedOptions

			this.ui.startLoading('Loading event contracts...')

			const eventStore = this.Store('event')

			const { contracts } = await eventStore.fetchEventContracts()

			this.ui.stopLoading()

			if (!eventNamespace) {
				eventNamespace = await this.collectNamespace(contracts)
			}

			const { eventChoicesByNamespace } = this.generateChoices(contracts)

			if (!eventChoicesByNamespace[eventNamespace]) {
				throw new SpruceError({
					code: 'INVALID_PARAMETERS',
					parameters: ['eventNamespace'],
				})
			}

			if (!eventName) {
				eventName = await this.collectEvent(contracts, eventNamespace)
			}

			const isValidEvent = !!eventChoicesByNamespace[eventNamespace].find(
				(e) => e.value === eventName
			)

			if (!isValidEvent) {
				throw new SpruceError({
					code: 'INVALID_PARAMETERS',
					parameters: ['eventName'],
				})
			}

			const resolvedDestination = diskUtil.resolvePath(
				this.cwd,
				eventsDestinationDir
			)

			const resolvedVersion = await this.resolveVersion(
				version,
				resolvedDestination
			)

			const resolvedSchemaTypesLookupDir = diskUtil.resolvePath(
				this.cwd,
				schemaTypesLookupDir
			)

			const isSkillEvent = eventNamespace !== SKILL_EVENT_NAMESPACE

			let emitPayloadSchemaTemplateItem: SchemaTemplateItem | undefined
			let responsePayloadSchemaTemplateItem: SchemaTemplateItem | undefined

			if (isSkillEvent) {
				const builder = new EventTemplateItemBuilder()
				const templateItems = builder.generateEventTemplateItemForName(
					contracts,
					eventContractUtil.joinEventNameWithOptionalNamespace({
						eventNamespace,
						eventName,
					})
				)

				emitPayloadSchemaTemplateItem =
					templateItems.emitPayloadSchemaTemplateItem
				responsePayloadSchemaTemplateItem =
					templateItems.responsePayloadSchemaTemplateItem
			}

			const generator = this.Generator('event')
			const results = await generator.generateListener(resolvedDestination, {
				...normalizedOptions,
				version: resolvedVersion,
				eventName,
				eventNamespace,
				emitPayloadSchemaTemplateItem,
				contractDestinationDir,
				responsePayloadSchemaTemplateItem,
				schemaTypesLookupDir: resolvedSchemaTypesLookupDir,
			})

			response.files = results

			if (isSkillEvent) {
				const syncOptions = normalizeSchemaValues(
					syncEventActionSchema,
					options
				)

				const syncResults = await this.Action('sync').execute(syncOptions)

				response = mergeUtil.mergeActionResults(syncResults, response)
			}

			return response
		} catch (err) {
			return {
				errors: [err],
			}
		}
	}

	private async collectEvent(
		contracts: EventContract[],
		eventNamespace: string
	): Promise<string> {
		const eventChoices: SelectChoice[] = this.generateChoices(contracts)
			.eventChoicesByNamespace[eventNamespace]

		const eventName = await this.ui.prompt({
			type: 'select',
			label: 'Select an event',
			isRequired: true,
			options: {
				choices: eventChoices,
			},
		})

		return eventName
	}

	private async collectNamespace(contracts: EventContract[]): Promise<string> {
		const { namespaceChoices } = this.generateChoices(contracts)

		const eventNamespace = await this.ui.prompt({
			type: 'select',
			label: 'Select an event namespace',
			isRequired: true,
			options: {
				choices: namespaceChoices,
			},
		})

		return eventNamespace
	}

	private generateChoices(
		contracts: SpruceSchemas.MercuryTypes.v2020_09_01.EventContract[]
	) {
		const namespaceChoices: SelectChoice[] = [
			{
				label: 'Skill',
				value: SKILL_EVENT_NAMESPACE,
			},
		]

		const eventChoicesByNamespace: Record<string, SelectChoice[]> = {
			skill: [
				{
					label: 'will-boot',
					value: 'will-boot',
				},
				{
					label: 'did-boot',
					value: 'did-boot',
				},
			],
		}

		contracts.forEach((contract) => {
			const namedSignatures = eventContractUtil.getNamedEventSignatures(
				contract
			)

			for (const namedSig of namedSignatures) {
				const namespace = namedSig.eventNamespace ?? MERCURY_API_NAMESPACE

				if (!namespaceChoices.find((o) => o.value === namespace)) {
					namespaceChoices.push({
						label: namesUtil.toPascal(namespace),
						value: namespace,
					})
				}

				if (!eventChoicesByNamespace[namespace]) {
					eventChoicesByNamespace[namespace] = []
				}

				eventChoicesByNamespace[namespace].push({
					value: namedSig.eventName,
					label: namedSig.eventName,
				})
			}
		})

		return { eventChoicesByNamespace, namespaceChoices }
	}
}
