import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const getSkillTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.GetSkillTargetPayloadSchema  = {
	id: 'getSkillTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'skillId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillTargetPayloadSchema)

export default getSkillTargetPayloadSchema
