import jwt from 'jsonwebtoken'
import { ICoreGQLUser } from '@sprucelabs/spruce-types'
import { Mercury, IMercuryGQLBody } from '@sprucelabs/mercury'
import { RemoteType, RemoteConfig } from '../utilities/Config'
import { SpruceEvents } from '../types/events-generated'
import gql from 'graphql-tag'

interface IUserInitOptions {
	jwt?: string
	remote?: RemoteType
	id?: string
	name?: string
	firstName?: string
	lastName?: string
}

export default class User {
	public id?: string | null
	public firstName?: string | null
	public lastName?: string | null
	public remote?: RemoteType

	private _name?: string | null
	private _jwt?: string

	private _mercury?: Mercury

	public get mercury(): Mercury {
		if (!this.remote || !this.jwt) {
			throw new Error('INVALID_CREDENTIALS')
		}
		if (!this._mercury) {
			this._mercury = new Mercury({
				spruceApiUrl: RemoteConfig[this.remote].remote,
				credentials: {
					token: this.jwt
				}
			})
		}

		return this._mercury
	}

	public get name(): string {
		return this._name || 'Friend'
	}

	public get jwt(): string | undefined {
		return this._jwt
	}

	public constructor(options: IUserInitOptions) {
		const { jwt, remote, id, name, firstName, lastName } = options

		this._jwt = jwt
		this.remote = remote
		this.id = id
		this._name = name
		this.firstName = firstName
		this.lastName = lastName
	}

	public async syncUser() {
		if (!this.jwt) {
			throw new Error('MISSING_JWT')
		}
		const decoded = jwt.decode(this.jwt) as Record<string, any> | null

		if (!decoded || !decoded.userId) {
			throw new Error('INVALID_JWT')
		}
		const userId: string = decoded.userId

		const query =
			gql`
				query User($userId: ID!) {
					User(id: $userId) {
						id
						name
						firstName
						lastName
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
				User: ICoreGQLUser
			}>
		>({
			eventName: SpruceEvents.core.Gql.name,
			payload: {
				query,
				variables: {
					userId
				}
			}
		})

		this.id = result.responses[0].payload.data.User.id
		this._name = result.responses[0].payload.data.User.name
		this.firstName = result.responses[0].payload.data.User.firstName
		this.lastName = result.responses[0].payload.data.User.lastName
	}

	/** Returns data that can be saved to disk and later passed back to the constructor to recreate this user model */
	public toData() {
		return {
			jwt: this.jwt,
			remote: this.remote,
			id: this.id,
			name: this.name,
			firstName: this.firstName,
			lastName: this.lastName
		}
	}
}
