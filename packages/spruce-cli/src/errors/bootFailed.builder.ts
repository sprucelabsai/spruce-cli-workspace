import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'bootFailed',
	name: 'Boot failed',
	description: 'Booting your skill failed!',
	fields: {},
})
