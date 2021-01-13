import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import getRoleEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/getRoleEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const getRoleEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetRoleEmitTargetAndPayloadSchema = {
	id: 'getRoleEmitTargetAndPayload',
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
			options: { schema: getRoleEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(getRoleEmitTargetAndPayloadSchema)

export default getRoleEmitTargetAndPayloadSchema
