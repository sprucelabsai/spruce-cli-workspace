import { ISchemaDefinition } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const aclDefinition: ISchemaDefinition = {
	id: 'acl',
	name: 'Access control list lookup table',
	version: CORE_SCHEMA_VERSION.constVal,
	dynamicKeySignature: {
		type: FieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		key: 'slug'
	}
}

export default aclDefinition
