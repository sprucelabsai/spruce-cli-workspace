import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import onboardingDefinition from ''

export type OnboardingDefinition = typeof onboardingDefinition
export interface IOnboarding extends SchemaDefinitionValues<OnboardingDefinition> {}
export interface IOnboardingInstance extends Schema<OnboardingDefinition> {}
