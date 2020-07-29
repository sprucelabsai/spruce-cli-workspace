import { IMercuryGQLBody } from '@sprucelabs/mercury'
import Schema, {
	validateSchemaValues,
	normalizeSchemaValues,
} from '@sprucelabs/schema'
import jwt from 'jsonwebtoken'
import ErrorCode from '#spruce/errors/errorCode'
import cliUserWithTokenDefinition from '#spruce/schemas/local/v2020_07_22/cliUserWithToken.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import userDefinition from '#spruce/schemas/spruce/v2020_07_22/person.definition'
import SpruceError from '../errors/SpruceError'
import log from '../singletons/log'
import { AuthedAs } from '../types/cli.types'
import { SpruceEvents } from '../types/events-generated'
import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

type UserWithToken = SpruceSchemas.Local.v2020_07_22.ICliUserWithToken
type User = SpruceSchemas.Local.v2020_07_22.ICliUser

/** Settings i need to save */
interface IUserStoreSettings extends ILocalStoreSettings {
	authedUsers: UserWithToken[]
}

export default class UserStore extends AbstractLocalStore<IUserStoreSettings> {
	public name = 'user'

	public static getUserWithToken(values?: Partial<UserWithToken>) {
		return new Schema(cliUserWithTokenDefinition, values)
	}

	public static getUser(values?: Partial<User>) {
		return new Schema(userDefinition, values)
	}

	public async fetchUserWithTokenFromPhone(phone: string, pin: string) {
		const loginResult = await this.mercury.emit<
			SpruceEvents.Core.Login.IPayload,
			SpruceEvents.Core.Login.IResponseBody
		>({
			eventName: SpruceEvents.Core.Login.name,
			payload: {
				phoneNumber: phone,
				code: pin,
			},
		})

		const token = loginResult.responses[0]?.payload.jwt

		if (!token) {
			throw new SpruceError({
				code: ErrorCode.GenericMercury,
				eventName: SpruceEvents.Core.Login.name,
				payloadArgs: [
					{ name: 'phone', value: phone },
					{ name: 'pin', value: pin },
				],
				friendlyMessage: "Login event didn't return a jwt?",
			})
		}

		const user = await this.fetchUserWithTokenFromToken(token)

		if (!user) {
			throw new SpruceError({
				code: ErrorCode.UserNotFound,
				token,
			})
		}

		return user
	}

	public async fetchUserWithTokenFromToken(
		token: string
	): Promise<UserWithToken | undefined> {
		const decoded = jwt.decode(token) as Record<string, any> | null
		if (!decoded) {
			throw new SpruceError({
				code: ErrorCode.Generic,
				friendlyMessage: 'Invalid token!',
			})
		}

		// Setup mercury to use creds
		this.mercury = await this.mercuryForUser(token)

		// Now load from id
		const userId: string = decoded.userId
		const user = await this.fetchUserFromId(userId)

		if (!user) {
			return undefined
		}

		const userWithToken = UserStore.getUserWithToken({ ...user, token })
		// @ts-ignore
		return userWithToken.getValues()
	}

	public async fetchUserFromId(id: string): Promise<Omit<User, 'id'>> {
		const query = ''

		const result = await this.mercury.emit<
			SpruceEvents.Core.Gql.IPayload,
			IMercuryGQLBody<{
				User: SpruceSchemas.Spruce.v2020_07_22.IPerson
			}>
		>({
			eventName: SpruceEvents.Core.Gql.name,
			payload: {
				query,
				variables: {
					userId: id,
				},
			},
		})

		const values = result.responses[0].payload.data.User
		const user = UserStore.getUser(values)

		user.validate()

		return user.getValues()
	}

	public setLoggedInUser(user: Omit<UserWithToken, 'isLoggedIn'>) {
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		// Remove this user if already authed
		authedUsers.forEach((authed) => {
			if (authed.id !== user.id) {
				newAuthedUsers.push({ ...authed, isLoggedIn: false })
			}
		})

		// Lets validate the user and pull out values
		validateSchemaValues(cliUserWithTokenDefinition, user)

		const values = normalizeSchemaValues(cliUserWithTokenDefinition, user)

		newAuthedUsers.push({
			...values,
			isLoggedIn: true,
		})

		this.writeValues({
			authType: AuthedAs.User,
			authedUsers: newAuthedUsers,
		})
	}

	public getLoggedInUser(): UserWithToken | undefined {
		const loggedInUsers = this.readValue('authedUsers') || []
		const loggedInUser = loggedInUsers.find((auth) => auth.isLoggedIn)

		// Validate the saved user
		if (loggedInUser) {
			try {
				const instance = new Schema(cliUserWithTokenDefinition, loggedInUser)

				instance.validate()

				return instance.getValues()
			} catch (err) {
				log.crit(`Loading logged in user failed`)
				log.crit(err)
			}
		}

		return undefined
	}

	/** Log everyone out. Should never have more than one user logged in, but this sets them all to isLoggedIn=false */
	public logout() {
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		authedUsers.forEach((authed) => {
			newAuthedUsers.push({ ...authed, isLoggedIn: false })
		})

		this.writeValue('authedUsers', authedUsers)
	}

	public getUsers(): UserWithToken[] {
		const users = this.readValue('authedUsers') || []
		return users
	}
}
