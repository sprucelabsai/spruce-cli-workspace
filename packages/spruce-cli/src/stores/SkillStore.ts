import path from 'path'
import Schema from '@sprucelabs/schema'
import { parse as parseEnv } from 'dotenv'
import fs from 'fs-extra'
import skillDefinition from '#spruce/schemas/core/skill.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import log from '../singletons/log'
import { AuthedAs } from '../types/cli.types'
import { SpruceEvents } from '../types/events-generated'
import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

type ISkill = SpruceSchemas.Local.ICliSkill

export interface ISkillStoreSettings extends ILocalStoreSettings {
	loggedInSkill: ISkill
}

export default class SkillStore extends AbstractLocalStore<
	ISkillStoreSettings
> {
	public name = 'skill'

	/** Build a skill with the passed values */
	public static getSkill(values?: Partial<ISkill>) {
		return new Schema(skillDefinition, values)
	}

	/** Get all skills the user has access to */
	public async getSkills(userToken: string): Promise<ISkill[]> {
		const mercury = await this.mercuryForUser(userToken)
		const result = await mercury.emit<
			SpruceEvents.Core.GetDeveloperSkills.IPayload,
			SpruceEvents.Core.GetDeveloperSkills.IResponseBody
		>({ eventName: SpruceEvents.Core.GetDeveloperSkills.name })

		const skills = result.responses[0].payload.skills.map((values) => {
			const instance = SkillStore.getSkill(values)

			instance.validate()

			return instance.getValues()
		})

		// @ts-ignore
		return skills
	}

	public setLoggedInSkill(skill: ISkill) {
		const instance = SkillStore.getSkill(skill)

		instance.validate()

		this.writeValues({
			loggedInSkill: instance.getValues(),
			authType: AuthedAs.Skill,
		})
	}

	/** Gets a logged in skill of one is set */
	public getLoggedInSkill(): ISkill | undefined {
		const loggedIn = this.readValue('loggedInSkill')

		if (loggedIn) {
			const instance = SkillStore.getSkill(loggedIn)

			instance.validate()

			return instance.getValues()
		}

		return undefined
	}

	// Get a skill from the current directly
	public getSkillFromDir(dir: string): ISkill | undefined {
		const file = path.join(dir, '.env')

		if (!fs.existsSync(file)) {
			return undefined
		}

		const fileContents = fs.readFileSync(file)

		const env = parseEnv(fileContents)
		const instance = SkillStore.getSkill({
			id: env.ID,
			name: env.NAME,
			slug: env.SLUG,
			apiKey: env.API_KEY,
		})
		try {
			instance.validate()

			return instance.getValues()
		} catch (err) {
			log.warn('INVALID skill ENV')
			return undefined
		}
	}
}
