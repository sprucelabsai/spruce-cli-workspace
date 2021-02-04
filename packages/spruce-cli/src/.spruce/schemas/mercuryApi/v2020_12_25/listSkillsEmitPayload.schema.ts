import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listSkillsEmitPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListSkillsEmitPayloadSchema  = {
	id: 'listSkillsEmitPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'showMineOnly': {
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSkillsEmitPayloadSchema)

export default listSkillsEmitPayloadSchema
