import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'listenEventAction',
	name: 'Listen to event action',
	description:
		'Listen and respond to things happening in the physical and digital world.',
	fields: {
		eventNamespace: {
			type: FieldType.Text,
			label: 'Namespace',
			isRequired: true,
		},
		eventName: {
			type: FieldType.Text,
			label: 'Event name',
			isRequired: true,
		},
		eventsDestinationDir: {
			type: FieldType.Text,
			label: 'Events destination directory',
			hint: 'Where should I add your listeners?',
			defaultValue: 'src/events',
		},
		version: {
			type: FieldType.Text,
			label: 'Version',
			hint: 'Set a version yourself instead of letting me generate one for you',
			isPrivate: true,
		},
	},
})
