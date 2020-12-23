import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class SettingUpVscodeTest extends AbstractCliTest {
	@test()
	protected static async hasSetupAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('vscode').Action('setup').execute)
	}

	@test()
	protected static async settingUpAsksAboutExtensonsAndSetsUpDebug() {
		const cli = await this.FeatureFixture().installCachedFeatures('skills')
		const promise = cli.getFeature('vscode').Action('setup').execute({})

		await this.waitForInput()

		assert.isEqualDeep(this.ui.lastInvocation(), {
			command: 'confirm',
			options: 'Want me to setup debugging for you?',
		})

		await this.ui.sendInput('y')

		await this.waitForInput()

		assert.isEqualDeep(this.ui.lastInvocation(), {
			command: 'confirm',
			options:
				'Want me to setup vscode settings for building, testing and linting on save?',
		})

		await this.ui.sendInput('y')

		await this.waitForInput()

		assert.isEqualDeep(this.ui.lastInvocation(), {
			command: 'confirm',
			options: 'Want me to setup tasks for building and testing?',
		})

		await this.ui.sendInput('y')

		const results = await promise

		assert.isFalsy(results.errors)

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'launch.json',
			results.files ?? []
		)
		assert.isEqual(match, this.resolvePath('.vscode/launch.json'))
	}
}
