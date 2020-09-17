import { ISchema } from '@sprucelabs/schema'
import { CORE_SCHEMA_VERSION } from '@sprucelabs/spruce-skill-utils'

const aclSchema: ISchema = {
	id: 'acl',
	name: 'Access control list',
	description: '',
	version: CORE_SCHEMA_VERSION.constValue,
	dynamicFieldSignature: {
		type: 'text',
		isArray: true,
		label: 'Permissions grouped by slug',
		keyName: 'slug',
	},
}

export default aclSchema
