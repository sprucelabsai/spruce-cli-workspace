import StoreRemote from './Remote'
import StoreSkill from './Skill'
import StoreUser from './User'
import StoreSchema from './Schema'

export interface IStores {
	remote: StoreRemote
	skill: StoreSkill
	user: StoreUser
	schema: StoreSchema
}

export * from './Base'
export * from './Remote'
export * from './Skill'
export * from './User'
