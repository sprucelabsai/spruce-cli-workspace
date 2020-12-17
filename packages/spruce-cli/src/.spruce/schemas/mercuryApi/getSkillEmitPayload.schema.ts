import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const getSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.GetSkillEmitPayloadSchema  = {
	id: 'getSkillEmitPayload',
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
