import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const organizationSchema: ISchema = {
	id: 'organization',
	name: 'Organization',
	version: CORE_SCHEMA_VERSION.constValue,
	description: 'A company or team. Comprises of many people and locations.',
	fields: {
		id: {
			label: 'Id',
			type: 'id',
		},
		name: {
			label: 'Name',
			type: 'text',
			isRequired: true,
		},
		slug: {
			label: 'Slug',
			type: 'text',
			isRequired: true,
		},
	},
}

export default organizationSchema
