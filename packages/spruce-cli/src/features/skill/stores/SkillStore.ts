import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { eventResponseUtil } from '@sprucelabs/mercury-types'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'

type Skill = Omit<SpruceSchemas.Spruce.v2020_07_22.Skill, 'creators'>

export interface CreateSkill {
	name: string
	slug: string
	description?: string
}

export default class SkillStore extends AbstractStore {
	public readonly name = 'skill'

	public async register(skill: CreateSkill): Promise<Skill> {
		const isInstalled = this.Service('settings').isMarkedAsInstalled('skill')

		if (!isInstalled) {
			throw new SpruceError({ code: 'DIRECTORY_NOT_SKILL' })
		}

		const { name, slug, description } = skill
		const client = await this.connectToApi()
		const results = await client.emit('register-skill', {
			payload: {
				name,
				slug,
				description,
			},
		})

		const first = eventResponseUtil.getFirstResponseOrThrow(results)

		return first.skill
	}
}
