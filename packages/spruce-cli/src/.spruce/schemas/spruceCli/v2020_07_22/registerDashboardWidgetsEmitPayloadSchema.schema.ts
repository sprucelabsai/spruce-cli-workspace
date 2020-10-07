import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const registerDashboardWidgetsEmitPayloadSchemaSchema: SpruceSchemas.SpruceCli.v2020_07_22.IRegisterDashboardWidgetsEmitPayloadSchemaSchema  = {
	id: 'registerDashboardWidgetsEmitPayloadSchema',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'register dashboard widgets emit payload schema',
	    fields: {
	            /** . */
	            'widgets': {
	                type: 'raw',
	                options: {valueType: `require("#spruce/../widgets/widgets.types").BaseWidget`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerDashboardWidgetsEmitPayloadSchemaSchema)

export default registerDashboardWidgetsEmitPayloadSchemaSchema
