import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'
import { CORE_SCHEMA_VERSION } from '../../constants'

const organizationDefinition: ISchemaDefinition = {
	id: 'organization',
	name: 'Organization',
	version: CORE_SCHEMA_VERSION.constVal,
	description: 'A company or team. Comprises of many people and locations.',
	fields: {
		id: {
			label: 'Id',
			type: FieldType.Id
		},
		name: {
			label: 'Name',
			type: FieldType.Text,
			isRequired: true
		},
		slug: {
			label: 'Slug',
			type: FieldType.Text,
			isRequired: true
		}
	}
}

export default organizationDefinition
