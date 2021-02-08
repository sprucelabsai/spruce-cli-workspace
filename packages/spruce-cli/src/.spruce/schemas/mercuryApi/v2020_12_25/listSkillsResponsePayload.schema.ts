import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listSkillsSkillsResponsePayloadSchema from '#spruce/schemas/mercuryApi/v2020_12_25/listSkillsSkillsResponsePayload.schema'

const listSkillsResponsePayloadSchema: SpruceSchemas.MercuryApi.v2020_12_25.ListSkillsResponsePayloadSchema  = {
	id: 'listSkillsResponsePayload',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** . */
	            'skills': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: listSkillsSkillsResponsePayloadSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSkillsResponsePayloadSchema)

export default listSkillsResponsePayloadSchema
