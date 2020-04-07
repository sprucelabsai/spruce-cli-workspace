import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import onboardingStoreDefinition from '../../src/schemas/onboarding.definition'

type OnboardingStoreDefinition = typeof onboardingStoreDefinition
export interface IOnboardingStoreDefinition extends OnboardingStoreDefinition {}

// Description missing in schema defined in /Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/schemas/onboarding.definition.ts
export interface IOnboardingStore extends SchemaDefinitionValues<IOnboardingStoreDefinition> {}
export interface IOnboardingStoreInstance extends Schema<IOnboardingStoreDefinition> {}
