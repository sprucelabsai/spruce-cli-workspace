import { SchemaRegistry } from '@sprucelabs/schema'
import eventTargetSchema from '#spruce/schemas/mercuryApi/v2020_12_25/eventTarget.schema'
import updateOrgWithoutSlugSchemaSchema from '#spruce/schemas/mercuryApi/v2020_12_25/updateOrgWithoutSlugSchema.schema'
import { SpruceSchemas } from '../../schemas.types'

const updateOrganizationEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrganizationEmitTargetAndPayloadSchema = {
	id: 'updateOrganizationEmitTargetAndPayload',
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
			options: { schema: updateOrgWithoutSlugSchemaSchema },
		},
	},
}

SchemaRegistry.getInstance().trackSchema(
	updateOrganizationEmitTargetAndPayloadSchema
)

export default updateOrganizationEmitTargetAndPayloadSchema
