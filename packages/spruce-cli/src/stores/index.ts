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

export const stores: IStores = {
	remote: new StoreRemote(),
	skill: new StoreSkill(),
	user: new StoreUser(),
	schema: new StoreSchema()
}

export * from './Base'
export * from './Remote'
export * from './Skill'
export * from './User'
