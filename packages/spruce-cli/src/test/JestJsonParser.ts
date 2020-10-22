import { END_DIVIDER, START_DIVIDER } from '@sprucelabs/jest-json-reporter'
import escapeRegExp from 'lodash/escapeRegExp'
import { TestResult } from '../features/test/actions/TestAction'

export default class JestJsonParser {
	private results: TestResult[] = []
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

				const json = JSON.parse(cleanedSegment)

				const results: TestResult = {
					testFile: this.fullPathToTestFile(json),
					status: this.mapJestStatusToResultStatus(json),
				}

				this.results.push(results)

				dataToProcess = dataToProcess.substr(endDividerEndIdx)
			}
		} while (endDividerStartIdx > -1)

		this.buffer = dataToProcess
	}

	private fullPathToTestFile(json: Record<string, any>) {
		const partialPath = (json.test?.path ?? json.results?.testFilePath ?? '')
			.split('__tests__')
			.pop()
		if (!partialPath) {
			throw new Error('INVALID TEST FILE')
		}
		const tsFile = partialPath.substr(1, partialPath.length - 3) + 'ts'
		return tsFile
	}

	private mapJestStatusToResultStatus(
		json: Record<string, any>
	): TestResult['status'] {
		if (json.results) {
			return json.results.numFailingTests == 0 ? 'passed' : 'failed'
		} else {
			return 'running'
		}
	}

	public getResults(): TestResult[] {
		return this.results
	}
}
