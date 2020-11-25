import path from 'path'
import Schema from '@sprucelabs/schema'
import { parse as parseEnv } from 'dotenv'
import fs from 'fs-extra'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import skillSchema from '#spruce/schemas/spruce/v2020_07_22/skill.schema'
import log from '../singletons/log'
import { AuthedAs } from '../types/cli.types'
import AbstractLocalStore, { LocalStoreSettings } from './AbstractLocalStore'

type ISkill = SpruceSchemas.SpruceCli.v2020_07_22.CliSkill

export interface SkillStoreSettings extends LocalStoreSettings {
	loggedInSkill: ISkill
}

export default class SkillStore extends AbstractLocalStore<SkillStoreSettings> {
	public name = 'skill'

	/** Build a skill with the passed values */
	public static getSkill(values?: Partial<ISkill>) {
		return new Schema(skillSchema, values)
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
