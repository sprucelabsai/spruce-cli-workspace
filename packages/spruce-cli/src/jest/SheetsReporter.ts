import pathUtil from 'path'
import {
	IJestTest,
	IJestTestResults,
	IJestTestResult,
	IGoogleSheetsAdapter
} from '../types/jest.types'

export interface ISheetsReporterOptions<TestMap extends ITestMap = ITestMap> {
	sheetId: string
	worksheetId: number
	adapterFilepath: string
	testMap: TestMap
}

export interface ITestMap {
	[testName: string]: string
}

export class SheetsReporterUtil {
	public static getMappedTests(map: ITestMap, results: IJestTestResult[]) {
		return results.filter(testResult => {
			return !!map[testResult.title]
		})
	}
}

export default class SheetsReporter<TestMap extends ITestMap> {
	private adapter: IGoogleSheetsAdapter
	private testMap: TestMap
	private sheetId: string
	private worksheetId: number

	public constructor(_: any, options: ISheetsReporterOptions<TestMap>) {
		const adapterPath =
			options.adapterFilepath[0] === pathUtil.sep
				? options.adapterFilepath
				: pathUtil.join(process.cwd(), options.adapterFilepath)

		const AdapterClass = require(adapterPath).default
		this.adapter = new AdapterClass()

		this.testMap = options.testMap
		this.sheetId = options.sheetId
		this.worksheetId = options.worksheetId
	}

	public onTestResult(_: IJestTest, testResult: IJestTestResults) {
		const filteredTests = SheetsReporterUtil.getMappedTests(
			this.testMap,
			testResult.testResults
		)

		for (const test of filteredTests) {
			if (test.status === 'passed') {
				this.reportTestAsPassed(test.title)
			} else {
				this.reportTestAsFailed(test.title)
			}
		}
	}

	public async reportTestAsPassed(testName: keyof TestMap) {
		await this.reportTest(testName, 'passed')
	}

	public async reportTestAsFailed(testName: keyof TestMap) {
		await this.reportTest(testName, 'failed')
	}

	private async reportTest(
		testName: keyof TestMap,
		status: IJestTestResult['status']
	) {
		if (!this.testMap[testName]) {
			throw new Error(
				`Invalid test name. Got "${testName}" but expected one of the following: ${Object.keys(
					this.testMap
				).join(', ')}`
			)
		}
		const cell = this.testMap[testName]
		await this.adapter.updateCell({
			sheetId: this.sheetId,
			worksheetId: this.worksheetId,
			cell,
			value: status === 'passed' ? 1 : 0
		})
	}
}
