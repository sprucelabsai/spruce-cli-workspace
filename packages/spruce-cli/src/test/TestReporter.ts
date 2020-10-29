import terminal_kit from 'terminal-kit'
import { SpruceTestFile, SpruceTestResults } from '../features/test/test.types'

const termKit = terminal_kit as any
const term = termKit.terminal as any

export default class TestReporter {
	private started = false
	private document: any
	private table?: any
	private bar: any

	public constructor() {}

	public async start() {
		this.started = true

		this.document = term.createDocument({
			palette: new termKit.Palette(),
			scrollable: true,
			vScrollBar: true,
		})

		term.on('resize', (width, height) => {
			term('RESIZE')
			this.document.resizeInput({ width, height })
		})

		this.bar = new termKit.Bar({
			parent: this.document,
			x: 0,
			y: 1,
			width: term.width - 1,
			barChars: 'solid',
			content: ' Testing...',
			value: 0,
		})

		term.on('key', (key: string) => {
			switch (key) {
				case 'CTRL_C':
					this.destroy()
					process.exit()
					break
			}
		})
	}

	public updateResults(results: SpruceTestResults) {
		if (!this.started) {
			throw new Error('You must call start() before anything else.')
		}

		this.updateProgressBar(results)

		term.windowTitle(
			`Testing: ${Math.round(this.generatePercentComplete(results) * 100)}%`
		)

		if (!this.table && results.totalTestFiles > 0) {
			this.createTable(results)
		}

		results.testFiles?.forEach((file, row) => {
			this.updateCellColors(row, file.status)

			this.table?.setCellContent(0, row, ` ${file.status}`, true, true)
			this.table?.setCellContent(2, row, file.testFile, true, true)
			this.table?.setCellContent(3, row, '0', true, true)
		})
	}

	private createTable(results: SpruceTestResults) {
		const y = 3
		const cellContents: any = []
		for (let row = 0; row < results.totalTestFiles; row++) {
			cellContents.push([' ', '', ' ', ' '])
		}

		this.table = new termKit.TextTable({
			parent: this.document,
			cellContents,
			x: 0,
			y,
			fit: true,
			hasBorder: false,
			width: term.width - 1,
			height: term.height - y,
			outputHeight: cellContents.length,
		})
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

	private updateCellColors(row: number, status: SpruceTestFile['status']) {
		const textBox = this.table?.textBoxes[row][0]

		if (textBox && !textBox._contentSizeOverridden) {
			textBox._contentSizeOverridden = true
			textBox.getContentSize = () => {
				return { width: 5, height: 1 }
			}
		}

		textBox?.textBuffer.setDefaultAttr({
			color: 'blue',
			bgColor:
				status === 'passed' ? 'green' : status === 'failed' ? 'red' : 'yellow',
		})

		textBox?.textBuffer.setVoidAttr({
			bgColor:
				status === 'passed' ? 'green' : status === 'failed' ? 'red' : 'yellow',
		})
	}

	public render() {
		this.table?.computeCells()
		this.table?.draw()
	}

	public destroy() {
		term.grabInput(false)
		term.hideCursor(false)
		term.styleReset()
		term('\n')
	}
}
