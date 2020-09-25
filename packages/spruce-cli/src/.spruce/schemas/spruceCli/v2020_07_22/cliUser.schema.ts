import { SpruceSchemas } from '../../schemas.types'





const cliUserSchema: SpruceSchemas.SpruceCli.v2020_07_22.ICliUserSchema  = {
	id: 'cliUser',
	name: 'Person',
	description: 'A stripped down user for the cli',
	    fields: {
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** Casual name. The name you can use when talking to this person. */
	            'casualName': {
	                label: 'Casual name',
	                type: 'text',
	                isRequired: true,
	                hint: 'The name you can use when talking to this person.',
	                options: undefined
	            },
	    }
}

export default cliUserSchema
