import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import personSchema from '#spruce/schemas/spruce/v2020_07_22/person.schema'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'

const authSchemaSchema: SpruceSchemas.Mercury.v2020_12_25.AuthSchemaSchema  = {
	id: 'authSchema',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'person': {
	                type: 'schema',
	                options: {schema: personSchema,}
	            },
	            /** . */
	            'skill': {
	                type: 'schema',
	                options: {schema: skillSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(authSchemaSchema)

export default authSchemaSchema
