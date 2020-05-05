import jwt from 'jsonwebtoken'
import AbstractStore, { StoreAuth, IBaseStoreSettings } from './AbstractStore'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { IMercuryGQLBody } from '@sprucelabs/mercury'
import { SpruceEvents } from '../types/events-generated'
import gql from 'graphql-tag'
import Schema from '@sprucelabs/schema'
import userWithTokenDefinition from '../schemas/cliUserWithToken.definition'
import userDefinition from '../schemas/cliUser.definition'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'

type UserWithToken = SpruceSchemas.local.ICliUserWithToken
type User = SpruceSchemas.local.ICliUser

/** Settings i need to save */
interface IUserStoreSettings extends IBaseStoreSettings {
	authedUsers: UserWithToken[]
}

export default class UserStore extends AbstractStore<IUserStoreSettings> {
	public name = 'user'

	/** Build a new user with an added token */
	public static userWithToken(values?: Partial<UserWithToken>) {
		return new Schema(userWithTokenDefinition, values)
	}

	/** Build a basic user */
	public static user(values?: Partial<User>) {
		return new Schema(userDefinition, values)
	}

	/** Login and get a user instance back */
	public async userWithTokenFromPhone(phone: string, pin: string) {
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
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				eventName: SpruceEvents.core.Login.name,
				payloadArgs: [
					{ name: 'phone', value: phone },
					{ name: 'pin', value: pin }
				],
				friendlyMessage: "Login event didn't return a jwt?"
			})
		}

		const user = await this.userWithTokenFromToken(token)

		if (!user) {
			throw new SpruceError({
				code: ErrorCode.UserNotFound,
				token
			})
		}

		return user
	}

	/** Load a user from their jwt (WARNING, ALTERS THE AUTH OF MERCURY) */
	public async userWithTokenFromToken(
		token: string
	): Promise<UserWithToken | undefined> {
		const decoded = jwt.decode(token) as Record<string, any> | null
		if (!decoded) {
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'Invalid token!'
			})
		}

		// Setup mercury to use creds
		this.mercury = await this.mercuryForUser(token)

		// Now load from id
		const userId: string = decoded.userId
		const user = await this.userFromId(userId)

		if (!user) {
			return undefined
		}

		const userWithToken = UserStore.userWithToken({ ...user, token })
		// @ts-ignore
		return userWithToken.getValues()
	}

	/** Load a user from id */
	public async userFromId(id: string): Promise<Omit<User, 'id'>> {
		const query =
			gql`
				query User($userId: ID!) {
					User(id: $userId) {
						id
						name
						firstName
						lastName
						casualName
						profileImages
						defaultProfileImages
					}
				}
			`.loc?.source.body || ''

		const result = await this.mercury.emit<
			SpruceEvents.core.Gql.IPayload,
			IMercuryGQLBody<{
				User: SpruceSchemas.core.IUser
			}>
		>({
			eventName: SpruceEvents.core.Gql.name,
			payload: {
				query,
				variables: {
					userId: id
				}
			}
		})

		const values = result.responses[0].payload.data.User
		const user = UserStore.user(values)

		// Will throw
		user.validate()

		return user.getValues()
	}

	/** This person will be logged in going forward */
	public setLoggedInUser(user: Omit<UserWithToken, 'isLoggedIn'>) {
		// Pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		// Remove this user if already authed
		authedUsers.forEach(authed => {
			if (authed.id !== user.id) {
				newAuthedUsers.push({ ...authed, isLoggedIn: false })
			}
		})

		// Lets validate the user and pull out values
		const instance = new Schema(userWithTokenDefinition, user)
		instance.validate()

		newAuthedUsers.push({
			...instance.getValues(),
			isLoggedIn: true
		})

		this.writeValues({
			authType: StoreAuth.User,
			authedUsers: newAuthedUsers
		})
	}

	/** Get the logged in user */
	public loggedInUser(): UserWithToken | undefined {
		const loggedInUsers = this.readValue('authedUsers') || []
		const loggedInUser = loggedInUsers.find(auth => auth.isLoggedIn)

		// Validate the saved user
		if (loggedInUser) {
			try {
				const instance = new Schema(userWithTokenDefinition, loggedInUser)
				instance.validate()
				// @ts-ignore
				return instance.getValues()
			} catch (err) {
				log.crit(`Loading logged in user failed`)
				log.crit(err)
			}
		}

		return undefined
	}

	/** Log everyone out */
	public logout() {
		// Pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		// Remove this user if already authed
		authedUsers.forEach(authed => {
			newAuthedUsers.push({ ...authed, isLoggedIn: false })
		})

		this.writeValue('authedUsers', authedUsers)
	}

	/** Users who have ever been on */
	public users(): UserWithToken[] {
		const users = this.readValue('authedUsers') || []
		return users
	}
}
