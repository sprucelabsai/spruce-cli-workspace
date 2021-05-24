import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import statusFlagsSchema from '#spruce/schemas/mercury/v2020_09_01/statusFlags.schema'

const permissionDefaultsSchema: SpruceSchemas.Mercury.v2020_09_01.PermissionDefaultsSchema  = {
	id: 'permissionDefaults',
	version: 'v2020_09_01',
	namespace: 'Mercury',
	name: '',
	    fields: {
	            /** . */
	            'skill': {
	                type: 'boolean',
	                options: undefined
	            },
	            /** Owner. */
	            'owner': {
	                label: 'Owner',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	            /** Group manager. */
	            'groupManager': {
	                label: 'Group manager',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	            /** Manager. */
	            'manager': {
	                label: 'Manager',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	            /** Teammate. */
	            'teammate': {
	                label: 'Teammate',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	            /** Guest. */
	            'guest': {
	                label: 'Guest',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	            /** Anonymous. */
	            'anonymous': {
	                label: 'Anonymous',
	                type: 'schema',
	                options: {schema: statusFlagsSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(permissionDefaultsSchema)

export default permissionDefaultsSchema
