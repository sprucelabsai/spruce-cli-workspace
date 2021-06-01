import { test, assert } from '@sprucelabs/test'
import AbstractTestTest from '../../../tests/AbstractTestTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class CreatingBehavioralTestsTest extends AbstractTestTest {
	@test()
	protected static async hasCreateAction() {
		assert.isFunction(this.Action('test', 'create').execute)
	}

	@test()
	protected static async doesNotAskAboutFixturesWhenInNodeModule() {
		await this.installTests('testsInNodeModule')

		const promise = this.Action('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.skipInistallSkill()

		const results = await promise

		assert.isFalsy(results.errors)
	}

	private static async skipInistallSkill() {
		await this.waitForInput()
		await this.ui.sendInput('n')

		await this.waitForInput()
		await this.ui.sendInput('')
	}

	@test()
	protected static async asksAboutSpruceFixturesWhenCreatingIfSkillFeatureIsInstalled() {
		await this.installTests()
		const promise = this.Action('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()
		this.selectOptionBasedOnLabel('AbstractSpruceFixtureTest')

		await promise
	}

	@test()
	protected static async canCreateBehavioralTest() {
		await this.installTests()
		const promise = this.Action('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()
		this.selectOptionBasedOnLabel('AbstractSpruceFixtureTest')

		const response = await promise

		const match = testUtil.assertFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			response.files
		)

		assert.doesInclude(match, 'behavioral')

		await this.Service('build').build()

		await assert.doesThrowAsync(
			() => this.Service('command').execute('yarn test'),
			/false.*?does not equal.*?true/gis
		)
	}
}
