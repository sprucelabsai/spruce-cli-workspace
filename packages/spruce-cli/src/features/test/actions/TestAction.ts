import { buildSchema } from '@sprucelabs/schema'
import chalk from 'chalk'
import JestJsonParser from '../../../test/JestJsonParser'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export const optionsSchema = buildSchema({
	id: 'testAction',
	name: 'Test skill',
	fields: {},
})

export type ActionSchema = typeof optionsSchema
export type TestResultStatus = 'running' | 'passed' | 'failed'
export interface SpruceTestFileTest {
	name: string
	status: 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'disabled'
	errorMessages?: string[]
	duration: number
}

export interface SpruceTestFile {
	testFile: string
	status: TestResultStatus
	tests?: SpruceTestFileTest[]
}

export interface SpruceTestResults {
	totalTests?: number
	totalPassed?: number
	totalFailed?: number
	totalTestFiles: number
	testFiles?: SpruceTestFile[]
}

export default class TestAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema

	public async execute(): Promise<IFeatureActionExecuteResponse> {
		let testResults: SpruceTestResults | undefined
		const parser = new JestJsonParser()
		const results: IFeatureActionExecuteResponse = {}

		this.ui.startLoading('Starting tests...')

		try {
			await this.Service('command').execute(
				'yarn test --reporters="@sprucelabs/jest-json-reporter"',
				{
					onData: (data) => {
						this.ui.stopLoading()
						parser.write(data)
						testResults = parser.getResults()
						this.renderTestResults(testResults)
					},
				}
			)
		} catch (err) {
			if (!testResults) {
				results.errors = [err]
			}
		}

		results.summaryLines = []
		results.meta = {
			testResults,
		}

		return results
	}

	private renderTestResults(testResults: SpruceTestResults) {
		this.ui.clear()
		this.ui.renderHero('Running tests')
		testResults.testFiles?.forEach((result) => {
			this.renderTestFile(result)
		})
	}

	private renderTestFile(result: SpruceTestFile) {
		this.ui.renderLine(
			`${this.renderStatusBlock(result.status)} ${result.testFile}`
		)
	}

	private renderStatusBlock(status: SpruceTestFile['status']) {
		let method: keyof typeof chalk = 'bgYellow'
		switch (status) {
			case 'passed':
				method = 'bgGreen'
				break
			case 'failed':
				method = 'bgRed'
				break
		}

		return chalk[method].black(this.centerStringWithSpaces(status, 10))
	}

	private centerStringWithSpaces(text: string, numberOfSpaces: number) {
		text = text.trim()
		let l = text.length
		let w2 = Math.floor(numberOfSpaces / 2)
		let l2 = Math.floor(l / 2)
		let s = new Array(w2 - l2 + 1).join(' ')
		text = s + text + s
		if (text.length < numberOfSpaces) {
			text += new Array(numberOfSpaces - text.length + 1).join(' ')
		}
		return text
	}
}
