import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const aclDefinition: SpruceSchemas.Spruce.Acl.IDefinition = {
	id: 'acl',
	name: 'Access control list lookup table',
	dynamicKeySignature: {
		label: 'Permissions grouped by slug',
		type: FieldType.Text,
		key: 'slug',
		isArray: true,
		options: undefined
	}
}

export default aclDefinition
