import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const deleteRoleEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleEmitPayloadSchema = {
	id: 'deleteRoleEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		id: {
			type: 'id',
			isRequired: true,
			options: undefined,
		},
		/** . */
		organizationId: {
			type: 'id',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(deleteRoleEmitPayloadSchema)

export default deleteRoleEmitPayloadSchema
