import { buildErrorDefinition } from '@sprucelabs/schema'

const notImplementedDefinition = buildErrorDefinition({
	id: 'notImplemented',
	name: 'Not implemented',
	description: 'This command has not yet been implemented ',
	fields: {}
})

export default notImplementedDefinition
