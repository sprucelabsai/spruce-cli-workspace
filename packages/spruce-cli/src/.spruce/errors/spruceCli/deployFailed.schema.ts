import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const deployFailedSchema: SpruceErrors.SpruceCli.DeployFailedSchema  = {
	id: 'deployFailed',
	namespace: 'SpruceCli',
	name: 'Deploy Failed',
	    fields: {
	            /** First Field. */
	            'fieldName1': {
	                label: 'First Field',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Second Field. A hint */
	            'fieldName2': {
	                label: 'Second Field',
	                type: 'number',
	                isRequired: true,
	                hint: 'A hint',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(deployFailedSchema)

export default deployFailedSchema
