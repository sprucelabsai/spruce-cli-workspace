import terminal_kit from 'terminal-kit'
import { SpruceTestResults } from '../features/test/test.types'
import WidgetFactory from '../widgets/WidgetFactory'
import {
	LayoutWidget,
	MenuBarWidget,
	ProgressBarWidget,
	TextWidget,
	WindowWidget,
} from '../widgets/widgets.types'
import TestLogItemGenerator from './TestLogItemGenerator'

const termKit = terminal_kit as any

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
	private errorLog?: any
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

		this.dropInProgressBar()
		this.dropInLayout()
		this.dropInTestLog()
		this.dropInMenu()

		return

		this.attachGlobalKeyPressListener()

		this.updateInterval = setInterval(this.refreshResults.bind(this), 2000)
	}

	private dropInMenu() {
		this.menu = this.widgetFactory.Widget('menuBar', {
			parent: this.window,
			left: 0,
			top: 0,
		})

		return
		this.menu = new termKit.RowMenu({
			parent: this.document,
			x: 0,
			y: 0,
			separator: '|',
			items: [
				{
					content: ' Quit ',
					value: 'quit',
				},
				{
					content: ' Restart ',
					value: 'restart',
				},
			],
		})

		this.menu.on('submit', this.handleMenuOption.bind(this))
	}

	private handleMenuOption(action: 'quit' | 'restart') {
		switch (action) {
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

	private attachGlobalKeyPressListener() {
		this.term.on('key', async (key: string) => {
			switch (key) {
				case 'CTRL_C':
					this.onQuit?.()
					await this.destroy()
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
		})
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

		return
		this.testLog = new termKit.TextBox({
			parent: this.document.elements.results,
			scrollable: true,
			vScrollBar: true,
			autoWidth: true,
			outputHeight: this.testLogHeight(),
			wordWrap: false,
			x: 0,
			y: 2,
		})

		this.testLog.on('click', () => {
			this.term.moveTo(20, 0, 'click')
		})
	}

	private dropInProgressBar() {
		this.bar = this.widgetFactory.Widget('progressBar', {
			parent: this.window,
			left: 1,
			top: 1,
			width: this.window.getFrame().width - 2,
			shouldLockWidthWithParent: true,
			label: 'Booting Jest...',
			progress: 0,
		})
	}

	private dropInLayout() {
		this.layout = this.widgetFactory.Widget('layout', {
			parent: this.window,
			width: '100%',
			top: 2,
			height: this.window.getFrame().height - 1,
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

		return

		this.layout.on('parentResize', () => {
			this.handleTerminalResize()
		})
	}

	private handleTerminalResize() {
		this.placeProgressBar()
		this.placeTestLog()
	}

	private testLogHeight() {
		return this.document.elements.results.inputHeight - 2
	}

	public updateResults(results: SpruceTestResults) {
		return
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
		const isScrolledAllTheWay = this.isLogScrolledAllTheWay()

		let { logContent, errorContent } = this.resultsToLogContents(results)

		if (this.testLog.content !== logContent) {
			const logSelection = this.testLog.textBuffer.selectionRegion

			this.testLog.setContent(logContent, true)

			if (logSelection) {
				this.testLog.textBuffer.setSelectionRegion(logSelection)
			}

			if (isScrolledAllTheWay) {
				this.testLog.scrollToBottom()
			}
		}

		if (this.errorLog && this.errorLog.content !== errorContent) {
			this.errorLog?.setContent(errorContent, 'ansi')
		}
	}

	private resultsToLogContents(results: SpruceTestResults) {
		let logContent = ''
		let errorContent = ''

		results.testFiles?.forEach((file) => {
			if (file.status === 'failed') {
				this.dropInErrorLog()
			}
			logContent += this.errorLogItemGenerator.generateLogItemForFile(file)
			errorContent += this.errorLogItemGenerator.generateErrorLogItemForFile(
				file
			)
		})

		return { logContent, errorContent }
	}

	private isLogScrolledAllTheWay() {
		const scrollDistance = this.testLog.scrollY * -1
		const contentHeight = this.testLog.textBuffer.cy
		const visibleHeight = this.testLog.textAreaHeight
		const maxScrollDistance =
			Math.max(contentHeight, visibleHeight) - visibleHeight
		const isScrolledAllTheWay = scrollDistance >= maxScrollDistance
		return isScrolledAllTheWay
	}

	private dropInErrorLog() {
		if (this.layout.layoutDef.rows.length === 1) {
			this.layout.layoutDef.rows[0].heightPercent = 50
			this.layout.layoutDef.rows.push({
				id: 'row_2',
				columns: [{ id: 'errors', widthPercent: 100 }],
			})

			this.layout.computeBoundingBoxes()

			this.errorLog = new termKit.TextBox({
				parent: this.document.elements.errors,
				contentHasMarkup: true,
				scrollable: true,
				vScrollBar: true,
				hScrollBar: true,
				autoWidth: true,
				x: 1,
				autoHeight: true,
				wordWrap: false,
			})

			this.layout.draw()
			this.handleTerminalResize()
		}
	}

	private updateProgressBar(results: SpruceTestResults) {
		if (results.totalTestFilesComplete ?? 0 > 0) {
			const testsRemaining =
				results.totalTestFiles - (results.totalTestFilesComplete ?? 0)

			if (testsRemaining <= 2) {
				debugger
			}

			if (testsRemaining === 0) {
				const percent = this.generatePercentPassing(results)
				this.bar.setLabel(
					`Finished! ${percent}% passing.${
						percent < 100 ? ` Don't give up! 💪` : ''
					}`
				)
			} else {
				this.bar.setLabel(
					`${this.generatePercentComplete(results)}% (${
						results.totalTestFilesComplete
					} of ${
						results.totalTestFiles
					}) complete. ${testsRemaining} remaining...`
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
			this.term.on('key', (key: string) => {
				if (key === 'ENTER') {
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
		this.window.destroy()
	}
}
