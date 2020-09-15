import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const commandAbortedSchema: SpruceErrors.SpruceCli.ICommandAbortedSchema  = {
	id: 'commandAborted',
	name: 'Command aborted',
	    fields: {
	            /** Command. */
	            'command': {
	                label: 'Command',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	    }
}

export default commandAbortedSchema
