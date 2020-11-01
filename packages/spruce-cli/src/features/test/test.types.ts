export type TestResultStatus = 'running' | 'passed' | 'failed'
export interface SpruceTestFileTest {
	name: string
	status: 'passed' | 'failed' | 'skipped' | 'pending' | 'todo' | 'disabled'
	errorMessages?: string[]
	duration: number
}

export interface SpruceTestFile {
	path: string
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
