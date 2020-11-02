import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import JestJsonParser from '../../../test/JestJsonParser'
import TestReporter from '../../../test/TestReporter'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'
import { SpruceTestResults } from '../test.types'

export const optionsSchema = buildSchema({
	id: 'testAction',
	name: 'Test skill',
	fields: {
		shouldReportWhileRunning: {
			type: 'boolean',
			label: 'Report while running',
			hint: 'Should I output the test results while they are running?',
			defaultValue: true,
		},
	},
})

export type OptionsSchema = typeof optionsSchema

export default class TestAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema
	private testReporter: TestReporter | undefined

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const { shouldReportWhileRunning } = normalizedOptions

		let testResults: SpruceTestResults | undefined
		const parser = new JestJsonParser()
		const results: IFeatureActionExecuteResponse = {}

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter()
			await this.testReporter?.start()
		}

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

		await this.testReporter?.destroy()

		results.summaryLines = []
		results.meta = {
			testResults,
		}

		return results
	}
}
