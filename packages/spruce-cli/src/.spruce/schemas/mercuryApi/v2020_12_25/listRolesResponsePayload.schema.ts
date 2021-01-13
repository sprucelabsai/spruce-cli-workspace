import { SchemaRegistry } from '@sprucelabs/schema'
import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'
import { SpruceSchemas } from '../../schemas.types'

const listRolesResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListRolesResponsePayloadSchema = {
	id: 'listRolesResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		roles: {
			type: 'schema',
			isRequired: true,
			isArray: true,
			options: { schema: roleSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(listRolesResponsePayloadSchema)

export default listRolesResponsePayloadSchema
