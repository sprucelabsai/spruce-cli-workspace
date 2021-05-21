import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getLocationTargetPayloadSchema from '#spruce/schemas/mercury/v2020_12_25/getLocationTargetPayload.schema'

const getLocationEmitTargetAndPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetLocationEmitTargetAndPayloadSchema  = {
	id: 'getLocationEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getLocationTargetPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getLocationEmitTargetAndPayloadSchema)

export default getLocationEmitTargetAndPayloadSchema
