import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const featureNotInstalledSchema: SpruceErrors.SpruceCli.IFeatureNotInstalledSchema  = {
	id: 'featureNotInstalled',
	namespace: 'SpruceCli',
	name: 'Feature not installed',
	    fields: {
	            /** . */
	            'featureCode': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(featureNotInstalledSchema)

export default featureNotInstalledSchema
