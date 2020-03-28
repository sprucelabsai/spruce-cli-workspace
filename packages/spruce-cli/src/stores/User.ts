import jwt from 'jsonwebtoken'
import StoreBase from './Base'
import Schema from '@sprucelabs/schema'
import { SpruceSchemas } from '../.spruce/schemas'
import { Mercury } from '@sprucelabs/mercury'
import { SpruceEvents } from '../types/events-generated'
import CliError from '../errors/CliError'
import { CliErrorCode } from '../errors/types'

export default class StoreUser extends StoreBase {
	public name = 'user'

	/** mercury locked and loaded */
	public mercury: Mercury

	public constructor(mercury: Mercury) {
		super()
		this.mercury = mercury
	}

	/** build a new user */
	public static user(values?: Partial<SpruceSchemas.core.User.IUser>) {
		return new Schema(SpruceSchemas.core.User.definition, values)
	}

	/** give me a phone and i'll send you a pin */
	public async requestPin(phone: string) {
		try {
			await this.mercury.emit<
				SpruceEvents.core.RequestLogin.IPayload,
				SpruceEvents.core.RequestLogin.IResponseBody
			>({
				eventName: SpruceEvents.core.RequestLogin.name,
				payload: {
					phoneNumber: phone,
					method: 'pin'
				}
			})
		} catch (err) {
			throw new CliError({
				code: CliErrorCode.GenericMercury,
				eventName: SpruceEvents.core.RequestLogin.name,
				payload: {
					phoneNumber: phone,
					method: 'pin'
				},
				lastError: err
			})
		}
	}

	public async login(
		phone: string,
		pin: string
	): Promise<SpruceSchemas.core.User.IInstance> {
		//
		const loginResult = await this.mercury.emit<
			SpruceEvents.core.Login.IPayload,
			SpruceEvents.core.Login.IResponseBody
		>({
			eventName: SpruceEvents.core.Login.name,
			payload: {
				phoneNumber: phone,
				code: pin
			}
		})

		const token = loginResult.responses[0]?.payload.jwt

		if (!token) {
			throw new CliError({
				code: CliErrorCode.GenericMercury,
				eventName: SpruceEvents.core.Login.name,
				payload: {
					phoneNumber: phone,
					code: pin
				},
				friendlyMessage: "Login event didn't return a jwt?"
			})
		}

		const user = await this.userFromToken(token)

		if (!user) {
			throw new CliError({
				code: CliErrorCode.UserNotFound,
				token
			})
		}

		return user
	}

	public async userFromToken(
		token: string
	): Promise<SpruceSchemas.core.User.IUserDefinition | undefined> {
		const decoded = jwt.decode(token) as Record<string, any> | null
		if (!decoded) {
			throw new CliError({
				code: CliErrorCode.Generic,
				friendlyMessage: 'Invalid token!'
			})
		}
	}

	public async userFromId(): Promise<
		SpruceSchemas.core.User.IInstance | undefined
	> {}

	public async load() {}
	public async save() {}
}
// import config, { RemoteType } from '../utilities/Config'
// import User from '../models/User'
// import logger from '@sprucelabs/log'
// // @ts-ignore
// const log = logger.log

// export type StateUsers = {
// 	[environment in RemoteType]: User[]
// }

// export class UserStore {
// 	public currentUser?: User
// 	public users: {
// 		[userId: string]: User
// 	} = {}
// 	private readonly stateKey = 'AuthenticatedUsers'
// 	private readonly stateKeyCurrentUserId = 'currentUserId'

// 	public constructor() {
// 		this.loadSavedUsers()
// 	}

// 	public async addUserByJWT(options: { jwt: string; remote: RemoteType }) {
// 		// Fetch the user and save them
// 		const user = new User(options)
// 		try {
// 			await user.syncUser()
// 			if (this.isValidUser(user) && user.id) {
// 				this.users[user.id] = user
// 				this.save()
// 			}
// 		} catch (e) {
// 			log.warn(e)
// 		}
// 	}

// 	public setCurrentUser(userId: string) {
// 		const user = this.users[userId]
// 		if (user) {
// 			this.currentUser = user
// 			config.save({
// 				[this.stateKeyCurrentUserId]: user.id
// 			})
// 		}
// 	}

// 	/** Loads saved users from saved config */
// 	private loadSavedUsers() {
// 		const users = config.get(this.stateKey) || {}
// 		if (typeof users !== 'object' || users === null) {
// 			// Something's not right
// 			log.crit('Unable to load saved users. Re-initializing.')
// 			this.resetState()
// 		}
// 		Object.keys(users).forEach((userId: string) => {
// 			const user = new User(users[userId])
// 			if (this.isValidUser(user) && user.id) {
// 				this.users[user.id] = user
// 			}
// 		})

// 		this.setCurrentUserFromSaved()
// 	}

// 	/** Sets the current user based on what's been saved or the first user if there isn't one saved */
// 	private setCurrentUserFromSaved() {
// 		const currentUserId = config.get(this.stateKeyCurrentUserId)
// 		if (currentUserId) {
// 			const user = this.users[currentUserId]
// 			if (user) {
// 				this.currentUser = user
// 				return
// 			}
// 		}

// 		// If a current user hasn't already been set and we've loaded some users, set the first one
// 		const userIds = Object.keys(this.users)
// 		if (userIds.length > 0 && userIds[0]) {
// 			this.setCurrentUser(userIds[0])
// 		}
// 	}

// 	private isValidUser(user: User) {
// 		if (user.id && user.jwt && user.remote) {
// 			return true
// 		}

// 		return false
// 	}

// 	/** Converts users to saveable format */
// 	private usersToData() {
// 		const data: Record<string, any> = {}
// 		const userIds = Object.keys(this.users)
// 		userIds.forEach(uid => {
// 			data[uid] = this.users[uid].toData()
// 		})

// 		return data
// 	}

// 	private save() {
// 		config.save({
// 			[this.stateKey]: this.usersToData()
// 		})
// 	}

// 	private resetState() {
// 		config.save({
// 			[this.stateKey]: {}
// 		})
// 	}
// }

// const users = new UserStore()
// export default users
