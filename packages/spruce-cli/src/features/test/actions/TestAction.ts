import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import SpruceError from '../../../errors/SpruceError'
import TestReporter from '../../../tests/TestReporter'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import {
	FeatureActionResponse,
	FeatureActionOptions,
} from '../../features.types'
import {
	SpruceTestFile,
	SpruceTestFileTest,
	SpruceTestResults,
} from '../test.types'
import TestRunner from '../TestRunner'

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
		pattern: {
			type: 'text',
			label: 'Pattern',
			hint: `I'll filter all tests that match this pattern`,
		},
		inspect: {
			type: 'number',
			label: 'Inspect',
			hint: `Pass --inspect related args to test process.`,
		},
	},
})

export type OptionsSchema = typeof optionsSchema

export default class TestAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema
	private testReporter: TestReporter | undefined

	public constructor(options: FeatureActionOptions) {
		super(options)
	}

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const results: FeatureActionResponse = await this.runTests(
			normalizedOptions
		)

		return results
	}

	private async runTests(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const { shouldReportWhileRunning, pattern, inspect } = options

		const results: FeatureActionResponse = {}
		let restart = false
		let shouldWaitForConfirm = true
		const testRunner = new TestRunner({
			cwd: this.cwd,
			commandService: this.Service('command'),
		})

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter({
				onRestart: () => {
					restart = true
					testRunner.kill()
				},
				onQuit: () => {
					shouldWaitForConfirm = false
					testRunner.kill()
				},
				onRerun: (_fileName: string) => {},
			})

			await this.testReporter?.start()

			await testRunner.on(
				'did-update',
				(payload: { results: SpruceTestResults }) => {
					this.testReporter?.updateResults(payload.results)
					this.testReporter?.render()
				}
			)
		}

		let testResults: SpruceTestResults = await testRunner.run({
			pattern,
			debugPort: inspect,
		})

		const shouldWait =
			!restart && shouldWaitForConfirm && shouldReportWhileRunning

		if (shouldWait) {
			await this.testReporter?.waitForConfirm()
		}

		await this.testReporter?.destroy()

		if (restart) {
			return this.runTests(options)
		}

		if (testResults.totalTestFiles > 0) {
			this.mixinSummaryAndTestResults(results, testResults)
		}

		results.meta = {
			testResults,
		}

		return results
	}

	private mixinSummaryAndTestResults(
		results: FeatureActionResponse,
		testResults: SpruceTestResults
	) {
		results.summaryLines = [
			`Test files: ${testResults.totalTestFiles}`,
			`Tests: ${testResults.totalTests ?? '0'}`,
			`Passed: ${testResults.totalPassed ?? '0'}`,
			`Failed: ${testResults.totalFailed ?? '0'}`,
			`Skipped: ${testResults.totalSkipped ?? '0'}`,
			`Todo: ${testResults.totalTodo ?? '0'}`,
		]

		results.errors = this.generateErrorsFromTestResults(testResults)
	}

	private generateErrorsFromTestResults(testResults: SpruceTestResults) {
		const errors: SpruceError[] = []
		testResults.testFiles?.forEach((file) => {
			file.tests?.forEach((test) => {
				test.errorMessages?.forEach((message) => {
					const err = this.mapErrorResultToSpruceError(test, file, message)
					errors.push(err)
				})
			})
		})
		if (errors.length > 0) {
			return errors
		}

		return undefined
	}

	private mapErrorResultToSpruceError(
		test: SpruceTestFileTest,
		file: SpruceTestFile,
		message: string
	) {
		return new SpruceError({
			code: 'TEST_FAILED',
			testName: test.name,
			fileName: file.path,
			errorMessage: message,
		})
	}
}
