import * as SpruceSchema from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

const onboardingDefinition: SpruceSchemas.Local.OnboardingStore.IDefinition = {
	id: 'onboarding',
	name: 'Onboarding',
	description: '',

	fields: {
		/** Remote. */
		isEnabled: {
			label: 'Remote',
			type: SpruceSchema.FieldType.Boolean,

			isRequired: true,

			options: undefined
		},
		/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
		runCount: {
			label: 'Run count',
			type: SpruceSchema.FieldType.Number,

			isRequired: true,
			hint:
				'How many times spruce onboarding has been called (the story changes based on count)',

			options: undefined
		}
	}
}

export default onboardingDefinition
