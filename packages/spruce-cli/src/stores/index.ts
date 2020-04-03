import RemoteStore from './Remote'
import SkillStore from './Skill'
import UserStore from './User'
import SchemaStore from './Schema'
import OnboardingStore from './Onboarding'

export interface IStores {
	remote: RemoteStore
	skill: SkillStore
	user: UserStore
	schema: SchemaStore
	onboarding: OnboardingStore
}
