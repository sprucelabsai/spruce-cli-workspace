import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'listenEventAction',
	name: 'Listen to event action',
	description: 'Options for event.listen.',
	fields: {
		eventNamespace: {
			type: 'text',
			label: 'Namespace',
			isRequired: true,
		},
		eventName: {
			type: 'text',
			label: 'Event name',
			isRequired: true,
		},
		eventsDestinationDir: {
			type: 'text',
			label: 'Events destination directory',
			hint: 'Where should I add your listeners?',
			defaultValue: 'src/events',
		},
		version: {
			type: 'text',
			label: 'Version',
			hint: 'Set a version yourself instead of letting me generate one for you',
			isPrivate: true,
		},
	},
})
