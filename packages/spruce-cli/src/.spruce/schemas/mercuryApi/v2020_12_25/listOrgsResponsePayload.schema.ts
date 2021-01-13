import { SchemaRegistry } from '@sprucelabs/schema'
import organizationSchema from '#spruce/schemas/spruce/v2020_07_22/organization.schema'
import { SpruceSchemas } from '../../schemas.types'

const listOrgsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsResponsePayloadSchema = {
	id: 'listOrgsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		organizations: {
			type: 'schema',
			isRequired: true,
			isArray: true,
			options: { schema: organizationSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(listOrgsResponsePayloadSchema)

export default listOrgsResponsePayloadSchema
