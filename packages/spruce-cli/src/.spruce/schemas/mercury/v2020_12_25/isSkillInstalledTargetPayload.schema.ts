import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const isSkillInstalledTargetPayloadSchema: SpruceSchemas.Mercury.v2020_12_25.IsSkillInstalledTargetPayloadSchema  = {
	id: 'isSkillInstalledTargetPayload',
	version: 'v2020_12_25',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'organizationId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(isSkillInstalledTargetPayloadSchema)

export default isSkillInstalledTargetPayloadSchema
