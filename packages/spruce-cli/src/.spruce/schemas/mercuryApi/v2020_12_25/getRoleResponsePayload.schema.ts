import { SchemaRegistry } from '@sprucelabs/schema'
import roleSchema from '#spruce/schemas/spruce/v2020_07_22/role.schema'
import { SpruceSchemas } from '../../schemas.types'

const getRoleResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetRoleResponsePayloadSchema = {
	id: 'getRoleResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		role: {
			type: 'schema',
			isRequired: true,
			options: { schema: roleSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(getRoleResponsePayloadSchema)

export default getRoleResponsePayloadSchema
