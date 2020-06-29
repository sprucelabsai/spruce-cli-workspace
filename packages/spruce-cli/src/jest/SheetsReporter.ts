import {
	IJestTest,
	IJestTestResults,
	IJestTestResult
} from '../types/jest.types'

export interface ISheetsReporterOptions {
	sheetId: string
	worksheetId: string
	testMap: {
		[testName: string]: string
	}
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

export default class SheetsReporter {
	public constructor(options: ISheetsReporterOptions) {}
	public onTestResult(_: IJestTest, testResult: IJestTestResults) {}
}
