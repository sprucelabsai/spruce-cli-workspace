import { SpruceErrors } from '../errors.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const buildFailedSchema: SpruceErrors.Local.IBuildFailedSchema  = {
	id: 'buildFailed',
	name: 'BuildFailed',
	description: 'Error thrown when building or linting failed. Happens when a yarn command fails inside the package utility.',
	    fields: {
	            /** File. File we wanted to build, if not set we wanted to build everything.. */
	            'file': {
	                label: 'File',
	                type: FieldType.Text,
	                hint: 'File we wanted to build, if not set we wanted to build everything..',
	                options: undefined
	            },
	    }
}

export default buildFailedSchema
