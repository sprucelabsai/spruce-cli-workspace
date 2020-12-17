import SkillStore from '../features/skill/stores/SkillStore'
import PersonFixture from './PersonFixture'

export default class SkillFixture {
	private skillStore: SkillStore
	private personFixture: PersonFixture

	public constructor(skillStore: SkillStore, personFixture: PersonFixture) {
		this.skillStore = skillStore
		this.personFixture = personFixture
	}

	public async registerCurrentSkill(options: { name: string; slug?: string }) {
		await this.personFixture.loginAsDummyPerson()

		return this.skillStore.register({
			slug: options.slug ?? `my-skill-${new Date().getTime()}`,
			...options,
		})
	}
}
