import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const onboardActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema  = {
	id: 'onboardAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Onboard action',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(onboardActionSchema)

export default onboardActionSchema
