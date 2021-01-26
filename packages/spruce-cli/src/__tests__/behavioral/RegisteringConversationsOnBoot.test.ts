import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../tests/AbstractEventTest'

export default class RegisteringConversationsOnBootTest extends AbstractEventTest {
	@test()
	protected static async canCreateRegisteringConversationsOnBoot() {
		const {
			cli,
			currentSkill,
		} = await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg(
			'conversation'
		)

		await cli.getFeature('conversation').Action('create').execute({
			nameReadable: 'book an appointment',
			nameCamel: 'bookAnAppointment',
		})

		const boot = await cli
			.getFeature('skill')
			.Action('boot')
			.execute({ local: true })

		const client = await this.connectToApi({
			skillId: currentSkill.id,
			apiKey: currentSkill.apiKey,
		})

		let topics: any

		do {
			await this.wait(1000)

			const topicResults = await this.Store('event', {
				apiClientFactory: async () => client,
			}).fetchRegisteredTopics()

			topics = topicResults.topics
		} while (topics.length === 0)

		boot.meta?.kill()

		assert.isLength(topics, 1)
		assert.isEqual(topics[0].key, 'bookAnAppointment')
	}
}
