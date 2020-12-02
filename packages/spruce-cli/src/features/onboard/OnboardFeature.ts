import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import OnboardingStore from '../../stores/OnboardingStore'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
} from '../AbstractFeature'
import featuresUtil from '../feature.utilities'
import { FeatureCode } from '../features.types'
import ScriptLoader from './ScriptLoader'

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
			await this.assertExpectedCommand(payload, store)
			const player = await this.ScriptPlayer()
			if (payload.featureCode !== 'onboard') {
				await player.playScriptWithKey('todo.test.create')
			}
		}
	}

	public isInstalled = async (): Promise<boolean> => {
		return true
	}

	private async assertExpectedCommand(
		payload: { featureCode: string; actionCode: string },
		store: OnboardingStore
	) {
		const command = featuresUtil.generateCommand(
			payload.featureCode,
			payload.actionCode
		)

		const stage = store.getStage()

		if (payload.featureCode !== 'onboard' && command !== stage) {
			const player = await this.ScriptPlayer()
			await player.playScriptWithKey('wrongCommand')
		}
	}
}
