import { test, assert } from '@sprucelabs/test'
import AbstractErrorTest from '../../../AbstractErrorTest'
import FeatureFixture from '../../../fixtures/FeatureFixture'

export default class SettingUpErrorTest extends AbstractErrorTest {
	@test()
	protected static async failsIfSkillIsNotInstalled() {
		const fixture = new FeatureFixture(this.cwd)
		await assert.doesThrowAsync(
			() =>
				fixture.installFeatures([
					{
						code: 'error',
					},
				]),
			/skillFeature.*name is required/gis
		)
	}

	@test()
	protected static async installsSchemasIfNotInstalled() {
		await this.installErrorFeature()

		const installer = this.FeatureInstaller()

		const isSchemaInstalled = await installer.isInstalled('schema')
		assert.isTrue(isSchemaInstalled)

		const isErrorInstalled = await installer.isInstalled('error')
		assert.isTrue(isErrorInstalled)
	}
}
