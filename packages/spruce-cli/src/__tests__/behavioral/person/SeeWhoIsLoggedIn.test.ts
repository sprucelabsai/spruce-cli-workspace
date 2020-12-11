import { test, assert } from '@sprucelabs/test'
import AbstractPersonTest from '../../../tests/AbstractPersonTest'

export default class SeeWhoIsLoggedInTest extends AbstractPersonTest {
	@test()
	protected static async hasWhoAmIAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('person').Action('whoami').execute)
	}

	@test()
	protected static async noOneIsLoggedInToStart() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')

		const results = await cli.getFeature('person').Action('whoami').execute({})

		assert.isFalsy(results.errors)
		assert.doesInclude(results.summaryLines, 'not logged in')
	}

	@test()
	protected static async canSeeWhoIsLoggedIn() {
		const { cli } = await this.installSkillAndLoginAsDummyPerson()

		const results = await cli.getFeature('person').Action('whoami').execute({})

		assert.isFalsy(results.errors)
		assert.doesInclude(results.summaryLines, 'logged in as')
	}
}
