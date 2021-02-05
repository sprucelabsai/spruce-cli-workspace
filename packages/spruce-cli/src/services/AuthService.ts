import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { normalizeSchemaValues, validateSchemaValues } from '@sprucelabs/schema'
import personWithTokenSchema from '#spruce/schemas/spruceCli/v2020_07_22/personWithToken.schema'
import EnvService from './EnvService'

type PersonWithToken = SpruceSchemas.SpruceCli.v2020_07_22.PersonWithToken

interface SkillAuth {
	id: string
	apiKey: string
	name: string
}

export default class AuthService {
	private env: EnvService

	public constructor(envService: EnvService) {
		this.env = envService
	}

	public getLoggedInPerson(): PersonWithToken | null {
		const p = this.env.get('loggedInPerson')
		if (typeof p === 'string') {
			return JSON.parse(p)
		}

		return null
	}

	public setLoggedInPerson(person: PersonWithToken) {
		const normalized = normalizeSchemaValues(personWithTokenSchema, person)
		validateSchemaValues(personWithTokenSchema, normalized)

		this.env.set(
			'loggedInPerson',
			JSON.stringify({
				...normalized,
				isLoggedIn: true,
			})
		)
	}

	public logOutPerson() {
		this.env.unset('loggedInPerson')
	}

	public getCurrentSkill(): SkillAuth | null {
		const id = this.env.get('SKILL_ID') as string
		const apiKey = this.env.get('SKILL_API_KEY') as string
		const name = this.env.get('SKILL_NAME') as string

		if (id && apiKey) {
			return {
				id,
				apiKey,
				name,
			}
		}

		return null
	}

	public updateCurrentSkill(skill: SkillAuth) {
		this.env.set('SKILL_ID', skill.id)
		this.env.set('SKILL_API_KEY', skill.apiKey)
		this.env.set('SKILL_NAME', skill.name)
	}
}
