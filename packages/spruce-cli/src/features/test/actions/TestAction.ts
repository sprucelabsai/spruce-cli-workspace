import { buildSchema } from '@sprucelabs/schema'
import chalk from 'chalk'
import { terminal } from 'terminal-kit'
import TerminalInterface from '../../../interfaces/TerminalInterface'
import JestJsonParser from '../../../test/JestJsonParser'
import { GraphicsTextEffect } from '../../../types/cli.types'
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
	totalTestFilesComplete?: number
	testFiles?: SpruceTestFile[]
}

export default class TestAction extends AbstractFeatureAction<ActionSchema> {
	public name = 'test'
	public optionsSchema = optionsSchema
	private testReportStartY = 0

	public async execute(): Promise<IFeatureActionExecuteResponse> {
		let testResults: SpruceTestResults | undefined
		const parser = new JestJsonParser()
		const results: IFeatureActionExecuteResponse = {}

		this.ui.clear()
		this.ui.renderHero('Testing...')

		const progressBar = terminal.progressBar({
			width: 100,
			percent: true,
		})

		this.testReportStartY = await new Promise((resolve) => {
			terminal.requestCursorLocation()
			terminal.getCursorLocation((err, x, y) => {
				resolve((y ?? 10) + 2)
			})
		})

		try {
			await this.Service('command').execute(
				'yarn test --reporters="@sprucelabs/jest-json-reporter"',
				{
					onData: (data) => {
						parser.write(data)
						testResults = parser.getResults()
						this.renderTestResults(testResults)

						progressBar?.update(
							(testResults.totalTestFilesComplete ?? 0) /
								testResults.totalTestFiles
						)
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
		terminal.moveTo(0, this.testReportStartY)
		terminal.eraseDisplayBelow()
		testResults.testFiles?.forEach((result) => {
			this.renderTestFile(result)
		})
	}

	private renderTestFile(result: SpruceTestFile) {
		const term = this.ui as TerminalInterface

		this.ui.renderLine(
			`${this.renderStatusBlock(result.status)} ${result.testFile}`,
			[]
		)
		if (result.status === 'failed') {
			result.tests?.forEach((test) => {
				const effects: GraphicsTextEffect[] = this.generateTestTextEffects(test)

				term.renderLine(`           ${'x ' + test.name}`, effects, {})

				if (test.status === 'failed') {
					test.errorMessages?.forEach((message) => {
						this.ui.renderDivider()
						term.renderCodeSample(message)
						this.ui.renderDivider()
					})
				}
			})
		}
	}

	private generateTestTextEffects(test: SpruceTestFileTest) {
		const effects: GraphicsTextEffect[] = [GraphicsTextEffect.Italic]
		switch (test.status) {
			case 'failed':
				effects.push(GraphicsTextEffect.Red)
				break
			case 'passed':
				effects.push(GraphicsTextEffect.Green)
				break
		}
		return effects
	}

	private renderStatusBlock(status: SpruceTestFile['status']) {
		let method: keyof typeof chalk = 'bgYellow'
		let padding = 10
		switch (status) {
			case 'passed':
				method = 'bgGreen'
				padding = 11
				break
			case 'failed':
				padding = 11
				method = 'bgRed'
				break
		}

		return chalk[method].black(this.centerStringWithSpaces(status, padding))
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
