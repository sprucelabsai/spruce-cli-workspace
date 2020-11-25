import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const cliUserSchema: SpruceSchemas.SpruceCli.v2020_07_22.CliUserSchema  = {
	id: 'cliUser',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: '',
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

SchemaRegistry.getInstance().trackSchema(cliUserSchema)

export default cliUserSchema
