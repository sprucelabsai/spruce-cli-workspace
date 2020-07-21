import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'
import FeatureFixture from '../../../fixtures/FeatureFixture'

export default class SettingUpErrorTests extends AbstractCliTest {
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
		const fixture = new FeatureFixture(this.cwd)
		await fixture.installFeatures([
			{
				code: 'skill',
				options: {
					name: 'testing',
					description: 'this is also a great test!',
				},
			},
			{
				code: 'error',
			},
		])

		const installer = this.FeatureInstaller()

		const isSchemaInstalled = await installer.isInstalled('schema')
		assert.isTrue(isSchemaInstalled)

		const isErrorInstalled = await installer.isInstalled('error')
		assert.isTrue(isErrorInstalled)
	}
}
