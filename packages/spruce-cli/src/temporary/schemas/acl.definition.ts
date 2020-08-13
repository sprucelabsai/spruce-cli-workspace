import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const aclSchema: ISchema = {
	id: 'acl',
	name: 'Access control list lookup table',
	description: 'Permissions and access controls.',
	version: CORE_SCHEMA_VERSION.dirValue,
	dynamicKeySignature: {
		type: FieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		key: 'slug',
	},
}

export default aclSchema
