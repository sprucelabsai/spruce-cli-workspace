import { buildSchema } from '@sprucelabs/schema'
import chalk from 'chalk'
import TerminalInterface from '../../../interfaces/TerminalInterface'
import JestJsonParser from '../../../test/JestJsonParser'
import TestReporter from '../../../test/TestReporter'
import { GraphicsTextEffect } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'
import {
	SpruceTestFile,
	SpruceTestFileTest,
	SpruceTestResults,
} from '../test.types'

export const optionsSchema = buildSchema({
	id: 'testAction',
	name: 'Test skill',
	fields: {},
})

export type ActionSchema = typeof optionsSchema

export default class TestAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema
	private testReporter: TestReporter | undefined

	public async execute(): Promise<IFeatureActionExecuteResponse> {
		let testResults: SpruceTestResults | undefined
		const parser = new JestJsonParser()
		const results: IFeatureActionExecuteResponse = {}

		this.testReporter = new TestReporter({ ui: this.ui })
		await this.testReporter.start()

		try {
			await this.Service('command').execute(
				'yarn test --reporters="@sprucelabs/jest-json-reporter"',
				{
					onData: (data) => {
						parser.write(data)

						testResults = parser.getResults()

						this.testReporter?.updateResults(testResults)
						this.testReporter?.render()
					},
				}
			)
		} catch (err) {
			if (!testResults) {
				results.errors = [err]
			}
		}

		this.testReporter.destroy()

		results.summaryLines = []
		results.meta = {
			testResults,
		}

		return results
	}
}
