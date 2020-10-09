import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const personOrganization: ISchema = {
	id: 'personOrganization',
	name: 'Person <-> organization relationship',
	version: CORE_SCHEMA_VERSION.constValue,
	fields: {
		id: {
			label: 'Id',
			type: 'id',
			isRequired: true,
		},
		roleIds: {
			label: 'Name',
			type: 'id',
			isRequired: true,
			isArray: true,
		},
		organizationId: {
			label: 'Organization',
			type: 'id',
			isRequired: true,
		},
		personId: {
			label: 'Person',
			type: 'id',
			isRequired: true,
		},
	},
}

export default personOrganization
