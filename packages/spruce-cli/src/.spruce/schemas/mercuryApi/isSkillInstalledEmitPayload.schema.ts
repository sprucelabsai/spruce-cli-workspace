import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const isSkillInstalledEmitPayloadSchema: SpruceSchemas.MercuryApi.IsSkillInstalledEmitPayloadSchema  = {
	id: 'isSkillInstalledEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'skillId': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(isSkillInstalledEmitPayloadSchema)

export default isSkillInstalledEmitPayloadSchema
