import { ISchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { CORE_SCHEMA_VERSION } from '../../constants'

const aclSchema: ISchema = {
	id: 'acl',
	name: 'Access control list',
	description: '',
	version: CORE_SCHEMA_VERSION.constValue,
	dynamicFieldSignature: {
		type: FieldType.Text,
		isArray: true,
		label: 'Permissions grouped by slug',
		keyName: 'slug',
	},
}

export default aclSchema
