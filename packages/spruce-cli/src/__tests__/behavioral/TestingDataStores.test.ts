import { test, assert } from '@sprucelabs/test'
import AbstractSkillTest from '../../tests/AbstractSkillTest'
import testUtil from '../../tests/utilities/test.utility'

export default class TestingDataStoresTest extends AbstractSkillTest {
	protected static skillCacheKey = 'storesWithTests'

	@test()
	protected static async cantSelectAbstractStoreIfStoreFeatureNotInstalled() {
		this.cli.getFeature('store').isInstalled = async () => false

		void this.Executer('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()

		const last = this.ui.lastInvocation()
		assert.doesNotInclude(last.options.options.choices, {
			label: 'AbstractStoreTest',
		})

		this.ui.reset()
	}

	@test()
	protected static async letsYouSelectAbstractStoreTest() {
		this.cli.getFeature('store').isInstalled = async () => true

		const promise = this.Executer('test', 'create').execute({
			type: 'behavioral',
			nameReadable: 'Can book appointment',
			nameCamel: 'canBookAppointment',
			namePascal: 'CanBookAppointment',
		})

		await this.waitForInput()

		const last = this.ui.lastInvocation()
		assert.doesInclude(last.options.options.choices, {
			label: 'AbstractStoreTest',
		})

		await this.selectOptionBasedOnLabel('AbstractStoreTest')

		const results = await promise

		assert.isFalsy(results.errors)

		testUtil.assertsFileByNameInGeneratedFiles(
			'CanBookAppointment.test.ts',
			results.files
		)

		await this.Service('build').build()

		const testResults = await this.Executer('test', 'test').execute({
			shouldReportWhileRunning: false,
		})

		assert.isArray(testResults.errors)
		assert.isLength(testResults.errors, 2)

		const first = testResults.errors[0]

		assert.doesInclude(
			first.message,
			'AbstractStoreTest needs `protected static storeDir'
		)
	}
}
