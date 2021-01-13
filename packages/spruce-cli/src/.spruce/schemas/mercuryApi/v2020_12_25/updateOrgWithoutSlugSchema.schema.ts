import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const updateOrgWithoutSlugSchemaSchema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgWithoutSlugSchemaSchema = {
	id: 'updateOrgWithoutSlugSchema',
	version: 'v2020_12_25',
	namespace: 'MercuryApi',
	name: '',
	fields: {
		/** Name. */
		name: {
			label: 'Name',
			type: 'text',
			options: undefined,
		},
		/** . */
		dateCreated: {
			type: 'number',
			options: undefined,
		},
		/** . */
		dateDeleted: {
			type: 'number',
			options: undefined,
		},
	},
}

SchemaRegistry.getInstance().trackSchema(updateOrgWithoutSlugSchemaSchema)

export default updateOrgWithoutSlugSchemaSchema
