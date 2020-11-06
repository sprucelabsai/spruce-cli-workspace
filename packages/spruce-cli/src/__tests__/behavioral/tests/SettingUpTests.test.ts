import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { FeatureCode } from '../../../features/features.types'
import AbstractTestTest from '../../../test/AbstractTestTest'

export default class SettingUpTestsTest extends AbstractTestTest {
	@test()
	protected static async installsTests() {
		await this.installTests('tests')
		const code: FeatureCode = 'test'
		await this.assertIsFeatureInstalled(code)
	}

	@test()
	protected static async canRunTestsButSaysAtLeastOneTestIsNeeded() {
		await this.installTests('tests')
		const command = this.Service('command')
		const err = await assert.doesThrowAsync(() => command.execute('yarn test'))

		errorAssertUtil.assertError(err, 'EXECUTING_COMMAND_FAILED')
		//@ts-ignore
		assert.doesInclude(err.options.stdout, /passWithNoTests/)
	}
}
