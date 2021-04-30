import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import eventContractSchema from '#spruce/schemas/mercury/v2020_09_01/eventContract.schema'

const getEventContractsResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetEventContractsResponsePayloadSchema  = {
	id: 'getEventContractsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'contracts': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: eventContractSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getEventContractsResponsePayloadSchema)

export default getEventContractsResponsePayloadSchema
