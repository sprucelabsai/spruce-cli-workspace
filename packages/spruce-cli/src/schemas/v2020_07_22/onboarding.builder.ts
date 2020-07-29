import { buildSchema } from '@sprucelabs/schema'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export default buildSchema({
	id: 'onboarding',
	name: 'Onboarding',
	description: 'Track onboarding progress and tutorials & quizzes completed.',
	fields: {
		isEnabled: {
			type: FieldType.Boolean,
			label: 'Remote',
			isRequired: true,
		},
		runCount: {
			type: FieldType.Number,
			label: 'Run count',
			isRequired: true,
			hint:
				'How many times spruce onboarding has been called (the story changes based on count)',
		},
	},
})
