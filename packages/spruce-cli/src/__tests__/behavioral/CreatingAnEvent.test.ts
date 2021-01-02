import { eventDiskUtil, eventNameUtil } from '@sprucelabs/spruce-event-utils'
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
	private static readonly expectedVersion = versionUtil.generateVersion()
		.constValue

	@test()
	protected static async hasCreateAction() {
		assert.isFunction(
			(await this.Cli()).getFeature('event').Action('create').execute
		)
	}

	@test()
	protected static async createsVersionedEventFilesDefaultingToToday() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		await this.assertCantCreateWithoutBeingRegistered(cli)

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})

		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		assert.isFalsy(results.errors)

		await this.assertExpectedPayloadSchemas(results)
		await this.assertReturnsEventFromHealthCheck(cli, skill)
		await this.assertValidActionResponseFiles(results)
		await this.createsExpectedPermissionContract(results)
	}

	protected static async createsExpectedPermissionContract(results: any) {
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
				EVENT_NAME,
				'{{@latest}}',
				filename
			)

			assert.isEqual(match, path)
			assert.isTrue(diskUtil.doesFileExist(path))
		}
	}

	protected static async assertCantCreateWithoutBeingRegistered(cli: any) {
		const results = await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		assert.isArray(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'SKILL_NOT_REGISTERED')
	}

	private static async assertReturnsEventFromHealthCheck(
		cli: CliInterface,
		skill: RegisteredSkill
	) {
		const health = await cli.checkHealth()

		assert.isTruthy(health.event)
		assert.isLength(health.event.events, 1)

		const eventName = EVENT_NAME
		const eventNamespace = namesUtil.toKebab(skill.slug)

		assert.doesInclude(health.event.events, {
			eventName,
			eventNamespace,
			version: this.expectedVersion,
		})

		assert.doesInclude(health.event.contracts, {
			fullyQualifiedEventName: eventNameUtil.join({
				eventName,
				eventNamespace,
				version: this.expectedVersion,
			}),
		})
	}

	private static async assertExpectedPayloadSchemas(
		results: FeatureActionResponse
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
			{
				fileName: 'myFantasticallyAmazingEventTargetAndPayload.schema.ts',
				expectedId: 'myFantasticallyAmazingEventTargetAndPayload',
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
				eventDiskUtil.resolveEventPath(this.cwd + '/src/events', {
					fileName: payload.fileName as any,
					eventName: EVENT_NAME,
					version: this.expectedVersion,
				})
			)

			const imported = await schemas.importSchema(match)

			assert.isEqual(imported.id, payload.expectedId)
		}
	}
}
