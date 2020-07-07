import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const onboardingDefinition: SpruceSchemas.Local.Onboarding.IDefinition = {
	id: 'onboarding',
	name: 'Onboarding',
	description: 'Track onboarding progress and tutorials & quizzes completed.',
	fields: {
		/** Remote. */
		isEnabled: {
			label: 'Remote',
			type: FieldType.Boolean,
			isRequired: true,
			options: undefined
		},
		/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
		runCount: {
			label: 'Run count',
			type: FieldType.Number,
			isRequired: true,
			hint:
				'How many times spruce onboarding has been called (the story changes based on count)',
			options: undefined
		}
	}
}

export default onboardingDefinition
