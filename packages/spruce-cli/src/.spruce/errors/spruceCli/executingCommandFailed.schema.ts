import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const executingCommandFailedSchema: SpruceErrors.SpruceCli.IExecutingCommandFailedSchema  = {
	id: 'executingCommandFailed',
	name: 'Executing command failed',
	description: 'The command that was being executed failed',
	    fields: {
	            /** The command being run. */
	            'cmd': {
	                label: 'The command being run',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Args. */
	            'args': {
	                label: 'Args',
	                type: FieldType.Text,
	                isArray: true,
	                options: undefined
	            },
	            /** Cwd. */
	            'cwd': {
	                label: 'Cwd',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** Stdout. */
	            'stdout': {
	                label: 'Stdout',
	                type: FieldType.Text,
	                options: undefined
	            },
	            /** stderr. */
	            'stderr': {
	                label: 'stderr',
	                type: FieldType.Text,
	                options: undefined
	            },
	    }
}

export default executingCommandFailedSchema
