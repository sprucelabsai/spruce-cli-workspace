import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../test/AbstractTestTest'
import testUtil from '../../../utilities/test.utility'

export default class SelectingAnAbstractTestClassTest extends AbstractTestTest {
	@test()
	protected static async asksForYouToSelectABaseClass() {
		const cli = await this.installTests('test-finder')
		await this.copyTestFiles()

		const response = cli.getFeature('test').Action('create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
		})

		// wait for prompt
		await this.wait(1000)

		await this.ui.sendInput(this.cwd + '/src/deeper/AbstractBananaTest.ts')

		const results = await response

		assert.doesInclude(this.ui.invocations, {
			command: 'prompt',
			options: {
				type: 'select',
				options: {
					choices: [
						{
							value: '',
							label: 'Default (AbstractSpruceTest)',
						},
						{
							value: this.cwd + '/src/AbstractTest.ts',
							label: 'AbstractTest',
						},
						{
							value: this.cwd + '/src/AbstractTest2.ts',
							label: 'AbstractTest2',
						},
						{
							value: this.cwd + '/src/deeper/AbstractBananaTest.ts',
							label: 'AbstractBananaTestDifferentThanFileName',
						},
					],
				},
			},
		})

		testUtil.assertsFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			results.files ?? []
		)

		await this.Service('build').build()

		// the stubbed test fails with assert.IsTrue(false)
		await assert.doesThrowAsync(
			() => this.Service('command').execute('yarn test'),
			/false.*?does not equal.*?true/gis
		)
	}

	private static async copyTestFiles() {
		const source = this.resolveTestPath('abstract_tests')
		const destination = this.resolvePath('src')

		await diskUtil.copyDir(source, destination)
	}
}
