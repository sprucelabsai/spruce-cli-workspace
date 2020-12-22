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
		shouldStartTestsImmediately: {
			type: 'boolean',
			label: 'Start test immediately',
			defaultValue: true,
		},
	},
})

export type OptionsSchema = typeof optionsSchema

export default class TestAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema
	private testReporter?: TestReporter | undefined
	private testRunner?: TestRunner
	private runnerStatus: 'hold' | 'quit' | 'run' = 'hold'
	private pattern: string | undefined
	private inspect?: number | null
	private holdPromiseResolve?: () => void
	private lastTestResults: SpruceTestResults = { totalTestFiles: 0 }

	public constructor(options: FeatureActionOptions) {
		super(options)
	}

	public async execute(
		options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)

		const {
			pattern,
			shouldReportWhileRunning,
			inspect,
			shouldStartTestsImmediately,
		} = normalizedOptions

		this.inspect = inspect
		this.pattern = pattern

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter({
				isDebugging: !!inspect,
				filterPattern: pattern ?? undefined,
				handleStartStop: this.handleStartStop.bind(this),
				handleQuit: this.handleQuit.bind(this),
				handleRerunTestFile: this.handleRerunTestFile.bind(this),
				handleOpenTestFile: this.handleOpenTestFile.bind(this),
				handleFilterPatternChange: this.handleFilterPatternChange.bind(this),
				handleToggleDebug: this.toggleDebug.bind(this),
			})

			await this.testReporter.start()
		}

		this.runnerStatus = shouldStartTestsImmediately ? 'run' : 'hold'

		const testResults = await this.startTestRunner(normalizedOptions)

		await this.testReporter?.destroy()

		const actionResponse: FeatureActionResponse = {
			summaryLines: [
				`Test files: ${testResults.totalTestFiles}`,
				`Tests: ${testResults.totalTests ?? '0'}`,
				`Passed: ${testResults.totalPassed ?? '0'}`,
				`Failed: ${testResults.totalFailed ?? '0'}`,
				`Skipped: ${testResults.totalSkipped ?? '0'}`,
				`Todo: ${testResults.totalTodo ?? '0'}`,
			],
		}

		if (testResults.totalFailed ?? 0 > 0) {
			actionResponse.errors = this.generateErrorsFromTestResults(testResults)
		}

		return actionResponse
	}

	private toggleDebug() {
		if (this.inspect) {
			this.inspect = undefined
		} else {
			this.inspect = 5200
		}

		this.testReporter?.setIsDebugging(!!this.inspect)
		if (this.runnerStatus === 'run') {
			this.restart()
		}
	}

	private restart() {
		this.handleStartStop()
		if (this.runnerStatus !== 'run') {
			this.handleStartStop()
		}
	}

	private handleQuit() {
		this.runnerStatus = 'quit'
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
		this.handleStartStop()
	}

	private handleStartStop() {
		if (this.runnerStatus === 'hold') {
			this.runnerStatus = 'run'
			this.holdPromiseResolve?.()
			this.holdPromiseResolve = undefined
		} else if (this.runnerStatus === 'run') {
			this.runnerStatus = 'hold'
			this.kill()
		}
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
	): Promise<SpruceTestResults> {
		if (this.runnerStatus === 'hold') {
			await this.waitForStart()
		}

		if (this.runnerStatus === 'quit') {
			return this.lastTestResults
		}

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

		this.runnerStatus = 'run'
		this.testReporter?.setStatus('running')
		this.testReporter?.resetStartTimes()

		let testResults: SpruceTestResults = await this.testRunner.run({
			pattern: this.pattern,
			debugPort: this.inspect,
		})

		if (!options.shouldReportWhileRunning) {
			return testResults
		}

		this.testReporter?.setStatus('stopped')
		this.runnerStatus = 'hold'

		this.lastTestResults = testResults

		return this.startTestRunner(options)
	}

	public async waitForStart() {
		await new Promise((resolve: any) => {
			this.runnerStatus = 'hold'
			this.holdPromiseResolve = resolve
		})
	}

	private async openTestFile(fileName: string): Promise<void> {
		const path = diskUtil.resolvePath(this.cwd, 'src', '__tests__', fileName)
		await open(path)
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
