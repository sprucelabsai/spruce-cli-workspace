import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../tests/AbstractTestTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class SelectingAnAbstractTestClassTest extends AbstractTestTest {
	@test()
	protected static async asksForYouToSelectABaseClass() {
		await this.installTests()
		await this.copyTestFiles()

		const response = this.Executer('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
		})

		await this.waitForInput()

		this.selectOptionBasedOnLabel('AbstractBananaTestDifferentThanFileName')

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
							value: '0',
							label: 'AbstractBananaTestDifferentThanFileName',
						},
						{
							value: '1',
							label: 'AbstractSpruceFixtureTest',
						},
						{
							value: '2',
							label: 'AbstractTest',
						},
						{
							value: '3',
							label: 'AbstractTest2',
						},
					],
				},
			},
		})

		const results = await response

		testUtil.assertsFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			results.files
		)

		await this.Service('build').build()

		await assert.doesThrowAsync(
			() => this.Service('command').execute('yarn test'),
			/false.*?does not equal.*?true/gis
		)
	}

	@test()
	protected static async canSelectAbstractTestBasedOnEventEmitter() {
		const cli = await this.installTests()
		void cli.on('test.register-abstract-test-classes', async () => {
			return {
				abstractClasses: [
					{
						name: 'TestClass',
						import: '@sprucelabs/another-lib',
					},
					{
						name: 'TestClass2',
						import: '@sprucelabs/another-lib',
					},
				],
			}
		})

		const promise = this.Executer('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()

		const last = this.ui.lastInvocation()

		assert.doesInclude(last.options.options.choices, {
			label: 'TestClass',
		})

		assert.doesInclude(last.options.options.choices, {
			label: 'TestClass2',
		})

		this.selectOptionBasedOnLabel('TestClass2')

		const results = await promise

		assert.isFalsy(results.errors)

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			results.files
		)

		const contents = diskUtil.readFile(match)

		assert.doesInclude(
			contents,
			"import { TestClass2 } from '@sprucelabs/another-lib'"
		)

		assert.doesInclude(contents, 'extends TestClass2')
	}

	private static async copyTestFiles() {
		const source = this.resolveTestPath('abstract_tests')
		const destination = this.resolvePath('src')

		await diskUtil.copyDir(source, destination)
	}
}
