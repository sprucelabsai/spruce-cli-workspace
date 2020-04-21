import * as SpruceSchema from '@sprucelabs/schema'
import Schema, { ISchemaDefinition } from '@sprucelabs/schema'

/**
import onboardingStoreDefinition from '../../src/schemas/onboarding.definition'
type OnboardingStoreDefinition = typeof onboardingStoreDefinition
*/

export interface IOnboardingStoreDefinition extends ISchemaDefinition {
	id: 'onboarding-store',
	name: 'Onboarding store',
	description: '',
	
	
	    fields: {
	            /** Remote. */
	            'isEnabled': {
	                label: 'Remote',
	                type: SpruceSchema.FieldType.Boolean,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Run count. How many times spruce onboarding has been called (the story changes based on count) */
	            'runCount': {
	                label: 'Run count',
	                type: SpruceSchema.FieldType.Number,
	                
	                isRequired: true,
	                hint: 'How many times spruce onboarding has been called (the story changes based on count)',
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

export const onboardingStoreDefinition : IOnboardingStoreDefinition = {
	id: 'onboarding-store',
	name: 'Onboarding store',
	description: '',
	
	
	    fields: {
	            /** Remote. */
	            'isEnabled': {
	                label: 'Remote',
	                type: SpruceSchema.FieldType.Boolean,
	                
	                isRequired: true,
	                
	                
	                
	                
	                
	                options: undefined
	            },
	            /** Run count. How many times spruce onboarding has been called (the story changes based on count) */
	            'runCount': {
	                label: 'Run count',
	                type: SpruceSchema.FieldType.Number,
	                
	                isRequired: true,
	                hint: 'How many times spruce onboarding has been called (the story changes based on count)',
	                
	                
	                
	                
	                options: undefined
	            },
	    }
}

// Description missing in schema defined in /Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/schemas/onboarding.definition.ts
export interface IOnboardingStore {
	
		/** Remote. */
		'isEnabled': boolean
		/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
		'runCount': number
}
export interface IOnboardingStoreInstance extends Schema<IOnboardingStoreDefinition> {}
