import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const cliUserWithTokenSchema: SpruceSchemas.Local.v2020_07_22.ICliUserWithTokenSchema  = {
	id: 'cliUserWithToken',
	name: 'Person',
	description: 'A stripped down cli user with token details for login',
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
	            /** . */
	            'token': {
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Logged in. */
	            'isLoggedIn': {
	                label: 'Logged in',
	                type: FieldType.Boolean,
	                options: undefined
	            },
	    }
}

export default cliUserWithTokenSchema
