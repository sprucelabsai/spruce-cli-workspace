import config, { RemoteType } from '../utilities/Config'
import User from '../models/User'
import logger from '@sprucelabs/log'
// @ts-ignore
const log = logger.log

export type StateUsers = {
	[environment in RemoteType]: User[]
}

export class Users {
	public currentUser?: User
	public users: {
		[userId: string]: User
	} = {}
	private readonly stateKey = 'AuthenticatedUsers'
	private readonly stateKeyCurrentUserId = 'currentUserId'

	public constructor() {
		this.loadSavedUsers()
	}

	public async addUserByJWT(options: { jwt: string; remote: RemoteType }) {
		// Fetch the user and save them
		const user = new User(options)
		try {
			await user.syncUser()
			if (this.isValidUser(user) && user.id) {
				this.users[user.id] = user
				this.save()
			}
		} catch (e) {
			log.warn(e)
		}
	}

	public setCurrentUser(userId: string) {
		const user = this.users[userId]
		if (user) {
			this.currentUser = user
			config.save({
				[this.stateKeyCurrentUserId]: user.id
			})
		}
	}

	/** Loads saved users from saved config */
	private loadSavedUsers() {
		const users = config.get(this.stateKey) || {}
		if (typeof users !== 'object' || users === null) {
			// Something's not right
			log.crit('Unable to load saved users. Re-initializing.')
			this.resetState()
		}
		Object.keys(users).forEach((userId: string) => {
			const user = new User(users[userId])
			if (this.isValidUser(user) && user.id) {
				this.users[user.id] = user
			}
		})

		this.setCurrentUserFromSaved()
	}

	/** Sets the current user based on what's been saved or the first user if there isn't one saved */
	private setCurrentUserFromSaved() {
		const currentUserId = config.get(this.stateKeyCurrentUserId)
		if (currentUserId) {
			const user = this.users[currentUserId]
			if (user) {
				this.currentUser = user
				return
			}
		}

		// If a current user hasn't already been set and we've loaded some users, set the first one
		const userIds = Object.keys(this.users)
		if (userIds.length > 0 && userIds[0]) {
			this.setCurrentUser(userIds[0])
		}
	}

	private isValidUser(user: User) {
		if (user.id && user.jwt && user.remote) {
			return true
		}

		return false
	}

	/** Converts users to saveable format */
	private usersToData() {
		const data: Record<string, any> = {}
		const userIds = Object.keys(this.users)
		userIds.forEach(uid => {
			data[uid] = this.users[uid].toData()
		})

		return data
	}

	private save() {
		config.save({
			[this.stateKey]: this.usersToData()
		})
	}

	private resetState() {
		config.save({
			[this.stateKey]: {}
		})
	}
}

const users = new Users()
export default users
