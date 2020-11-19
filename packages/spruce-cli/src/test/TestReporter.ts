import { SpruceTestResults } from '../features/test/test.types'
import { Key } from '../widgets/keySelectChoices'
import WidgetFactory from '../widgets/WidgetFactory'
import {
	LayoutWidget,
	MenuBarWidget,
	ProgressBarWidget,
	TextWidget,
	WindowWidget,
} from '../widgets/widgets.types'
import TestLogItemGenerator from './TestLogItemGenerator'

interface TestReporterOptions {
	onRestart?: () => void
	onQuit?: () => void
}

export default class TestReporter {
	private started = false
	private table?: any
	private bar!: ProgressBarWidget
	private layout!: LayoutWidget
	private testLog!: TextWidget
	private errorLog?: TextWidget
	private errorLogItemGenerator: TestLogItemGenerator
	private lastResults?: SpruceTestResults
	private updateInterval?: any
	private menu!: MenuBarWidget
	private window!: WindowWidget
	private widgetFactory: WidgetFactory

	private onRestart?: () => void
	private onQuit?: () => void
	private waitForDoneResolver?: () => void

	public constructor(options?: TestReporterOptions) {
		this.onRestart = options?.onRestart
		this.onQuit = options?.onQuit
		this.errorLogItemGenerator = new TestLogItemGenerator()
		this.widgetFactory = new WidgetFactory()
	}

	public async start() {
		this.started = true

		this.window = this.widgetFactory.Widget('window', {})
		this.window.hideCursor()
		void this.window.on('key', this.handleGlobalKeypress.bind(this))
		void this.window.on('kill', this.destroy.bind(this))

		this.dropInMenu()
		this.dropInProgressBar()
		this.dropInLayout()
		this.dropInTestLog()

		this.updateInterval = setInterval(this.refreshResults.bind(this), 2000)
	}

	private dropInMenu() {
		this.menu = this.widgetFactory.Widget('menuBar', {
			parent: this.window,
			left: 0,
			top: 0,
			items: [
				{
					label: 'Quit',
					value: 'quit',
				},
				{
					label: 'Restart',
					value: 'restart',
				},
			],
		})

		void this.menu.on('select', this.handleMenuSelect.bind(this))
	}

	private handleMenuSelect(payload: { value: string }) {
		switch (payload.value) {
			case 'quit':
				this.handleDone()
				break
			case 'restart':
				this.handleRestart()
				break
		}
	}

	private refreshResults() {
		if (this.lastResults) {
			this.updateLogs(this.lastResults)
		}
	}

	private async handleGlobalKeypress(payload: { key: Key }) {
		switch (payload.key) {
			case 'CTRL_C':
				this.onQuit?.()
				process.exit()
				break
			case 'R':
			case 'r':
				this.handleRestart()
				break
			case 'D':
			case 'd':
				this.handleDone()
				break
		}
	}

	private dropInTestLog() {
		const parent = this.layout.getChildById('results')

		if (parent) {
			this.testLog = this.widgetFactory.Widget('text', {
				parent,
				enableScroll: true,
				left: 0,
				top: 0,
				height: '100%',
				width: '100%',
				shouldLockHeightWithParent: true,
				shouldLockWidthWithParent: true,
			})
		}
	}

	private dropInProgressBar() {
		this.bar = this.widgetFactory.Widget('progressBar', {
			parent: this.window,
			left: 0,
			top: 2,
			width: this.window.getFrame().width,
			shouldLockWidthWithParent: true,
			label: 'Booting Jest...',
			progress: 0,
		})
	}

	private dropInLayout() {
		this.layout = this.widgetFactory.Widget('layout', {
			parent: this.window,
			width: '100%',
			top: 3,
			height: this.window.getFrame().height - 4,
			shouldLockWidthWithParent: true,
			shouldLockHeightWithParent: true,
			rows: [
				{
					height: '100%',
					columns: [
						{
							id: 'results',
							width: '100%',
						},
					],
				},
			],
		})
	}

	public updateResults(results: SpruceTestResults) {
		if (!this.started) {
			throw new Error('You must call start() before anything else.')
		}

		this.lastResults = results

		this.updateProgressBar(results)

		const percentPassing = this.generatePercentPassing(results)
		const percentComplete = this.generatePercentComplete(results)

		this.window.setTitle(
			`Testing: ${percentComplete}% complete.${
				percentComplete > 0 ? ` ${percentPassing}% passing.` : ''
			}`
		)

		this.updateLogs(results)
	}

	private updateLogs(results: SpruceTestResults) {
		let { logContent, errorContent } = this.resultsToLogContents(results)

		this.testLog.setContent(logContent)

		if (this.errorLog) {
			this.errorLog?.setContent(errorContent)
		}
	}

	private resultsToLogContents(results: SpruceTestResults) {
		let logContent = ''
		let errorContent = ''

		results.testFiles?.forEach((file) => {
			logContent += this.errorLogItemGenerator.generateLogItemForFile(file)
			errorContent += this.errorLogItemGenerator.generateErrorLogItemForFile(
				file
			)

			if (errorContent.length > 0) {
				this.dropInErrorLog()
			}
		})

		return { logContent, errorContent }
	}

	private dropInErrorLog() {
		if (this.layout.getRows().length === 1) {
			this.layout.addRow({
				id: 'row_2',
				columns: [{ id: 'errors', width: '100%' }],
			})

			this.layout.setRowHeight(0, '50%')
			this.layout.updateLayout()

			const cell = this.layout.getChildById('errors')

			if (!cell) {
				throw new Error('Pulling child error')
			}

			this.errorLog = this.widgetFactory.Widget('text', {
				parent: cell,
				width: '100%',
				height: '100%',
				enableScroll: true,
				shouldLockHeightWithParent: true,
				shouldLockWidthWithParent: true,
				padding: { left: 1 },
			})
		}
	}

	private updateProgressBar(results: SpruceTestResults) {
		if (results.totalTestFilesComplete ?? 0 > 0) {
			const testsRemaining =
				results.totalTestFiles - (results.totalTestFilesComplete ?? 0)

			if (testsRemaining === 0) {
				const percent = this.generatePercentPassing(results)
				this.bar.setLabel(
					`Finished! ${percent}% passing.${
						percent < 100 ? ` Don't give up! 💪` : ''
					}`
				)
			} else {
				this.bar.setLabel(
					`${results.totalTestFilesComplete} of ${
						results.totalTestFiles
					} (${this.generatePercentComplete(
						results
					)}%) complete. ${testsRemaining} remaining...`
				)
			}
		} else {
			this.bar.setLabel('Running...')
		}

		this.bar.setProgress(this.generatePercentComplete(results) / 100)
	}

	private generatePercentComplete(results: SpruceTestResults): number {
		const percent =
			(results.totalTestFilesComplete ?? 0) / results.totalTestFiles
		if (isNaN(percent)) {
			return 0
		}
		return Math.round(percent * 100)
	}

	private generatePercentPassing(results: SpruceTestResults): number {
		const percent =
			(results.totalPassed ?? 0) /
			((results.totalTests ?? 0) -
				(results.totalSkipped ?? 0) -
				(results.totalTodo ?? 0))
		if (isNaN(percent)) {
			return 0
		}

		return Math.round(percent * 100)
	}

	public render() {
		this.table?.computeCells()
		this.table?.draw()
	}

	public async waitForConfirm() {
		return new Promise((resolve) => {
			this.waitForDoneResolver = resolve
			void this.window.on('key', (payload) => {
				if (payload.key === 'ENTER') {
					this.handleDone()
				}
			})
		})
	}

	private handleDone() {
		if (this.waitForDoneResolver) {
			this.waitForDoneResolver()
		} else {
			this.onQuit?.()
		}
	}

	private handleRestart() {
		this.onRestart?.()

		if (this.waitForDoneResolver) {
			this.waitForDoneResolver()
		}
	}

	public async destroy() {
		clearInterval(this.updateInterval)
		await this.window.destroy()
	}
}
