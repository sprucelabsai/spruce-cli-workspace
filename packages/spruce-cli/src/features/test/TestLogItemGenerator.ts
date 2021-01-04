import chalk from 'chalk'
import durationUtil from '../../utilities/duration.utility'
import {
	SpruceTestFile,
	SpruceTestFileTest,
	TestRunnerStatus,
} from './test.types'

export default class TestLogItemGenerator {
	private startTimes: Record<string, number> = {}
	private testRunnerStatus!: TestRunnerStatus

	public generateLogItemForFile(
		file: SpruceTestFile,
		status: TestRunnerStatus
	): string {
		this.testRunnerStatus = status

		let logContent = ''
		const duration = this.calculateDurationInMs(file)

		logContent += `${this.generateStatusBlock(file.status)}   ${file.path}${
			duration ? ` ${this.generateDuration(file.status, duration)}` : ''
		}\n`

		if (file.tests) {
			file.tests.forEach((test) => {
				const bullet = this.bulletBasedOnStatus(test.status)
				logContent += `              ${bullet} ^-${
					test.name
				}^ ${this.generateDuration(test.status, test.duration)}\n`
			})
		}

		return logContent
	}

	private generateDuration(status: any, duration: number) {
		if (duration === 0) {
			return ''
		}
		const durationColor = this.colorBasedOnStatus(status)
		return `^${durationColor}(${durationUtil.msToFriendly(duration)})^`
	}

	private bulletBasedOnStatus(status: SpruceTestFileTest['status']) {
		let bullet = 'y'

		switch (status) {
			case 'passed':
				bullet = '^g√^'
				break
			case 'failed':
				bullet = '^rx^'
				break
			case 'pending':
			case 'skipped':
				bullet = '^y(skipped)^'
				break
			case 'todo':
				bullet = '^y(todo)^'
				break
			default:
				bullet = '??'
				break
		}

		return bullet
	}

	private calculateDurationInMs(file: SpruceTestFile): number {
		if (file.status !== 'running' && file.tests) {
			return file.tests.reduce((time, test) => {
				time += test.duration
				return time
			}, 0)
		}

		if (!this.startTimes[file.path]) {
			this.startTimes[file.path] = new Date().getTime()
		}

		const delta = new Date().getTime() - this.startTimes[file.path]
		return delta
	}

	public generateErrorLogItemForFile(file: SpruceTestFile): string {
		let errorContent = ''

		file.tests?.forEach((test) => {
			test.errorMessages?.forEach((message) => {
				errorContent += `${chalk.red(file.path)}\n`
				errorContent += ` - ${chalk.red(test.name)}\n\n`
				errorContent += message.replace(`    at`, '\n    at') + '\n\n\n'
			})
		})

		if (!errorContent && file.errorMessage) {
			errorContent += `${chalk.red(file.path)}\n`
			errorContent += file.errorMessage + '\n\n\n'
		}

		return errorContent
	}

	public resetStartTimes() {
		this.startTimes = {}
	}

	private generateStatusBlock(status: SpruceTestFile['status']) {
		const bgColor = this.colorBasedOnStatus(status)

		let statusLabel = status as string
		let color = 'k'
		let padding = 10
		switch (status) {
			case 'passed':
				padding = 11
				color = 'w'
				break
			case 'failed':
				padding = 11
				color = 'w'
				break
		}

		if (status === 'running' && this.testRunnerStatus === 'stopped') {
			statusLabel = 'stopped'
			color = 'w'
		}

		return `^b^#^${bgColor}^${color}^+${this.centerStringWithSpaces(
			statusLabel,
			padding
		)}^`
	}

	private colorBasedOnStatus(status: SpruceTestFile['status']) {
		let color = 'y'

		switch (status) {
			case 'passed':
				color = 'g'
				break
			case 'failed':
				color = 'r'
				break
		}

		if (status === 'running' && this.testRunnerStatus === 'stopped') {
			color = 'b'
		}

		return color
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
