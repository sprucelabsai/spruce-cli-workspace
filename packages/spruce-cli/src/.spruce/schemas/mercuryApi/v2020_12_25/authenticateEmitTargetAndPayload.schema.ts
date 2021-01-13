import { SchemaRegistry } from '@sprucelabs/schema'
import authenticateEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/authenticateEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const authenticateEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitTargetAndPayloadSchema = {
	id: 'authenticateEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: authenticateEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(authenticateEmitTargetAndPayloadSchema)

export default authenticateEmitTargetAndPayloadSchema
