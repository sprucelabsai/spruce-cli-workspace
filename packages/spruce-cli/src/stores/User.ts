import jwt from 'jsonwebtoken'
import BaseStore, { StoreAuth, IBaseStoreSettings } from './Base'
import { SpruceSchemas } from '../.spruce/types/core.types'
import { IMercuryGQLBody } from '@sprucelabs/mercury'
import { SpruceEvents } from '../types/events-generated'
import CliError from '../errors/CliError'
import { CliErrorCode } from '../errors/types'
import gql from 'graphql-tag'
import Schema from '@sprucelabs/schema'
import userWithTokenDefinition from '../schemas/userWithToken.definition'
import userDefinition from '../schemas/user.definition'
import { IUserWithToken } from '../.spruce/types/userWithToken.types'
import { IUser } from '../.spruce/types/user.types'

/** settings i need to save */
interface IUserStoreSettings extends IBaseStoreSettings {
	authedUsers: IUserWithToken[]
}

export default class UserStore extends BaseStore<IUserStoreSettings> {
	public name = 'user'

	/** build a new user with an added token */
	public static userWithToken(values?: Partial<IUserWithToken>) {
		return new Schema(userWithTokenDefinition, values)
	}

	/** build a basic user */
	public static user(values?: Partial<IUser>) {
		return new Schema(userDefinition, values)
	}

	/** login and get a user instance back */
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

		const user = await this.userWithTokenFromToken(token)

		if (!user) {
			throw new CliError({
				code: CliErrorCode.UserNotFound,
				token
			})
		}

		return user
	}

	/** load a user from their jwt (WARNING, ALTERS THE AUTH OF MERCURY) */
	public async userWithTokenFromToken(
		token: string
	): Promise<IUserWithToken | undefined> {
		const decoded = jwt.decode(token) as Record<string, any> | null
		if (!decoded) {
			throw new CliError({
				code: CliErrorCode.Generic,
				friendlyMessage: 'Invalid token!'
			})
		}

		// setup mercury to use creds
		this.mercury = await this.mercuryForUser(token)

		// now load from id
		const userId: string = decoded.userId
		const user = await this.userFromId(userId)

		if (!user) {
			return undefined
		}

		const userWithToken = UserStore.userWithToken({ ...user, token })
		return userWithToken.getValues()
	}

	/** load a user from id */
	public async userFromId(id: string): Promise<Omit<IUser, 'id'>> {
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
				User: SpruceSchemas.core.User.IUser
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

		// will throw
		user.validate()

		return user.getValues()
	}

	/** this person will be logged in going forward */
	public setLoggedInUser(user: Omit<IUserWithToken, 'isLoggedIn'>) {
		// pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: IUserWithToken[] = []

		// remove this user if already authed
		authedUsers.forEach(authed => {
			if (authed.id !== user.id) {
				newAuthedUsers.push({ ...authed, isLoggedIn: false })
			}
		})

		// lets validate the user and pull out values
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

	/** get the logged in user */
	public loggedInUser(): IUserWithToken | undefined {
		const loggedInUsers = this.readValue('authedUsers') || []
		const loggedInUser = loggedInUsers.find(auth => auth.isLoggedIn)

		// valid the saved user we have is valid
		if (loggedInUser) {
			try {
				const instance = new Schema(userWithTokenDefinition, loggedInUser)
				instance.validate()
				return instance.getValues()
			} catch (err) {
				this.log.crit(`Loading logged in user failed`)
				this.log.crit(err)
			}
		}

		return undefined
	}

	/** log everyone out */
	public logout() {
		// pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: IUserWithToken[] = []

		// remove this user if already authed
		authedUsers.forEach(authed => {
			newAuthedUsers.push({ ...authed, isLoggedIn: false })
		})

		this.writeValue('authedUsers', authedUsers)
	}

	/** users who have ever been on */
	public users(): IUserWithToken[] {
		const users = this.readValue('authedUsers') || []
		return users
	}
}
