import { END_DIVIDER, START_DIVIDER } from '@sprucelabs/jest-json-reporter'
import JsonParser from '@sprucelabs/jest-json-reporter'
import escapeRegExp from 'lodash/escapeRegExp'
import {
	SpruceTestFile,
	TestResultStatus,
	SpruceTestResults,
} from '../features/test/actions/TestAction'

export type JsonResultKeys = JsonParserResult['status']
interface OnTestFileResult {
	status: 'onTestFileResult'
	test: Parameters<JsonParser['onTestFileResult']>[0]
	testResult: Parameters<JsonParser['onTestFileResult']>[1]
	aggregatedResult: Parameters<JsonParser['onTestFileResult']>[2]
}

export type JsonParserResult =
	| {
			status: 'onRunStart'
			results: Parameters<JsonParser['onRunStart']>[0]
	  }
	| {
			status: 'onTestFileStart'
			test: Parameters<JsonParser['onTestFileStart']>[0]
	  }
	| OnTestFileResult

export default class JestJsonParser {
	private testResults: SpruceTestResults = { totalTestFiles: 0 }
	private buffer = ''

	public write(data: string) {
		let dataToProcess = this.buffer + data
		let endDividerStartIdx = -1

		do {
			endDividerStartIdx = dataToProcess.search(escapeRegExp(END_DIVIDER))
			if (endDividerStartIdx > -1) {
				let startDividerIdx = Math.max(
					0,
					dataToProcess.search(escapeRegExp(START_DIVIDER))
				)
				let endDividerEndIdx = endDividerStartIdx + END_DIVIDER.length
				if (startDividerIdx > endDividerStartIdx) {
					startDividerIdx = -1
				}
				const firstSegment = dataToProcess.substr(
					startDividerIdx,
					endDividerEndIdx - startDividerIdx
				)
				const cleanedSegment = firstSegment
					.replace(START_DIVIDER, '')
					.replace(END_DIVIDER, '')
					.trim()

				const result = JSON.parse(cleanedSegment) as JsonParserResult

				this.ingestJestResult(result)

				dataToProcess = dataToProcess.substr(endDividerEndIdx)
			}
		} while (endDividerStartIdx > -1)

		this.buffer = dataToProcess
	}

	private ingestJestResult(result: JsonParserResult) {
		const testFiles = this.testResults.testFiles ?? []
		switch (result.status) {
			case 'onRunStart':
				this.testResults = {
					totalTestFiles: result.results.numTotalTestSuites,
				}
				break

			case 'onTestFileStart':
				testFiles.push({
					testFile: this.pullPathFromTestResponse(result),
					status: this.pullTestFileStatusFromTestResponse(result),
				})
				break
			case 'onTestFileResult': {
				this.testResults.totalTestFiles = result.aggregatedResult.numTotalTests
				this.testResults.totalFailed = result.aggregatedResult.numFailedTests
				this.testResults.totalPassed = result.aggregatedResult.numPassedTests
				for (const testResult of result.aggregatedResult.testResults) {
					const name = this.mapAbsoluteJsToRelativeTsPath(
						testResult.testFilePath
					)
					const idx = testFiles.findIndex((file) => file.testFile === name)
					const file = {
						...(testFiles[idx] ?? {}),
						testFile: name,
						status: this.pullTestFileResultStatus(testResult),
						tests: this.pullTestsFromTestFileResult(testResult),
					}

					if (idx === -1) {
						testFiles.push(file)
					} else {
						testFiles[idx] = file
					}
				}
				break
			}
		}

		if (testFiles.length > 0) {
			this.testResults.testFiles = testFiles
		}

		// const spruceResult: SpruceTestFile = {
		// 	testFile: this.pullPathFromTestResponse(result),
		// 	status: this.pullStatusFromTestResponse(result),
		// }

		// if (result.status === 'onTestFileResult') {
		// 	spruceResult.tests = this.pullTestsFromTestResponse(result)
		// }

		// return spruceResult
	}

	private pullPathFromTestResponse(result: JsonParserResult) {
		let path = ''

		switch (result.status) {
			case 'onTestFileResult':
			case 'onTestFileStart':
				path = result.test.path
				break
		}

		const tsFile = this.mapAbsoluteJsToRelativeTsPath(path)
		return tsFile
	}

	private mapAbsoluteJsToRelativeTsPath(path: string) {
		const partialPath = path.split('__tests__').pop()
		if (!partialPath) {
			throw new Error('INVALID TEST FILE')
		}
		const tsFile = partialPath.substr(1, partialPath.length - 3) + 'ts'
		return tsFile
	}

	private pullTestFileStatusFromTestResponse(
		result: JsonParserResult
	): SpruceTestFile['status'] {
		switch (result.status) {
			case 'onTestFileResult':
				return this.pullTestFileResultStatus(result.testResult)
			default:
				return 'running'
		}
	}

	private pullTestFileResultStatus(
		testResult: OnTestFileResult['testResult']
	): TestResultStatus {
		return testResult.numFailingTests > 0 ? 'failed' : 'passed'
	}

	private pullTestsFromTestFileResult(
		testResult: OnTestFileResult['testResult']
	): SpruceTestFile['tests'] {
		return testResult.testResults.map((test) => ({
			name: test.title,
			status: test.status,
			errorMessages: test.failureMessages,
			duration: test.duration ?? 0,
		}))
	}

	public getResults(): SpruceTestResults {
		return this.testResults
	}
}
