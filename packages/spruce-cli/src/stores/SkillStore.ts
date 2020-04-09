import AbstractStore, { IBaseStoreSettings, StoreAuth } from './AbstractStore'
import { SpruceSchemas } from '#spruce/schemas/core.types'
import { SpruceEvents } from '../types/events-generated'
import Schema from '@sprucelabs/schema'
import { parse as parseEnv } from 'dotenv'
import fs from 'fs-extra'
import path from 'path'
import { ISkill } from '#spruce/schemas/skill.types'

export interface ISkillStoreSettings extends IBaseStoreSettings {
	loggedInSkill: SpruceSchemas.core.Skill.ISkill
}

export default class SkillStore extends AbstractStore<ISkillStoreSettings> {
	public name = 'skill'

	/** Build a skill with the passed values */
	public static skill(values?: Partial<ISkill>) {
		return new Schema(SpruceSchemas.core.Skill.definition, values)
	}

	/** Get all skills the user has access to */
	public async skills(userToken: string): Promise<ISkill[]> {
		const mercury = await this.mercuryForUser(userToken)
		const result = await mercury.emit<
			SpruceEvents.core.GetDeveloperSkills.IPayload,
			SpruceEvents.core.GetDeveloperSkills.IResponseBody
		>({ eventName: SpruceEvents.core.GetDeveloperSkills.name })

		const skills = result.responses[0].payload.skills.map(values => {
			const instance = SkillStore.skill(values)
			instance.validate()
			return instance.getValues()
		})

		return skills
	}

	/** Set logged in skill */
	public setLoggedInSkill(skill: ISkill) {
		// Validate what we were passed
		const instance = SkillStore.skill(skill)
		instance.validate()

		this.writeValues({
			loggedInSkill: instance.getValues(),
			authType: StoreAuth.Skill
		})
	}

	/** Gets a logged in skill of one is set */
	public loggedInSkill(): ISkill | undefined {
		const loggedIn = this.readValue('loggedInSkill')

		if (loggedIn) {
			const instance = SkillStore.skill(loggedIn)
			instance.validate()
			return instance.getValues()
		}

		return undefined
	}

	// Get a skill from the current directly
	public skillFromDir(dir: string): ISkill | undefined {
		const file = path.join(dir, '.env')

		if (!fs.existsSync(file)) {
			return undefined
		}

		const fileContents = fs.readFileSync(file)

		const env = parseEnv(fileContents)
		const instance = SkillStore.skill({
			id: env.ID,
			name: env.NAME,
			slug: env.SLUG,
			apiKey: env.API_KEY
		})
		try {
			instance.validate()
			return instance.getValues()
		} catch (err) {
			this.log.warn('INVALID skill ENV')
			return undefined
		}
	}
}
