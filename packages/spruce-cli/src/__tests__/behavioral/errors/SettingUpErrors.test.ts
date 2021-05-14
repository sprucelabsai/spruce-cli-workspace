import { errorAssertUtil } from '@sprucelabs/test-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractErrorTest from '../../../tests/AbstractErrorTest'

export default class SettingUpErrorTest extends AbstractErrorTest {
	@test()
	protected static async failsIfSkillIsNotInstalled() {
		const fixture = this.FeatureFixture()
		const err = await assert.doesThrowAsync(() =>
			fixture.installFeatures([
				{
					code: 'error',
				},
			])
		)

		errorAssertUtil.assertError(err, 'VALIDATION_FAILED')
	}

	@test()
	protected static async installsSchemasIfNotInstalled() {
		await this.installErrorFeature('errors')

		const installer = this.FeatureInstaller()

		const isSchemaInstalled = await installer.isInstalled('schema')
		assert.isTrue(isSchemaInstalled)

		const isErrorInstalled = await installer.isInstalled('error')
		assert.isTrue(isErrorInstalled)
	}
}
