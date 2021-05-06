import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getSkillEmitPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetSkillEmitPayloadSchema  = {
	id: 'getSkillEmitPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'shouldIncludeApiKey': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillEmitPayloadSchema)

export default getSkillEmitPayloadSchema
