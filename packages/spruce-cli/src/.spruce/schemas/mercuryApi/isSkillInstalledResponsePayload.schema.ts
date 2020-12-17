import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const isSkillInstalledResponsePayloadSchema: SpruceSchemas.MercuryApi.IsSkillInstalledResponsePayloadSchema  = {
	id: 'isSkillInstalledResponsePayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'isInstalled': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(isSkillInstalledResponsePayloadSchema)

export default isSkillInstalledResponsePayloadSchema
