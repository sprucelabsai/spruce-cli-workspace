import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import registerSkillViewsEmitPayloadSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/registerSkillViewsEmitPayload.schema'

const registerSkillViewsEmitTargetAndPayloadSchema: SpruceSchemas.Heartwood.v2021_02_11.RegisterSkillViewsEmitTargetAndPayloadSchema  = {
	id: 'registerSkillViewsEmitTargetAndPayload',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	    fields: {
	            /** . */
	            'payload': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: registerSkillViewsEmitPayloadSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerSkillViewsEmitTargetAndPayloadSchema)

export default registerSkillViewsEmitTargetAndPayloadSchema
