import Schema, {
	buildSchemaDefinition,
	FieldType,
	SchemaDefinitionValues
} from '@sprucelabs/schema'

const onboardingDefinition = buildSchemaDefinition({
	id: 'onboarding-store',
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

export type Onboarding = SchemaDefinitionValues<typeof onboardingDefinition>
export type OnboardingInstance = Schema<typeof onboardingDefinition>
