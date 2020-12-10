import { assert } from '@sprucelabs/test'
import AbstractCliTest from './AbstractCliTest'
export const DUMMY_PHONE = '555-123-4567'

export default class AbstractPersonTest extends AbstractCliTest {
	public static async installSkillAndLoginAsDummyPerson() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const promise = cli.getFeature('person').Action('login').execute({
			phone: DUMMY_PHONE,
		})

		await this.waitForInput()

		await this.ui.sendInput('7777')

		const results = await promise

		assert.isFalsy(results.errors)

		const person = this.Store('person').getLoggedInPerson()
		return { person, cli }
	}
}