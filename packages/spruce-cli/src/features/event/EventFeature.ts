import { Schema } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import syncEventActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/syncEventOptions.schema'
import TerminalInterface from '../../interfaces/TerminalInterface'
import { FileDescription } from '../../types/cli.types'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
} from '../AbstractFeature'
import FeatureCommandExecuter from '../FeatureCommandExecuter'
import { FeatureActionResponse, FeatureCode } from '../features.types'
import EventContractBuilder from './builders/EventContractBuilder'

declare module '../../features/features.types' {
	interface FeatureMap {
		event: EventFeature
	}

	interface FeatureOptionsMap {
		event: undefined
	}
}

export default class EventFeature extends AbstractFeature {
	public code: FeatureCode = 'event'
	public nameReadable = 'Events'
	public description = 'Connect to the Mercury Event Engine.'
	public dependencies: FeatureDependency[] = [
		{ code: 'schema', isRequired: true },
	]
	public packageDependencies = [
		{
			name: '@sprucelabs/mercury-client',
		},
		{
			name: '@sprucelabs/mercury-types',
		},
		{
			name: '@sprucelabs/spruce-event-utils',
		},
		{
			name: '@sprucelabs/spruce-event-plugin',
		},
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public readonly fileDescriptions: FileDescription[] = []
	private contractWriter?: EventContractBuilder

	public constructor(options: FeatureOptions) {
		super(options)

		void this.emitter.on(
			'schema.did-fetch-schemas',
			this.handleDidFetchSchemas.bind(this)
		)

		void this.emitter.on(
			'feature.will-execute',
			this.handleWillExecute.bind(this)
		)
	}

	public async afterPackageInstall() {
		diskUtil.createDir(diskUtil.resolvePath(this.cwd, 'src', 'events'))
		return {}
	}

	private async handleWillExecute(payload: {
		featureCode: string
		actionCode: string
	}): Promise<FeatureActionResponse> {
		const { featureCode, actionCode } = payload

		if (featureCode === 'event' && actionCode !== 'setRemote') {
			const remote = this.Service('remote')
			const host = remote.getRemote()

			if (!host) {
				if (!TerminalInterface.doesSupportColor()) {
					throw new Error(
						`Dang! I couldn't find env.HOST. Once that is set, lets try again!`
					)
				}

				this.ui.renderLine(
					`Uh oh! It looks like you haven't configured your remote! We gotta do that.`
				)
				const results = await FeatureCommandExecuter.Executer(
					'event',
					'setRemote'
				).execute({})

				return results
			}
		}

		return {}
	}

	private async handleDidFetchSchemas(payload: { schemas?: Schema[] | null }) {
		const isInstalled = await this.featureInstaller.isInstalled(this.code)

		if (isInstalled) {
			debugger
			const writer = this.EventContractBuilder()

			const uniqueSchemas = await writer.fetchContractsAndGenerateUniqueSchemas(
				payload.schemas ?? []
			)

			return {
				schemas: uniqueSchemas.schemas ?? [],
			}
		}

		return {
			schemas: [],
		}
	}

	public EventContractBuilder() {
		if (!this.contractWriter) {
			this.contractWriter = new EventContractBuilder({
				cwd: this.cwd,
				optionsSchema: syncEventActionSchema,
				ui: this.ui,
				eventGenerator: this.Writer('event'),
				eventStore: this.Store('event'),
				skillStore: this.Store('skill'),
			})
		}

		this.contractWriter.clearCache()

		return this.contractWriter
	}
}
