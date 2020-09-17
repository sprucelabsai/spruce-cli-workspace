import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'upgradeSkillAction',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	fields: {
		force: {
			type: 'boolean',
			label: 'Force',
			hint: 'This will force overwrite each file',
		},
	},
})
