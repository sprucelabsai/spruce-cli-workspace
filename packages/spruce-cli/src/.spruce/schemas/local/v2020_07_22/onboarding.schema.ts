import { SpruceSchemas } from '../../schemas.types'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'



const onboardingSchema: SpruceSchemas.Local.v2020_07_22.IOnboardingSchema  = {
	id: 'onboarding',
	name: 'Onboarding',
	description: 'Track onboarding progress and tutorials & quizzes completed.',
	    fields: {
	            /** Remote. */
	            'isEnabled': {
	                label: 'Remote',
	                type: FieldType.Boolean,
	                isRequired: true,
	                options: undefined
	            },
	            /** Run count. How many times spruce onboarding has been called (the story changes based on count) */
	            'runCount': {
	                label: 'Run count',
	                type: FieldType.Number,
	                isRequired: true,
	                hint: 'How many times spruce onboarding has been called (the story changes based on count)',
	                options: undefined
	            },
	    }
}

export default onboardingSchema
