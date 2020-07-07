import pathUtil from 'path'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { TEST_JEST_PASSED, TEST_JEST_FAILED } from '../../constants'
import SheetsReporter, {
	SheetsReporterUtil,
	ITestMap,
} from '../../jest/SheetsReporter'
import { IJestTestResult } from '../../types/jest.types'
import sheetUtil from './sheet.utilities'

export default class SheetsReporterTest extends AbstractSpruceTest {
	private static reporter: SheetsReporter<typeof SheetsReporterTest.testMap>
	private static sheetId = '1MFb9AkB8sm7rurYew8hgzrXTz3JDxOFhl4kN9sNQVxw'
	private static worksheetId: number

	private static readonly testResults: IJestTestResult[] = [
		{
			title: 'willPass',
			status: TEST_JEST_PASSED,
		},
		{
			title: 'canBootCli',
			status: TEST_JEST_PASSED,
		},
		{
			title: 'canSetupSchemas',
			status: TEST_JEST_FAILED,
		},
		{
			title: 'canSyncSchemas',
			status: TEST_JEST_FAILED,
		},
	]

	private static readonly testMap = {
		canBootCli: 'B1',
		canSyncSchemas: 'B2',
	}

	protected static async beforeAll() {
		sheetUtil.serviceEmail = process.env.GOOGLE_SERVICE_EMAIL_TEST as string
		sheetUtil.privateKey = process.env.GOOGLE_SERVICE_PRIVATE_KEY_TEST as string

		this.worksheetId = await sheetUtil.generateRandomWorksheet(this.sheetId)
	}

	protected static async beforeEach() {
		await super.beforeEach()

		this.reporter = new SheetsReporter(
			{},
			{
				adapterFilepath: pathUtil.join(
					__dirname,
					'..',
					'..',
					'jest',
					'GoogleSpreadsheetAdapter'
				),
				sheetId: this.sheetId,
				worksheetId: this.worksheetId,
				testMap: this.testMap,
			}
		)
	}

	protected static async afterAll() {
		await super.afterAll()
		await sheetUtil.deleteWorksheet(this.sheetId, this.worksheetId)
	}

	@test()
	protected static async canFilterMappedTests() {
		const testResults: IJestTestResult[] = SheetsReporterTest.testResults

		const testMap: ITestMap = SheetsReporterTest.testMap

		const results = SheetsReporterUtil.getMappedTests(testMap, testResults)

		const cliTest = results.map((r) => r.title === 'canBootCli')
		const canSyncTest = results.map((r) => r.title === 'canSyncSchemas')

		assert.isOk(cliTest)
		assert.isOk(canSyncTest)
	}

	@test()
	protected static async failsWithBadTestName() {
		await assert.doesThrowAsync(
			// @ts-ignore
			() => this.reporter.reportTestAsPassed('canBooCli'),
			/invalid/i
		)
	}

	@test()
	protected static async canUpdateTestCell() {
		await this.reporter.reportTestAsPassed('canBootCli')

		const value = await sheetUtil.fetchCellValue(
			this.sheetId,
			this.worksheetId,
			'B1'
		)

		assert.isEqual(value, 1)
	}

	@test()
	protected static async canUpdateAllTestsAfterCompletion() {
		await this.reporter.onTestResult({}, { testResults: this.testResults })

		const value = await sheetUtil.fetchCellValue(
			this.sheetId,
			this.worksheetId,
			'B1'
		)

		assert.isEqual(value, 1)

		const value2 = await sheetUtil.fetchCellValue(
			this.sheetId,
			this.worksheetId,
			'B2'
		)

		assert.isEqual(value2, 0)
	}
}
