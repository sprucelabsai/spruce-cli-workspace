import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const syncErrorActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ISyncErrorActionSchema  = {
	id: 'syncErrorAction',
	name: 'Sync error action',
	description: 'Keep your errors types in sync with your builders',
	    fields: {
	            /** Id. Where I'll look for new schema fields to be registered. */
	            'addonsLookupDir': {
	                label: 'Id',
	                type: FieldType.Text,
	                hint: 'Where I\'ll look for new schema fields to be registered.',
	                defaultValue: "src/addons",
	                options: undefined
	            },
	            /** Error class destination. Where I'll save your new Error class file? */
	            'errorClassDestinationDir': {
	                label: 'Error class destination',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'Where I\'ll save your new Error class file?',
	                defaultValue: "src/errors",
	                options: undefined
	            },
	            /** . Where I should look for your error builders? */
	            'errorLookupDir': {
	                type: FieldType.Text,
	                hint: 'Where I should look for your error builders?',
	                defaultValue: "src/errors",
	                options: undefined
	            },
	            /** Types destination dir. This is where error options and type information will be written */
	            'errorTypesDestinationDir': {
	                label: 'Types destination dir',
	                type: FieldType.Text,
	                hint: 'This is where error options and type information will be written',
	                defaultValue: "#spruce/errors",
	                options: undefined
	            },
	    }
}

export default syncErrorActionSchema
