import { SchemaRegistry } from '@sprucelabs/schema'
import createLocationEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createLocationEmitPayload.schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import { SpruceSchemas } from '../../schemas.types'

const createLocationEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationEmitTargetAndPayloadSchema = {
	id: 'createLocationEmitTargetAndPayload',
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
			options: { schema: createLocationEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	createLocationEmitTargetAndPayloadSchema
)

export default createLocationEmitTargetAndPayloadSchema
