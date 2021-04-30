import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'

const confirmPinRespondPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.ConfirmPinRespondPayloadSchema  = {
	id: 'confirmPinRespondPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'person': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: personSchema,}
	            },
	            /** . */
	            'token': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(confirmPinRespondPayloadSchema)

export default confirmPinRespondPayloadSchema
