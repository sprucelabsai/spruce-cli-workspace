import pathUtil from 'path'
import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'
import CommandService from '../../../services/CommandService'
import JestJsonParser from '../../../test/JestJsonParser'
import TestReporter from '../../../test/TestReporter'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import {
	FeatureActionResponse,
	IFeatureActionOptions,
} from '../../features.types'
import {
	SpruceTestFile,
	SpruceTestFileTest,
	SpruceTestResults,
} from '../test.types'

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
	private commandService: CommandService

	public constructor(options: IFeatureActionOptions) {
		super(options)
		this.commandService = this.Service('command')
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

		const parser = new JestJsonParser()
		const results: FeatureActionResponse = {}
		let restart = false
		let shouldWaitForConfirm = true

		if (shouldReportWhileRunning) {
			this.testReporter = new TestReporter({
				onRestart: () => {
					restart = true
					this.commandService.kill()
				},
				onQuit: () => {
					shouldWaitForConfirm = false
					this.commandService.kill()
				},
			})
			await this.testReporter?.start()
		}

		let testResults: SpruceTestResults = {
			totalTestFiles: 0,
		}

		try {
			const debugArgs = (inspect ?? 0) > 0 ? `--inspect-brk=${inspect}` : ``
			const jestPath = this.resolvePathToJest()
			const command = `node ${debugArgs} ${jestPath} --reporters="@sprucelabs/jest-json-reporter" --testRunner="jest-circus/runner" --forceExit ${
				pattern ?? ''
			}`

			await this.commandService.execute(command, {
				forceColor: true,
				onData: (data) => {
					testResults = this.sendToReporter(parser, data)
				},
			})
		} catch (err) {
			if (!testResults.totalTestFiles) {
				shouldWaitForConfirm = false
				results.errors = [err]
			}
		}

		if (!restart && shouldWaitForConfirm && shouldReportWhileRunning) {
			await this.testReporter?.waitForConfirm()
		}

		await this.testReporter?.destroy()

		if (restart) {
			this.ui.clear()
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

	private sendToReporter(parser: JestJsonParser, data: string) {
		parser.write(data)

		const testResults = parser.getResults()

		this.testReporter?.updateResults(testResults)
		this.testReporter?.render()
		return testResults
	}

	private mixinSummaryAndTestResults(
		results: FeatureActionResponse,
		testResults: SpruceTestResults
	) {
		results.summaryLines = [
			`Test files: ${testResults.totalTestFiles}`,
			`Tests: ${testResults.totalTests}`,
			`Passed: ${testResults.totalPassed}`,
			`Failed: ${testResults.totalFailed}`,
			`Skipped: ${testResults.totalSkipped}`,
			`Todo: ${testResults.totalTodo}`,
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

	private resolvePathToJest() {
		const fullPath = diskUtil.resolvePath(this.cwd, 'node_modules/.bin/jest')
		const pathParts = fullPath.split(pathUtil.sep)

		while (pathParts.length > 0) {
			const path = pathUtil.sep + pathUtil.join(...pathParts)
			if (diskUtil.doesFileExist(path)) {
				return path
			}
			pathParts.pop()
		}

		throw new SpruceError({
			code: 'FEATURE_NOT_INSTALLED',
			featureCode: this.parent.code,
			friendlyMessage: `You are missing dependencies I need to run tests. Try \`spruce test.install\` to reinstall.`,
		})
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
