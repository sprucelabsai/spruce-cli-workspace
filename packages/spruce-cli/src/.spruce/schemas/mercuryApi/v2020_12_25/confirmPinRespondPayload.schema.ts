import { SchemaRegistry } from '@sprucelabs/schema'
import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'
import { SpruceSchemas } from '../../schemas.types'

const confirmPinRespondPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinRespondPayloadSchema = {
	id: 'confirmPinRespondPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		person: {
			type: 'schema',
			isRequired: true,
			options: { schema: personSchema },
		},
		/** . */
		token: {
			type: 'text',
			isRequired: true,
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(confirmPinRespondPayloadSchema)

export default confirmPinRespondPayloadSchema
