import { test, assert } from '@sprucelabs/test'
import AbstractErrorTest from '../../../test/AbstractErrorTest'

export default class SettingUpErrorTest extends AbstractErrorTest {
	@test()
	protected static async failsIfSkillIsNotInstalled() {
		const fixture = this.FeatureFixture()
		await assert.doesThrowAsync(
			() =>
				fixture.installFeatures([
					{
						code: 'error',
					},
				]),
			/Skill feature.*name.*is required/gis
		)
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
