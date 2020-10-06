import { buildSchema } from '@sprucelabs/schema'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'

export default buildSchema({
	id: 'skillWithExtraField',
	fields: {
		...skillSchema.fields,
		creators: {
			...skillSchema.fields.creators,
			isPrivate: false,
		},
		extraField: {
			type: 'text',
		},
	},
})
