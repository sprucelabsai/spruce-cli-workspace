import jwt from 'jsonwebtoken'
import BaseStore from './Base'
import { SpruceSchemas } from '../.spruce/schemas'
import { Mercury, IMercuryGQLBody } from '@sprucelabs/mercury'
import { SpruceEvents } from '../types/events-generated'
import CliError from '../errors/CliError'
import { CliErrorCode } from '../errors/types'
import gql from 'graphql-tag'
import Schema from '@sprucelabs/schema'
import userWithTokenDefinition, {
	UserWithToken
} from '../schemas/userWithToken.schema'
import userDefinition, { User } from '../schemas/user.schema'

/** settings i need to save */
interface IUserStoreSettings {
	authedUsers: UserWithToken[]
}

export default class UserStore extends BaseStore<IUserStoreSettings> {
	public name = 'user'

	/** mercury locked and loaded */
	public mercury: Mercury

	public constructor(mercury: Mercury) {
		super()
		this.mercury = mercury
	}

	/** build a new user with an added token */
	public static userWithToken(values?: Partial<UserWithToken>) {
		return new Schema(userWithTokenDefinition, values)
	}

	/** build a basic user */
	public static user(values?: Partial<User>) {
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
	): Promise<UserWithToken | undefined> {
		const decoded = jwt.decode(token) as Record<string, any> | null
		if (!decoded) {
			throw new CliError({
				code: CliErrorCode.Generic,
				friendlyMessage: 'Invalid token!'
			})
		}

		// setup mercury to use creds
		const { connectionOptions } = this.mercury
		if (!connectionOptions) {
			throw new CliError({
				code: CliErrorCode.GenericMercury,
				eventName: 'na',
				friendlyMessage:
					'user store was trying to auth on mercury but had not options (meaning it was never connected)'
			})
		}
		// connect with new creds
		await this.mercury.connect({
			...(connectionOptions || {}),
			credentials: { token }
		})

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
						UserLocations {
							edges {
								node {
									role
									LocationId
									Job {
										name
										isDefault
										role
									}
								}
							}
						}
						UserGroups {
							edges {
								node {
									Group {
										name
									}
									Job {
										name
										isDefault
										role
									}
								}
							}
						}
						UserOrganizations {
							edges {
								node {
									role
									OrganizationId
								}
							}
						}
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
	public setLoggedInUser(user: Omit<UserWithToken, 'isLoggedIn'>) {
		// pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		// remove this user if already authed
		authedUsers.forEach(authed => {
			if (authed.id !== user.id) {
				newAuthedUsers.push({ ...authed, isLoggedIn: false })
			}
		})

		newAuthedUsers.push({
			...user,
			isLoggedIn: true
		})

		this.writeValue('authedUsers', newAuthedUsers)
	}

	/** get the logged in user */
	public loggedInUser(): UserWithToken | undefined {
		const loggedInUsers = this.readValue('authedUsers') || []
		const loggedInUser = loggedInUsers.find(auth => auth.isLoggedIn)
		return loggedInUser
	}

	/** log everyone out */
	public logout() {
		// pull authed user
		const authedUsers = this.readValue('authedUsers') || []
		const newAuthedUsers: UserWithToken[] = []

		// remove this user if already authed
		authedUsers.forEach(authed => {
			newAuthedUsers.push({ ...authed, isLoggedIn: false })
		})

		this.writeValue('authedUsers', authedUsers)
	}

	/** users who have ever been on */
	public users(): UserWithToken[] {
		const users = this.readValue('authedUsers') || []
		return users
	}
}
