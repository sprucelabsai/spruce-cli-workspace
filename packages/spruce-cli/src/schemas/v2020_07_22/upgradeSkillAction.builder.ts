import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'upgradeSkillAction',
	name: 'Upgrade skill action',
	description: "Upgrade your skill and all it's dependencies!",
	fields: {
		force: {
			type: FieldType.Boolean,
			label: 'Force',
			hint: 'This will force overwrite each file',
		},
	},
})
