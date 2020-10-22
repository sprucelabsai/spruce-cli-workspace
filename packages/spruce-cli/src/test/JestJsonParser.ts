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
					testFile: this.fullPathToTestFile(json.test.path),
					status: this.mapJestStatusToResultStatus(json.status),
				}

				this.results.push(results)

				dataToProcess = dataToProcess.substr(endDividerEndIdx)
			}
		} while (endDividerStartIdx > -1)

		this.buffer = dataToProcess
	}

	private fullPathToTestFile(path: string) {
		const partialPath = path.split('__tests__').pop()
		if (!partialPath) {
			throw new Error('INVALID TEST FILE')
		}
		const tsFile = partialPath.substr(1, partialPath.length - 3) + 'ts'
		return tsFile
	}

	private mapJestStatusToResultStatus(status: string) {
		const map: Record<string, any> = {
			testStart: 'running',
		}
		return map[status]
	}

	public getResults(): TestResult[] {
		return this.results
	}
}
