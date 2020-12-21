import {
	diskUtil,
	namesUtil,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { FeatureActionResponse } from '../../features/features.types'
import AbstractEventTest from '../../tests/AbstractEventTest'
import testUtil from '../../tests/utilities/test.utility'
import { RegisteredSkill } from '../../types/cli.types'

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

		await this.assertExpectedPayloadSchemas(results, skill)
		await this.assertExpectedPermissionContract(results, skill)
		await this.assertValidActionResponseFiles(results)
	}

	private static assertExpectedPermissionContract(
		results: FeatureActionResponse,
		skill: RegisteredSkill
	) {
		const name = 'permissions.contract.ts'
		const path = versionUtil.resolvePath(
			'src/events/',
			namesUtil.toPascal(skill.slug ?? 'missing'),
			'{{@latest}}',
			EVENT_SLUG,
			name
		)

		assert.isTrue(diskUtil.doesFileExist(path))
	}

	private static async assertExpectedPayloadSchemas(
		results: FeatureActionResponse,
		skill: RegisteredSkill
	) {
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
				versionUtil.resolvePath(
					'src/events/',
					namesUtil.toPascal(skill.slug ?? 'missing'),
					'{{@latest}}',
					EVENT_SLUG,
					payload.fileName
				)
			)

			const imported = await schemas.importSchema(match)

			assert.isEqual(imported.id, payload.expectedId)
		}
	}
}
