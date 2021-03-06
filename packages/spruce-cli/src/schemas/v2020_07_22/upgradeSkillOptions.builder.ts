import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'upgradeSkillOptions',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	fields: {
		upgradeMode: {
			type: 'select',
			label: 'Upgrade mode',
			defaultValue: 'askForChanged',
			options: {
				choices: [
					{
						value: 'askForChanged',
						label: 'Ask for changed files',
					},
					{
						value: 'forceEverything',
						label: 'Force everything',
					},
					{
						value: 'forceRequiredSkipRest',
						label: 'Force required (skipping all non-essential)',
					},
				],
			},
		},
	},
})
