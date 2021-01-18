import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitPayloadSchema  = {
	id: 'getSkillEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillEmitPayloadSchema)

export default getSkillEmitPayloadSchema
