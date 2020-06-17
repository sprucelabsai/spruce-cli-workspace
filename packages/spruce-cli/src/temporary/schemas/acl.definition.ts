import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldType'


const aclDefinition: ISchemaDefinition = {
	id: 'acl',
	name: 'Access control list lookup table',
	dynamicKeySignature: {
		type: FieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		key: 'slug'
	}
}

export default aclDefinition
