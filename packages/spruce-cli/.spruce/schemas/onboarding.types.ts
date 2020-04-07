import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import onboardingDefinition from '../../src/schemas/onboarding.definition'

type OnboardingDefinition = typeof onboardingDefinition

export interface IOnboardingDefinition extends OnboardingDefinition {}
export interface IOnboarding extends SchemaDefinitionValues<IOnboardingDefinition> {}
export interface IOnboardingInstance extends Schema<IOnboardingDefinition> {}
