import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { normalizeSchemaValues, validateSchemaValues } from '@sprucelabs/schema'
import { SettingsService } from '@sprucelabs/spruce-skill-utils'
import personWithTokenSchema from '#spruce/schemas/spruceCli/v2020_07_22/personWithToken.schema'
import EnvService from './EnvService'

type PersonWithToken = SpruceSchemas.SpruceCli.v2020_07_22.PersonWithToken

interface SkillAuth {
	id: string
	apiKey: string
}

export default class AuthService {
	private settings: SettingsService<string>
	private env: EnvService

	public constructor(settingsService: SettingsService, envService: EnvService) {
		this.settings = settingsService
		this.env = envService
	}

	public getLoggedInPerson(): PersonWithToken | null {
		return this.settings.get('loggedInPerson') ?? null
	}

	public setLoggedInPerson(person: PersonWithToken) {
		const normalized = normalizeSchemaValues(personWithTokenSchema, person)
		validateSchemaValues(personWithTokenSchema, normalized)

		this.settings.set('loggedInPerson', {
			...normalized,
			isLoggedIn: true,
		})
	}

	public logOutPerson() {
		this.settings.set('loggedInPerson', null)
	}

	public getCurrentSkill(): SkillAuth | null {
		const id = this.env.get('SKILL_ID') as string
		const apiKey = this.env.get('SKILL_API_KEY') as string

		if (id && apiKey) {
			return {
				id,
				apiKey,
			}
		}

		return null
	}

	public updateCurrentSkill(skill: SkillAuth) {
		this.env.set('SKILL_ID', skill.id)
		this.env.set('SKILL_API_KEY', skill.apiKey)
	}
}
