import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerationThemeSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/registerationTheme.schema'

const getSkillViewsResponsePayloadSchema: SpruceSchemas.Heartwood.v2021_02_11.GetSkillViewsResponsePayloadSchema  = {
	id: 'getSkillViewsResponsePayload',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'ids': {
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'source': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'theme': {
	                type: 'schema',
	                options: {schema: registerationThemeSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillViewsResponsePayloadSchema)

export default getSkillViewsResponsePayloadSchema
