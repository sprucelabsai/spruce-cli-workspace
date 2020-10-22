import { buildSchema } from '@sprucelabs/schema'
import JestJsonParser from '../../../test/JestJsonParser'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export const optionsSchema = buildSchema({
	id: 'testAction',
	name: 'Test skill',
	fields: {},
})

export type ActionSchema = typeof optionsSchema
export interface TestResult {
	testFile: string
	status: 'running' | 'passed' | 'failed'
}

export default class TestAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema

	public async execute(): Promise<IFeatureActionExecuteResponse> {
		let testResults: TestResult[] = []
		const parser = new JestJsonParser()

		await this.Service('command').execute(
			'yarn test --reporters="@sprucelabs/jest-json-reporter"',
			{
				ignoreErrors: true,
				onData: (data) => {
					parser.write(data)
					testResults = parser.getResults()
				},
			}
		)

		return {
			meta: {
				testResults,
			},
		}
	}
}
