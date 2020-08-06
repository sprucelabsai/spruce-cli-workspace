import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'bootSkillAction',
	name: 'Boot skill action',
	description: 'Boot your skill, change the world. 🌎',
	fields: {
		local: {
			type: FieldType.Boolean,
			label: 'Run local',
			hint: 'Will run using ts-node and typescript directly. Longer boot times',
		},
	},
})
