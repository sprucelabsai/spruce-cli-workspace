import { eventContractUtil } from '@sprucelabs/spruce-event-utils'
import {
	diskUtil,
	namesUtil,
	versionUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { CliInterface } from '../../cli'
import { FeatureActionResponse } from '../../features/features.types'
import AbstractEventTest from '../../tests/AbstractEventTest'
import testUtil from '../../tests/utilities/test.utility'
import { RegisteredSkill } from '../../types/cli.types'

const EVENT_NAME_READABLE = 'my fantastically amazing event'
const EVENT_NAME = 'my-fantastically-amazing-event'
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
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		assert.isArray(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'SKILL_NOT_REGISTERED')
	}

	@test.only()
	protected static async createsVersionedEventFiles() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})

		debugger
		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		debugger

		assert.isFalsy(results.errors?.[0])

		await this.assertReturnsEventFromHealthCheck(cli, skill)
		await this.assertExpectedPayloadSchemas(results, skill)
		await this.assertValidActionResponseFiles(results)
	}

	@test()
	protected static async createsExpectedPermissionContract() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})

		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		const builders = [
			{ filename: 'emitPermissions.builder.ts' },
			{ filename: 'listenPermissions.builder.ts' },
		]

		for (const builder of builders) {
			const { filename } = builder

			const match = testUtil.assertsFileByNameInGeneratedFiles(
				filename,
				results.files
			)

			const path = versionUtil.resolvePath(
				this.cwd,
				'src/events/',
				namesUtil.toPascal(skill.slug ?? 'missing'),
				'{{@latest}}',
				EVENT_NAME,
				filename
			)

			assert.isEqual(match, path)
			assert.isTrue(diskUtil.doesFileExist(path))
		}
	}

	private static async assertReturnsEventFromHealthCheck(
		cli: CliInterface,
		skill: RegisteredSkill
	) {
		await this.openInVsCode({ timeout: 1000 })
		const health = await cli.checkHealth()

		debugger
		await this.openInVsCode()

		assert.isTruthy(health.event)
		assert.isLength(health.event.events, 1)

		const eventName = EVENT_NAME
		const eventNamespace = namesUtil.toPascal(skill.slug)

		assert.doesInclude(health.event.events, {
			eventName,
			eventNamespace,
			version: versionUtil.generateVersion().constValue,
		})

		assert.doesInclude(health.event.contracts, {
			eventNameWithOptionalNamespace: eventContractUtil.joinEventNameWithOptionalNamespace(
				{
					eventName,
					eventNamespace,
				}
			),
		})
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
					this.cwd,
					'src/events/',
					namesUtil.toPascal(skill.slug ?? 'missing'),
					'{{@latest}}',
					EVENT_NAME,
					payload.fileName
				)
			)

			const imported = await schemas.importSchema(match)

			assert.isEqual(imported.id, payload.expectedId)
		}
	}
}
