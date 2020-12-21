import { namesUtil, versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../tests/AbstractEventTest'
import testUtil from '../../tests/utilities/test.utility'

const EVENT_NAME = 'my fantastically amazing event'
const EVENT_SLUG = 'my-fantastically-amazing-event'
const EVENT_CAMEL = 'myFantasticallyAmazingEvent'

export default class CreatingAnEventTest extends AbstractEventTest {
	@test()
	protected static async hasCreateAction() {
		assert.isFunction(
			(await this.Cli()).getFeature('event').Action('create').execute
		)
	}

	@test()
	protected static async cantCreateWithoutBeingRegistered() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')
		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME,
			nameKebab: EVENT_SLUG,
			nameCamel: EVENT_CAMEL,
		})

		assert.isArray(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'SKILL_NOT_REGISTERED')
	}

	@test()
	protected static async createsVersionedEventFiles() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})

		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME,
			nameKebab: EVENT_SLUG,
			nameCamel: EVENT_CAMEL,
		})

		assert.isFalsy(results.errors)

		const payloadSchemas = [
			{
				fileName: 'emitPayload.builder.ts',
				expectedId: 'myFantasticallyAmazingEventEmitPayload',
			},
			{
				fileName: 'responsePayload.builder.ts',
				expectedId: 'myFantasticallyAmazingEventResponsePayload',
			},
		]

		const schemas = this.Service('schema')

		for (const payload of payloadSchemas) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				payload.fileName,
				results.files
			)

			assert.isEqual(
				match,
				versionUtil.resolveNewLatestPath(
					this.resolvePath(
						'src/events/',
						namesUtil.toPascal(skill.slug),
						'{{@latest}}',
						EVENT_SLUG,
						payload.fileName
					)
				)
			)

			const imported = await schemas.importSchema(match)

			assert.isEqual(imported.id, payload.expectedId)
		}

		await this.assertValidActionResponseFiles(results)
	}
}
