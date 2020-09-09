import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

const organizationSchema: ISchema = {
	id: 'organization',
	name: 'Organization',
	version: CORE_SCHEMA_VERSION.constValue,
	description: 'A company or team. Comprises of many people and locations.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id,
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true,
		},
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true,
		},
	},
}

export default organizationSchema
