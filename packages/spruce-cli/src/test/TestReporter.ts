import terminal_kit from 'terminal-kit'
import { SpruceTestFile, SpruceTestResults } from '../features/test/test.types'

const termKit = terminal_kit as any

export default class TestReporter {
	private started = false
	private document: any
	private table?: any
	private bar: any
	private layout: any
	private testLog: any
	private errorLog?: any
	private term: any

	public constructor() {}

	public async start() {
		this.started = true
		this.term = termKit.terminal as any

		this.term.hideCursor(true)
		this.document = this.term.createDocument({
			palette: new termKit.Palette(),
		})

		this.layout = new termKit.Layout({
			parent: this.document,
			layout: {
				id: 'main_layout',
				widthPercent: 100,
				heightPercent: 100,
				rows: [
					{
						id: 'row_1',
						heightPercent: 100,
						columns: [{ id: 'results', widthPercent: 100 }],
					},
				],
			},
		})

		this.bar = new termKit.Bar({
			parent: this.document.elements.results,
			x: 1,
			y: 0,
			barChars: 'solid',
			width: this.barWidth(),
			content: ' Booting Jest...',
			value: 0,
		})

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

		this.layout.on('parentResize', () => {
			this.handleTerminalResize()
		})

		this.term.on('key', async (key: string) => {
			switch (key) {
				case 'CTRL_C':
					await this.destroy()
					process.exit()
					break
			}
		})
	}

	private handleTerminalResize() {
		this.bar.outputWidth = this.barWidth()
		this.testLog.setSizeAndPosition({ outputHeight: this.testLogHeight() })
		this.testLog.draw()
	}

	private testLogHeight() {
		return this.document.elements.results.inputHeight - 2
	}

	private barWidth() {
		return this.document.inputWidth - 4
	}

	public updateResults(results: SpruceTestResults) {
		if (!this.started) {
			throw new Error('You must call start() before anything else.')
		}

		this.updateProgressBar(results)

		this.term.windowTitle(
			`Testing: ${Math.round(this.generatePercentComplete(results) * 100)}%`
		)

		let content = ''
		let errorContent = ''

		results.testFiles?.forEach((file) => {
			if (file.status === 'failed') {
				this.dropInErrorLog()
				file.tests?.forEach((test) => {
					test.errorMessages?.forEach((message) => {
						errorContent += `^r^+${file.path}\n`
						errorContent += ` - ^r^+${test.name}\n\n`
						errorContent += message + '\n'
					})
				})
			}
			content += `${this.renderStatusBlock(file.status)}   ${file.path}\n`
		})

		this.testLog.setContent(content, true)
		this.testLog.scrollToBottom()

		this.errorLog?.setContent(errorContent, true)
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
			this.bar.setContent(
				` Completed ${results.totalTestFilesComplete} of ${
					results.totalTestFiles
				}. ${
					results.totalTestFiles - (results.totalTestFilesComplete ?? 0)
				} remaining...`
			)
		} else {
			this.bar.setContent('Running...')
		}

		this.bar.setValue(this.generatePercentComplete(results))
	}

	private generatePercentComplete(results: SpruceTestResults): number {
		const percent =
			(results.totalTestFilesComplete ?? 0) / results.totalTestFiles
		if (isNaN(percent)) {
			return 0
		}
		return percent
	}

	public render() {
		this.table?.computeCells()
		this.table?.draw()
	}

	private renderStatusBlock(status: SpruceTestFile['status']) {
		let bgColor = 'y'
		let color = 'k'
		let padding = 10
		switch (status) {
			case 'passed':
				bgColor = 'g'
				padding = 11
				color = 'w'
				break
			case 'failed':
				padding = 11
				bgColor = 'r'
				color = 'w'
				break
		}

		return `^b^#^${bgColor}^${color}^+${this.centerStringWithSpaces(
			status,
			padding
		)}^`
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

	public async destroy() {
		await this.term.grabInput(false, true)

		this.term.hideCursor(false)

		this.term.styleReset()

		this.document.destroy()

		this.term('\n')
	}
}
