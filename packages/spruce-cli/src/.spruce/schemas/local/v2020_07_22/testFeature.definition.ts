import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const testFeatureDefinition: SpruceSchemas.Local.TestFeature.v2020_07_22.IDefinition  = {
	id: 'testFeature',
	name: 'Test Feature',
	    fields: {
	            /** What file would you like to test?. */
	            'target': {
	                label: 'What file would you like to test?',
	                type: FieldType.File,
	                isRequired: true,
	                defaultValue: {"path":""},
	                options: undefined
	            },
	    }
}

export default testFeatureDefinition
