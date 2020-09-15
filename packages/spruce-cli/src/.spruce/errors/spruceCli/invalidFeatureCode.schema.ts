import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const invalidFeatureCodeSchema: SpruceErrors.SpruceCli.IInvalidFeatureCodeSchema  = {
	id: 'invalidFeatureCode',
	name: 'Invalid feature code',
	    fields: {
	            /** . */
	            'featureCode': {
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default invalidFeatureCodeSchema
