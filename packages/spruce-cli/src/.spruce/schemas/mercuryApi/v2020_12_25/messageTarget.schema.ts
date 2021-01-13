import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const messageTargetSchema: SpruceSchemas.MercuryApi.v2020_12_25.MessageTargetSchema = {
	id: 'messageTarget',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** . */
		locationId: {
			type: 'id',
			options: undefined,
		},
		/** . */
		personId: {
			type: 'id',
			options: undefined,
		},
		/** . */
		organizationId: {
			type: 'id',
			options: undefined,
		},
		/** . */
		skillId: {
			type: 'id',
			options: undefined,
		},
		/** . */
		phone: {
			type: 'phone',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(messageTargetSchema)

export default messageTargetSchema
