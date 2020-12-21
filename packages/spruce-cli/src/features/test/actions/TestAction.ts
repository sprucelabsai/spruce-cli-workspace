import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import open from 'open'
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
	private testReporter?: TestReporter | undefined
	private testRunner?: TestRunner
	private exitAction: 'restart' | 'hold' | 'quit' = 'hold'
	private filter: string | undefined

	public constructor(options: FeatureActionOptions) {
		super(options)
	}

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const { pattern, shouldReportWhileRunning } = normalizedOptions

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter({
				filter: pattern ?? undefined,
				onRestart: this.handleRestart.bind(this),
				onQuit: this.handleQuit.bind(this),
				handleRerunTestFile: this.handleRerunTestFile.bind(this),
				handleOpenTestFile: this.handleOpenTestFile.bind(this),
				handleFilterChange: this.handleFilterChange.bind(this),
			})

			await this.testReporter.start()
		}

		const results: FeatureActionResponse = await this.startTestRunner(
			normalizedOptions
		)

		await this.testReporter?.destroy()

		return results
	}

	private handleQuit() {
		this.exitAction = 'quit'

		this.testRunner?.kill()
	}

	private handleRerunTestFile(file: string) {
		this.testReporter?.setFilter(file)
		this.handleFilterChange(file)
	}

	private handleFilterChange(filter?: string) {
		this.filter = filter?.replace('.ts', '')
		this.exitAction = 'restart'
		this.testRunner?.kill()
	}

	private handleRestart() {
		this.exitAction = 'restart'

		this.testRunner?.kill()
	}

	private async handleOpenTestFile(fileName: string) {
		await this.openTestFile(fileName)
	}

	private async startTestRunner(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		let { shouldReportWhileRunning, inspect } = options

		const results: FeatureActionResponse = {}

		this.testRunner = new TestRunner({
			cwd: this.cwd,
			commandService: this.Service('command'),
		})

		if (this.testReporter) {
			await this.testRunner.on(
				'did-update',
				(payload: { results: SpruceTestResults }) => {
					this.testReporter?.updateResults(payload.results)
					this.testReporter?.render()
				}
			)
		}

		let testResults: SpruceTestResults = await this.testRunner.run({
			pattern: this.filter,
			debugPort: inspect,
		})

		const shouldWait = this.exitAction === 'hold' && shouldReportWhileRunning

		if (shouldWait) {
			await this.testReporter?.waitForConfirm()
		}

		if (this.exitAction === 'restart') {
			this.exitAction = 'hold'
			return this.startTestRunner(options)
		}

		if (testResults.totalTestFiles > 0) {
			this.mixinSummaryAndTestResults(results, testResults)
		}

		results.meta = {
			testResults,
		}

		return results
	}

	private async openTestFile(fileName: string): Promise<void> {
		const path = diskUtil.resolvePath(this.cwd, 'src', '__tests__', fileName)
		await open(path)
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
