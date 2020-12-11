import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class RegisteringASkillTest extends AbstractCliTest {
	@test()
	protected static async hasRegisterAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('skill').Action('register').execute)
	}

	@test()
	protected static async cantRegisterWithoutBeingLoggedIn() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')
		const results = await cli.getFeature('skill').Action('register').execute({})

		assert.isTruthy(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'MERCURY_RESPONSE_ERROR')
		errorAssertUtil.assertError(
			results.errors[0].options.responseErrors[0],
			'UNAUTHORIZED_ACCESS'
		)
	}
}
