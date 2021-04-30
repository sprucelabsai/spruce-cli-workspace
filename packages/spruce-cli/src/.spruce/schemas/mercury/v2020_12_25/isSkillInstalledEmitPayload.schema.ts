import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const isSkillInstalledEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.IsSkillInstalledEmitPayloadSchema  = {
	id: 'isSkillInstalledEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
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
