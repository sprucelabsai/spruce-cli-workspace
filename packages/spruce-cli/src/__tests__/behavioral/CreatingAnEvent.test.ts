import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../tests/AbstractEventTest'
import testUtil from '../../tests/utilities/test.utility'

const EVENT_NAME = 'my fantastically amazing event'
const EVENT_SLUG = 'my-fantastically-amazing-event'
const EVENT_CAMEL = 'MyFantasticallyAmazingEvent'

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
	protected static async createsEventFiles() {
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

		const files = ['emitPayload.builder.ts', 'responsePayload.builder.ts']

		for (const file of files) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				file,
				results.files
			)

			assert.isEqual(
				match,
				this.resolvePath(
					'src/events/',
					namesUtil.toPascal(skill.slug),
					EVENT_SLUG,
					file
				)
			)
		}

		await this.assertValidActionResponseFiles(results)
	}
}
