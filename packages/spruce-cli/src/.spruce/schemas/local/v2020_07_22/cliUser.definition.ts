import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const cliUserDefinition: SpruceSchemas.Local.CliUser.v2020_07_22.IDefinition  = {
	id: 'cliUser',
	name: 'Person',
	description: 'A stripped down user for the cli',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: FieldType.Id,
	                isRequired: true,
	                options: undefined
	            },
	            /** Casual name. The name you can use when talking to this person. */
	            'casualName': {
	                label: 'Casual name',
	                type: FieldType.Text,
	                isRequired: true,
	                hint: 'The name you can use when talking to this person.',
	                options: undefined
	            },
	    }
}

export default cliUserDefinition
