import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listSkillsEmitPayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listSkillsEmitPayload.schema'

const listSkillsEmitTargetAndPayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListSkillsEmitTargetAndPayloadSchema  = {
	id: 'listSkillsEmitTargetAndPayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: listSkillsEmitPayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSkillsEmitTargetAndPayloadSchema)

export default listSkillsEmitTargetAndPayloadSchema
