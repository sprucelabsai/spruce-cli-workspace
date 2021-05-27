import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../tests/AbstractEventTest'

export default class RegisteringConversationsOnBootTest extends AbstractEventTest {
	@test()
	protected static async canRegisterConversationsOnBoot() {
		const { currentSkill } =
			await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg(
				'conversation'
			)

		await this.Executer('conversation', 'create').execute({
			nameReadable: 'book an appointment',
			nameCamel: 'bookAnAppointment',
		})

		const boot = await this.Executer('skill', 'boot').execute({ local: true })

		const client = await this.connectToApi({
			skillId: currentSkill.id,
			apiKey: currentSkill.apiKey,
		})

		const topicResults = await this.Store('conversation', {
			apiClientFactory: async () => client,
		}).fetchRegisteredTopics()

		const topics = topicResults.topics

		boot.meta?.kill()

		assert.isLength(topics, 1)
		assert.isEqual(topics[0].key, 'bookAnAppointment')
	}
}
