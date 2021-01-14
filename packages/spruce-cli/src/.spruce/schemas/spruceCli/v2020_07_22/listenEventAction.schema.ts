import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listenEventActionSchema: SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema  = {
	id: 'listenEventAction',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Listen to event action',
	description: 'Options for event.listen.',
	    fields: {
	            /** Contract destination. Where I will generate event contracts. */
	            'contractDestinationDir': {
	                label: 'Contract destination',
	                type: 'text',
	                hint: 'Where I will generate event contracts.',
	                defaultValue: "#spruce/events",
	                options: undefined
	            },
	            /** Schema types lookup directory. Where I will lookup schema types and interfaces. */
	            'schemaTypesLookupDir': {
	                label: 'Schema types lookup directory',
	                type: 'text',
	                hint: 'Where I will lookup schema types and interfaces.',
	                defaultValue: "#spruce/schemas",
	                options: undefined
	            },
	            /** Namespace. */
	            'eventNamespace': {
	                label: 'Namespace',
	                type: 'text',
	                options: undefined
	            },
	            /** Event name. */
	            'eventName': {
	                label: 'Event name',
	                type: 'text',
	                options: undefined
	            },
	            /** Events destination directory. Where should I add your listeners? */
	            'listenerDestinationDir': {
	                label: 'Events destination directory',
	                type: 'text',
	                hint: 'Where should I add your listeners?',
	                defaultValue: "src/listeners",
	                options: undefined
	            },
	            /** Version. Set a version yourself instead of letting me generate one for you */
	            'version': {
	                label: 'Version',
	                type: 'text',
	                isPrivate: true,
	                hint: 'Set a version yourself instead of letting me generate one for you',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listenEventActionSchema)

export default listenEventActionSchema
