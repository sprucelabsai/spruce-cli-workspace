import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const onboardingSchema: SpruceSchemas.SpruceCli.v2020_07_22.OnboardingSchema  = {
	id: 'onboarding',
	version: 'v2020_07_22',
	namespace: 'SpruceCli',
	name: 'Onboarding',
	description: 'Track onboarding progress and tutorials & quizzes completed.',
	    fields: {
	            /** Remote. */
	            'isEnabled': {
	                label: 'Remote',
	                type: 'boolean',
	                isRequired: true,
	                options: undefined
	            },
	            /** Run count. How many times spruce onboarding has been called (the story changes based on count) */
	            'runCount': {
	                label: 'Run count',
	                type: 'number',
	                isRequired: true,
	                hint: 'How many times spruce onboarding has been called (the story changes based on count)',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(onboardingSchema)

export default onboardingSchema
