import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const lintFailedSchema: SpruceErrors.SpruceCli.ILintFailedSchema  = {
	id: 'lintFailed',
	name: 'Lint failed!',
	description: 'When linting a file fails',
	    fields: {
	            /** Pattern. The pattern used to match files relative to the root of the skill */
	            'pattern': {
	                label: 'Pattern',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The pattern used to match files relative to the root of the skill',
	                options: undefined
	            },
	            /** Output from lint. */
	            'stdout': {
	                label: 'Output from lint',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default lintFailedSchema
