import { buildErrorDefinition } from '@sprucelabs/schema'

const notImplementedDefinition = buildErrorDefinition({
	id: 'notImplemented',
	name: 'Not implemented',
	description: 'This feature has not been implemented',
	fields: {}
})

export default notImplementedDefinition
