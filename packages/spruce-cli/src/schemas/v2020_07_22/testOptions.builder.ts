import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'testOptions',
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
		shouldHoldAtStart: {
			type: 'boolean',
			label: 'Should wait for manual start?',
			defaultValue: false,
		},
		shouldWaitUntilTestsAreFinished: {
			type: 'boolean',
			label: 'Wait until tests are finished',
			isPrivate: true,
			hint:
				'For testing. Returns immediately after executing test so the running process can be managed programatically.',
		},
		watchMode: {
			type: 'select',
			label: 'Watch',
			options: {
				choices: [
					{
						value: 'off',
						label: 'Off',
					},
					{
						value: 'standard',
						label: 'Standard',
					},
					{
						value: 'smart',
						label: 'Smart',
					},
				],
			},
		},
	},
})
