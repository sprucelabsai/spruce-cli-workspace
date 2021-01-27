import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'bootSkillOptions',
	name: 'Boot skill action',
	description: 'The options for skill.boot.',
	fields: {
		local: {
			type: 'boolean',
			label: 'Run local',
			hint: 'Will run using ts-node and typescript directly. Longer boot times',
		},
	},
})
