import terminal_kit from 'terminal-kit'
import { SpruceTestResults } from '../features/test/test.types'
import TestLogItemGenerator from './TestLogItemGenerator'

const termKit = terminal_kit as any

interface TestReporterOptions {
	onRestart?: () => void
	onQuit?: () => void
}

export default class TestReporter {
	private started = false
	private document: any
	private table?: any
	private bar: any
	private layout: any
	private testLog: any
	private errorLog?: any
	private term: any
	private doneBtn?: any
	private restartBtn: any
	private errorLogItemGenerator: TestLogItemGenerator
	private lastResults?: SpruceTestResults
	private updateInterval?: any

	private onRestart?: () => void
	private onQuit?: () => void
	private waitForDoneResolver?: () => void

	public constructor(options?: TestReporterOptions) {
		this.onRestart = options?.onRestart
		this.onQuit = options?.onQuit
		this.errorLogItemGenerator = new TestLogItemGenerator()
	}

	public async start() {
		this.started = true
		this.term = termKit.terminal as any

		this.term.hideCursor(true)
		this.document = this.term.createDocument({
			palette: new termKit.Palette(),
		})

		this.dropInLayout()
		this.dropInProgressBar()
		this.dropInTestLog()
		this.dropInRestartButton()
		this.attachGlobalKeyPressListener()

		this.updateInterval = setInterval(this.refreshResults.bind(this), 2000)
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
	}

	private dropInProgressBar() {
		this.bar = new termKit.Bar({
			parent: this.document.elements.results,
			x: 1,
			y: 0,
			barChars: 'solid',
			width: this.getProgressBarWidth(),
			content: ' Booting Jest...',
			value: 0,
		})
	}

	private dropInLayout() {
		this.layout = new termKit.Layout({
			parent: this.document,
			layout: {
				id: 'main_layout',
				widthPercent: 100,
				height: this.document.inputHeight - 1,
				rows: [
					{
						id: 'row_1',
						heightPercent: 100,
						columns: [{ id: 'results', widthPercent: 100 }],
					},
				],
			},
		})

		this.layout.on('parentResize', () => {
			this.handleTerminalResize()
		})
	}

	private handleTerminalResize() {
		this.placeProgressBar()
		this.placeTestLog()
		this.placeRestartBtn()
		this.placeDoneBtn()
	}

	private placeProgressBar() {
		this.bar.outputWidth = this.getProgressBarWidth()
	}

	private placeTestLog() {
		this.testLog.setSizeAndPosition({ outputHeight: this.testLogHeight() })
		this.testLog.draw()
	}

	private placeRestartBtn() {
		const { x: doneX, y: doneY } = this.getRestartBtnPosition()
		this.restartBtn.outputX = doneX
		this.restartBtn.outputY = doneY
	}

	private placeDoneBtn() {
		const { x: doneX, y: doneY } = this.getDoneBtnPosition()
		if (this.doneBtn) {
			this.doneBtn.outputX = doneX
			this.doneBtn.outputY = doneY
		}
	}

	private testLogHeight() {
		return this.document.elements.results.inputHeight - 2
	}

	private getProgressBarWidth() {
		return this.document.inputWidth - 4
	}

	public updateResults(results: SpruceTestResults) {
		if (!this.started) {
			throw new Error('You must call start() before anything else.')
		}

		this.lastResults = results

		this.updateProgressBar(results)

		const percentPassing = this.generatePercentPassing(results)
		const percentComplete = this.generatePercentComplete(results)

		this.term.windowTitle(
			`Testing: ${percentComplete}% complete.${
				percentComplete > 0 ? ` ${percentPassing}% passing.` : ''
			}`
		)

		this.updateLogs(results)
	}

	private updateLogs(results: SpruceTestResults) {
		const isScrolledAllTheWay = this.isLogScrolledAllTheWay()

		let { logContent, errorContent } = this.resultsToLogContents(results)

		const logSelection = this.testLog.textBuffer.selectionRegion

		this.testLog.setContent(logContent, true)

		if (logSelection) {
			this.testLog.textBuffer.setSelectionRegion(logSelection)
		}

		if (isScrolledAllTheWay) {
			this.testLog.scrollToBottom()
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

			if (testsRemaining === 0) {
				const percent = this.generatePercentPassing(results)
				this.bar.setContent(
					` Finished! ${percent}% passing.${
						percent < 100 ? ` Don't give up! 💪` : ''
					}`
				)
			} else {
				this.bar.setContent(
					` ${this.generatePercentComplete(results)}% (${
						results.totalTestFilesComplete
					} of ${
						results.totalTestFiles
					}) complete. ${testsRemaining} remaining...`
				)
			}
		} else {
			this.bar.setContent(' Running...')
		}

		this.bar.setValue(this.generatePercentComplete(results) / 100)
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
			this.dropInDoneBtn()
			this.term.on('key', (key: string) => {
				if (key === 'ENTER') {
					this.handleDone()
				}
			})
		})
	}

	private handleDone() {
		this.waitForDoneResolver?.()
	}

	private dropInDoneBtn() {
		const { x, y } = this.getDoneBtnPosition()

		this.doneBtn = new termKit.Button({
			parent: this.document,
			content: ' Done ',
			x,
			y,
		})

		this.doneBtn.on('submit', this.handleDone.bind(this))
	}

	private dropInRestartButton() {
		const { x, y } = this.getRestartBtnPosition()

		this.restartBtn = new termKit.Button({
			parent: this.document,
			content: ' Restart ',
			x,
			y,
		})

		this.restartBtn.on('submit', this.handleRestart.bind(this))
	}

	private getRestartBtnPosition() {
		const x = this.document.inputWidth - 10
		const y = this.document.inputHeight - 1
		return { x, y }
	}

	private getDoneBtnPosition() {
		const x = this.document.inputWidth - 18
		const y = this.document.inputHeight - 1
		return { x, y }
	}

	private handleRestart() {
		this.onRestart?.()

		if (this.waitForDoneResolver) {
			this.waitForDoneResolver()
		}
	}

	public async destroy() {
		await this.term.grabInput(false, true)

		clearInterval(this.updateInterval)

		this.term.hideCursor(false)

		this.term.styleReset()

		this.document.destroy()

		this.term('\n')
	}
}
