import { SchemaRegistry } from '@sprucelabs/schema'
import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'
import { SpruceSchemas } from '../../schemas.types'

const deleteOrgResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteOrgResponsePayloadSchema = {
	id: 'deleteOrgResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		organization: {
			type: 'schema',
			isRequired: true,
			options: { schema: organizationSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(deleteOrgResponsePayloadSchema)

export default deleteOrgResponsePayloadSchema
