import '@sprucelabs/spruce-conversation-plugin'
import { test, assert } from '@sprucelabs/test'
import { CliInterface } from '../../cli'
import AbstractCliTest from '../../tests/AbstractCliTest'
import testUtil from '../../tests/utilities/test.utility'

export default class CreatingAConversationTopicTest extends AbstractCliTest {
	@test()
	protected static async hasCreateConversationAction() {
		assert.isFunction(this.Action('conversation', 'create').execute)
	}

	@test()
	protected static async createsValidConversationTopicDefinition() {
		const cli = await this.FeatureFixture().installCachedFeatures(
			'conversation'
		)

		const results = await this.Action('conversation', 'create').execute({
			nameReadable: 'book an appointment',
			nameCamel: 'bookAnAppointment',
		})

		const match = testUtil.assertFileByNameInGeneratedFiles(
			'bookAnAppointment.topic.ts',
			results.files
		)

		const imported = await this.Service('import').importDefault(match)

		assert.isTruthy(imported)
		assert.isEqual(imported.label, 'book an appointment')
		assert.isArray(imported.utterances)
		assert.isArray(imported.script)

		await this.assertHealthCheckResultsAreValid(cli)
	}

	private static async assertHealthCheckResultsAreValid(cli: CliInterface) {
		const health = await cli.checkHealth()
		assert.isTruthy(health.conversation)
		assert.isArray(health.conversation.topics)
		assert.isLength(health.conversation.topics, 1)
		assert.doesInclude(health.conversation.topics, 'bookAnAppointment')
	}
}
