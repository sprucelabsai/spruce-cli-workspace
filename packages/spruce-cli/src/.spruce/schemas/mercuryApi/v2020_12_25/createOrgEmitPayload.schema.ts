import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const createOrgEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.CreateOrgEmitPayloadSchema = {
	id: 'createOrgEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** Name. */
		name: {
			label: 'Name',
			type: 'text',
			isRequired: true,
			options: undefined,
		},
		/** . */
		slug: {
			type: 'text',
			options: undefined,
		},
		/** . */
		dateDeleted: {
			type: 'number',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(createOrgEmitPayloadSchema)

export default createOrgEmitPayloadSchema
