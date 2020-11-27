import { test, assert } from '@sprucelabs/test'
import OnboardingStore from '../../stores/OnboardingStore'
import AbstractCliTest from '../../test/AbstractCliTest'

export default class OnboardingStoreTest extends AbstractCliTest {
	private static store: OnboardingStore

	protected static async beforeEach() {
		await super.beforeEach()

		await this.FeatureFixture().installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'Test skill',
						description: 'Test skill',
					},
				},
			],
			'skills'
		)

		this.store = this.Store('onboarding')
	}

	@test()
	protected static async canGetStore() {
		assert.isTruthy(this.store)
	}

	@test()
	protected static async startsAsOff() {
		const mode = this.store.getMode()
		assert.isEqual(mode, 'off')
	}
}
