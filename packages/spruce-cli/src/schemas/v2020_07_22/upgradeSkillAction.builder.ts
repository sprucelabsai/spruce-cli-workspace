import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'upgradeSkillAction',
	name: 'Upgrade skill action',
	description: 'Options skill.upgrade.',
	fields: {
		force: {
			type: FieldType.Boolean,
			label: 'Force',
			hint: 'This will force overwrite each file',
		},
	},
})
