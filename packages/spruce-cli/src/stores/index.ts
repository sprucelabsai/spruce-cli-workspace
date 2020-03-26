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

export const stores: IStores = {
	remote: new RemoteStore(),
	skill: new SkillStore(),
	user: new UserStore(),
	schema: new SchemaStore()
}

export * from './Base'
export * from './Remote'
export * from './Skill'
export * from './User'
