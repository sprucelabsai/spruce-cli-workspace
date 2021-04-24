import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
} from '../AbstractFeature'
import featuresUtil from '../feature.utilities'
import { FeatureCode } from '../features.types'
import ScriptLoader from './ScriptLoader'
import OnboardingStore from './stores/OnboardingStore'

declare module '../../features/features.types' {
	interface FeatureMap {
		onboard: OnboardFeature
	}
}

export default class OnboardFeature extends AbstractFeature {
	public code: FeatureCode = 'onboard'
	public nameReadable = 'Onboard'
	public description = 'Get building your first skill already!'
	public dependencies: FeatureDependency[] = []
	public packageDependencies = []

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	private onboardingStore?: OnboardingStore
	private scriptsDir = diskUtil.resolvePath(__dirname, 'scripts')

	public constructor(options: FeatureOptions) {
		super(options)

		void this.emitter.on(
			'feature.will-execute',
			this.handleWillExecuteCommand.bind(this)
		)
	}

	public OnboardingStore() {
		if (!this.onboardingStore) {
			this.onboardingStore = this.Store('onboarding')
		}
		return this.onboardingStore
	}

	public async ScriptPlayer() {
		const store = this.OnboardingStore()

		const player = await ScriptLoader.LoadScripts({
			ui: this.ui,
			dir: this.scriptsDir,
			onboardingStore: store,
			commandExecuter: async (_command: string) => {
				throw new Error(
					"I can't run commands for you yet, but will be able to soon. For now run `" +
						_command +
						'` manually.'
				)
			},
		})

		return player
	}

	private async handleWillExecuteCommand(payload: {
		featureCode: string
		actionCode: string
	}) {
		const store = this.Store('onboarding')

		if (store.getMode() !== 'off') {
			await this.confirmExpectedCommand(payload, store)

			const player = await this.ScriptPlayer()

			if (store.getMode() !== 'off' && this.isExpectedCommand(payload, store)) {
				await player.playScriptWithKey('todo.test.create')
			}
		}
	}

	public isInstalled = async (): Promise<boolean> => {
		return true
	}

	private async confirmExpectedCommand(
		payload: { featureCode: string; actionCode: string },
		store: OnboardingStore
	) {
		const isExpectedCommand = this.isExpectedCommand(payload, store)

		if (payload.featureCode !== 'onboard' && !isExpectedCommand) {
			const player = await this.ScriptPlayer()

			await player.playScriptWithKey('wrongCommand')
		}
	}

	private isExpectedCommand(
		payload: { featureCode: string; actionCode: string },
		store: OnboardingStore
	) {
		const command = featuresUtil.generateCommand(
			payload.featureCode,
			payload.actionCode
		)

		const stage = store.getStage()

		const isExpectedCommand = command === stage
		return isExpectedCommand
	}
}
