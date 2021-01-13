import { SchemaRegistry } from '@sprucelabs/schema'
import updateOrgSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateOrg.schema'
import { SpruceSchemas } from '../../schemas.types'

const updateOrgResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgResponsePayloadSchema = {
	id: 'updateOrgResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		organization: {
			type: 'schema',
			isRequired: true,
			options: { schema: updateOrgSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(updateOrgResponsePayloadSchema)

export default updateOrgResponsePayloadSchema
