import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const aclDefinition: SpruceSchemas.Spruce.Acl.v2020_07_22.IDefinition  = {
	id: 'acl',
	name: 'Access control list lookup table',
	dynamicKeySignature: { 
	    label: 'Permissions grouped by slug',
	    type: FieldType.Text,
	    key: 'slug',
	    isArray: true,
	    options: undefined
	}}

export default aclDefinition
