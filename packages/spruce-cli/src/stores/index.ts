import RemoteStore from './RemoteStore'
import SkillStore from './SkillStore'
import UserStore from './UserStore'
import SchemaStore from './SchemaStore'
import OnboardingStore from './OnboardingStore'

export interface IStores {
	remote: RemoteStore
	skill: SkillStore
	user: UserStore
	schema: SchemaStore
	onboarding: OnboardingStore
}
