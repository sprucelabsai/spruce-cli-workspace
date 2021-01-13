import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import { SpruceSchemas } from '../../schemas.types'

const deleteOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteOrganizationEmitTargetAndPayloadSchema = {
	id: 'deleteOrganizationEmitTargetAndPayload',
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
	},
}

SchemaRegistry.getInstance().trackSchema(
	deleteOrganizationEmitTargetAndPayloadSchema
)

export default deleteOrganizationEmitTargetAndPayloadSchema
