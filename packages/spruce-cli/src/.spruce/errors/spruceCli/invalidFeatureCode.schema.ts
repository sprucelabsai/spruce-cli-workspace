import { SpruceErrors } from '../errors.types'




const invalidFeatureCodeSchema: SpruceErrors.SpruceCli.IInvalidFeatureCodeSchema  = {
	id: 'invalidFeatureCode',
	name: 'Invalid feature code',
	    fields: {
	            /** . */
	            'featureCode': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default invalidFeatureCodeSchema
