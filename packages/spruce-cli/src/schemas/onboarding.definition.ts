import { buildSchemaDefinition, FieldType } from '@sprucelabs/schema'

const onboardingDefinition = buildSchemaDefinition({
	id: 'onboardingStore',
	name: 'Onboarding store',
	fields: {
		isEnabled: {
			type: FieldType.Boolean,
			label: 'Remote',
			isRequired: true
		},
		runCount: {
			type: FieldType.Number,
			label: 'Run count',
			isRequired: true,
			hint:
				'How many times spruce onboarding has been called (the story changes based on count)'
		}
	}
})

export default onboardingDefinition
