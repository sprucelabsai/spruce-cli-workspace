import { SchemaRegistry } from '@sprucelabs/schema'
import listOrgsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listOrgsEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const listOrganizationsEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListOrganizationsEmitTargetAndPayloadSchema = {
	id: 'listOrganizationsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: listOrgsEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	listOrganizationsEmitTargetAndPayloadSchema
)

export default listOrganizationsEmitTargetAndPayloadSchema
