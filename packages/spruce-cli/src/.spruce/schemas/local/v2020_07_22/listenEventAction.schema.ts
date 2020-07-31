import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const listenEventActionSchema: SpruceSchemas.Local.v2020_07_22.IListenEventActionSchema  = {
	id: 'listenEventAction',
	name: 'Listen to event action',
	description: 'Listen and respond to things happening in the physical and digital world.',
	    fields: {
	            /** Event name. */
	            'eventName': {
	                label: 'Event name',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Namespace. */
	            'eventNamespace': {
	                label: 'Namespace',
	                type: FieldType.Text,
	                isRequired: true,
	                options: undefined
	            },
	            /** Events destination directory. Where should I add your listeners? */
	            'eventsDestinationDir': {
	                label: 'Events destination directory',
	                type: FieldType.Text,
	                hint: 'Where should I add your listeners?',
	                defaultValue: "src/events",
	                options: undefined
	            },
	            /** Version. Set a version yourself instead of letting me generate one for you */
	            'version': {
	                label: 'Version',
	                type: FieldType.Text,
	                isPrivate: true,
	                hint: 'Set a version yourself instead of letting me generate one for you',
	                options: undefined
	            },
	    }
}

export default listenEventActionSchema
