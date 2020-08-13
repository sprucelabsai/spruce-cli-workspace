import { SpruceSchemas } from '../../schemas.types'




const aclSchema: SpruceSchemas.Spruce.v2020_07_22.IAclSchema  = {
	id: 'acl',
	name: 'Access control list lookup table',
	description: 'Permissions and access controls.',
	dynamicKeySignature: { 
	    label: 'Permissions grouped by slug',
	    type: FieldType.Text,
	    key: 'slug',
	    isArray: true,
	    options: undefined
	}}

export default aclSchema
