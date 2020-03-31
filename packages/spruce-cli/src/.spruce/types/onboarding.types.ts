import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import onboardingDefinition from '../../schemas/onboarding.definition'

export interface IOnboarding extends SchemaDefinitionValues<typeof onboardingDefinition> {}
export interface IOnboardingInstance extends Schema<typeof onboardingDefinition> {}
