export interface IGoogleSheetsOptions {
	serviceEmail: string
	privateKey: string
}

export interface IGoogleSheetsAdapter {
	updateCell(options: {
		sheetId: string
		worksheetId: number
		cell: string
		value: string | number | boolean
	}): Promise<void>
}

export interface IJestTest {}

export interface IJestTestResult {
	title: string
	status: 'passed' | 'failed'
}

export interface IJestTestResults {
	testResults: IJestTestResult[]
}
