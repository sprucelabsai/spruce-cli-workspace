import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const isSkillInstalledResponsePayloadSchema: SpruceSchemas.Mercury.v2020_12_25.IsSkillInstalledResponsePayloadSchema  = {
	id: 'isSkillInstalledResponsePayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
