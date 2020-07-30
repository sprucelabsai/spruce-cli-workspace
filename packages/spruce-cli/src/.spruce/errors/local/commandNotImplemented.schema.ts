import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const commandNotImplementedSchema: SpruceErrors.Local.ICommandNotImplementedSchema  = {
	id: 'commandNotImplemented',
	name: 'Command not implemented',
	description: 'This command has not yet been implemented ',
	    fields: {
	            /** Command. the command being run! */
	            'command': {
	                label: 'Command',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'the command being run!',
	                options: undefined
	            },
	            /** Args. Arguments passed to the command */
	            'args': {
	                label: 'Args',
	                type: FieldType.Text,
	                hint: 'Arguments passed to the command',
	                isArray: true,
	                options: undefined
	            },
	    }
}

export default commandNotImplementedSchema
