import RemoteStore from './Remote'
import SkillStore from './Skill'
import UserStore from './User'
import SchemaStore from './Schema'

export interface IStores {
	remote: RemoteStore
	skill: SkillStore
	user: UserStore
	schema: SchemaStore
}

export * from './Base'
export * from './Remote'
export * from './Skill'
export * from './User'
