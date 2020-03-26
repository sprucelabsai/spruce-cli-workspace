import RemoteStore from './Remote'
import SkillStore from './Skill'
import UserStore from './User'

export interface IStores {
	remote: RemoteStore
	skill: SkillStore
	user: UserStore
}

export const stores: IStores = {
	remote: new RemoteStore(),
	skill: new SkillStore(),
	user: new UserStore()
}

export * from './Base'
export * from './Remote'
export * from './Skill'
export * from './User'
