import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import getViewControllersEmitTargetSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/getViewControllersEmitTarget.schema'

const getSkillViewsEmitTargetAndPayloadSchema: SpruceSchemas.Heartwood.v2021_02_11.GetSkillViewsEmitTargetAndPayloadSchema  = {
	id: 'getSkillViewsEmitTargetAndPayload',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	    fields: {
	            /** . */
	            'target': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: getViewControllersEmitTargetSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(getSkillViewsEmitTargetAndPayloadSchema)

export default getSkillViewsEmitTargetAndPayloadSchema
