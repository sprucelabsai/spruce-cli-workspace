import {
	EventContract,
	eventContractUtil,
	eventResponseUtil,
} from '@sprucelabs/mercury-types'
import { SelectChoice } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import eventListenActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/listenEventAction.schema'
import { MERCURY_API_NAMESPACE } from '../../../cli'
import SpruceError from '../../../errors/SpruceError'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema
export default class ListenAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'listen'
	public optionsSchema: OptionsSchema = eventListenActionSchema

	public async execute(
		options: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventAction
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		let {
			eventsDestinationDir,
			version,
			eventName,
			eventNamespace,
		} = normalizedOptions

		this.ui.startLoading('Loading event contracts...')

		const client = await this.connectToApi()
		const contractResults = await client.emit('get-event-contracts')

		const { contracts } = eventResponseUtil.getFirstResponseOrThrow(
			contractResults
		)

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

		const generator = this.Generator('event')
		const results = await generator.generateListener(resolvedDestination, {
			...normalizedOptions,
			version: resolvedVersion,
			eventName,
			eventNamespace,
		})

		return { files: results }
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
				value: 'skill',
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
