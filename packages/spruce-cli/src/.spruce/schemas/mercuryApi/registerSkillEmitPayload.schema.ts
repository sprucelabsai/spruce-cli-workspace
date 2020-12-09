import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../schemas.types'



const registerSkillEmitPayloadSchema: SpruceSchemas.MercuryApi.RegisterSkillEmitPayloadSchema  = {
	id: 'registerSkillEmitPayload',
	namespace: 'MercuryApi',
	name: '',
	    fields: {
	            /** Name. */
	            'name': {
	                label: 'Name',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Description. */
	            'description': {
	                label: 'Description',
	                type: 'text',
	                options: undefined
	            },
	            /** Slug. */
	            'slug': {
	                label: 'Slug',
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(registerSkillEmitPayloadSchema)

export default registerSkillEmitPayloadSchema
