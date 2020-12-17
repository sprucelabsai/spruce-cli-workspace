import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { eventResponseUtil } from '@sprucelabs/mercury-types'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'

type Skill = Omit<SpruceSchemas.Spruce.v2020_07_22.Skill, 'creators'>

export interface CreateSkill {
	name: string
	slug: string
	description?: string
}

type CurrentSkill = Partial<Skill> & {
	name: string
	isRegistered: boolean
	namespacePascal: string
}

export interface RegisterSkillOptions {
	isRegisteringCurrentSkill: boolean
}

export default class SkillStore extends AbstractStore {
	public readonly name = 'skill'

	public async register(
		values: CreateSkill,
		options?: RegisterSkillOptions
	): Promise<Skill> {
		const isRegisteringCurrentSkill =
			options?.isRegisteringCurrentSkill !== false

		isRegisteringCurrentSkill && this.assertInSkill()

		const { name, slug, description } = values

		const client = await this.connectToApi()

		const results = await client.emit('register-skill', {
			payload: {
				name,
				slug,
				description,
			},
		})

		const { skill } = eventResponseUtil.getFirstResponseOrThrow(results)

		if (isRegisteringCurrentSkill) {
			const env = this.Service('env')

			env.set('SKILL_ID', skill.id)
			env.set('SKILL_API_KEY', skill.apiKey)
		}

		return skill
	}

	private assertInSkill() {
		const isInstalled = this.Service('settings').isMarkedAsInstalled('skill')

		if (!isInstalled) {
			throw new SpruceError({ code: 'DIRECTORY_NOT_SKILL' })
		}
	}

	public async loadCurrentSkill(): Promise<CurrentSkill> {
		this.assertInSkill()

		const envService = this.Service('env')
		const skillId = envService.get('SKILL_ID') as string | undefined

		if (skillId) {
			const client = await this.connectToApi()
			const response = await client.emit('get-skill', {
				payload: {
					id: skillId,
				},
			})

			const { skill } = eventResponseUtil.getFirstResponseOrThrow(response)

			return {
				...skill,
				namespacePascal: this.loadCurrentSkillsNamespace(),
				isRegistered: true,
				apiKey: envService.get('SKILL_API_KEY') as string,
			}
		} else {
			return {
				name: this.getSkillNameFromPkg(),
				namespacePascal: this.loadCurrentSkillsNamespace(),
				description: this.getSkillDescriptionFromPkg(),
				isRegistered: false,
			}
		}
	}

	public async isCurrentSkillRegistered() {
		const skill = await this.loadCurrentSkill()
		return skill.isRegistered
	}

	private getSkillNameFromPkg() {
		const pkg = this.Service('pkg')
		const nameFromPackage = pkg.get('name')
		if (!nameFromPackage) {
			throw new Error(
				'Need name in package.json, make this error a proper spruce error'
			)
		}
		return nameFromPackage.split('/').pop()
	}

	public loadCurrentSkillsNamespace() {
		return namesUtil.toPascal(this.getSkillNameFromPkg())
	}

	private getSkillDescriptionFromPkg() {
		const pkg = this.Service('pkg')
		return pkg.get('description')
	}
}
