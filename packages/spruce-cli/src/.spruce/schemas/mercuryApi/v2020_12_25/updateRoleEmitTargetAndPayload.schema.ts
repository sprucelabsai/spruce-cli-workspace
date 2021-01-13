import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import updateRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateRoleEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const updateRoleEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleEmitTargetAndPayloadSchema = {
	id: 'updateRoleEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		target: {
			type: 'schema',
			isRequired: true,
			options: { schema: eventTargetSchema },
		},
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: updateRoleEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(updateRoleEmitTargetAndPayloadSchema)

export default updateRoleEmitTargetAndPayloadSchema
