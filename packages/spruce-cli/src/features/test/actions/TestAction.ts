import pathUtil from 'path'
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
	private pattern: string | undefined
	private inspect?: number | null
	private holdPromiseResolve?: () => void

	public constructor(options: FeatureActionOptions) {
		super(options)
	}

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const { pattern, shouldReportWhileRunning, inspect } = normalizedOptions

		this.inspect = inspect
		this.pattern = pattern

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter({
				isDebugging: !!inspect,
				filterPattern: pattern ?? undefined,
				handleRestart: this.handleRestart.bind(this),
				handleQuit: this.handleQuit.bind(this),
				handleRerunTestFile: this.handleRerunTestFile.bind(this),
				handleOpenTestFile: this.handleOpenTestFile.bind(this),
				handleFilterPatternChange: this.handleFilterPatternChange.bind(this),
				handleToggleDebug: this.toggleDebug.bind(this),
			})

			await this.testReporter.start()
		}

		const results: FeatureActionResponse = await this.startTestRunner(
			normalizedOptions
		)

		await this.testReporter?.destroy()

		return results
	}

	private toggleDebug() {
		if (this.inspect) {
			this.inspect = undefined
		} else {
			this.inspect = 5200
		}

		this.testReporter?.setIsDebugging(!!this.inspect)
		this.handleRestart()
	}

	private handleQuit() {
		this.exitAction = 'quit'
		this.kill()
	}

	private handleRerunTestFile(file: string) {
		const name = file.split(pathUtil.sep).pop()?.replace('.test.ts', '')
		this.testReporter?.setFilterPattern(name)
		this.handleFilterPatternChange(name)
	}

	private handleFilterPatternChange(filterPattern?: string) {
		this.pattern = filterPattern
		this.testReporter?.setFilterPattern(filterPattern)
		this.exitAction = 'restart'
		this.kill()
	}

	private handleRestart() {
		this.exitAction = 'restart'
		this.kill()
	}

	private kill() {
		this.testRunner?.kill()
		this.holdPromiseResolve?.()
		this.holdPromiseResolve = undefined
	}

	private async handleOpenTestFile(fileName: string) {
		await this.openTestFile(fileName)
	}

	private async startTestRunner(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		let { shouldReportWhileRunning } = options

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
			pattern: this.pattern,
			debugPort: this.inspect,
		})

		const shouldWait = this.exitAction === 'hold' && shouldReportWhileRunning

		if (shouldWait) {
			await new Promise((resolve) => {
				this.holdPromiseResolve = resolve as any
			})
		}

		if (this.exitAction === 'restart') {
			this.exitAction = 'hold'
			this.testReporter?.resetStartTimes()
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
