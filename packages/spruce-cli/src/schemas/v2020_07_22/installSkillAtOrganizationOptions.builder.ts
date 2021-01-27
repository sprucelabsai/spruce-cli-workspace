import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'installSkillAtOrganizationOptions',
	name: 'install skill at organization action',
	description: '',
	fields: {
		organizationId: {
			type: 'id',
			label: 'Organization id',
		},
	},
})
