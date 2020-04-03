import { FieldType } from '@sprucelabs/schema'

import { buildErrorDefinition } from '@sprucelabs/error'

const buildFailedDefinition = buildErrorDefinition({
	id: 'buildFailed',
	name: 'BuildFailed',
	description:
		"It looks like you're not running `y watch`. Run it and then run `spruce all:sync`.",
	fields: {
		file: {
			type: FieldType.Text,
			label: 'File',
			hint: 'File we wanted to build, if not set we wanted to build everything.'
		}
	}
})

export default buildFailedDefinition
