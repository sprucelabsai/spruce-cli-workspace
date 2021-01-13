import { SchemaRegistry } from '@sprucelabs/schema'
import createOrgEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/createOrgEmitPayload.schema'
import { SpruceSchemas } from '../../schemas.types'

const createOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateOrganizationEmitTargetAndPayloadSchema = {
	id: 'createOrganizationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		payload: {
			type: 'schema',
			isRequired: true,
			options: { schema: createOrgEmitPayloadSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	createOrganizationEmitTargetAndPayloadSchema
)

export default createOrganizationEmitTargetAndPayloadSchema
