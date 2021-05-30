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
import actionUtil from '../../utilities/action.utility'

const EVENT_NAME_READABLE = 'my fantastically amazing event'
const EVENT_NAME = 'my-fantastically-amazing-event'
const EVENT_CAMEL = 'myFantasticallyAmazingEvent'

export default class CreatingAnEventTest extends AbstractEventTest {
	private static readonly expectedVersion =
		versionUtil.generateVersion().constValue

	@test()
	protected static async hasCreateAction() {
		assert.isFunction(this.Action('event', 'create').execute)
	}

	@test()
	protected static async cantCreateEventWithoutBeingRegistered() {
		await this.FeatureFixture().installCachedFeatures('events')
		await this.assertCantCreateWithoutBeingRegistered()
	}

	@test()
	protected static async createsExpectedPayloads() {
		const { results } = await this.createEvent()

		const filesThatShouldExist = [
			'myFantasticallyAmazingEventResponsePayload',
			'myFantasticallyAmazingEventEmitTargetAndPayload',
			'emitPayload.builder.ts',
			'emitTarget.builder.ts',
		]

		const checker = this.Service('typeChecker')
		for (const name of filesThatShouldExist) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				name,
				results.files
			)
			await checker.check(match)
		}
	}

	@test()
	protected static async createsEventWitPayloadsPermissionsAndOptions() {
		const { results, cli, skill } = await this.createEvent()
		assert.isFalsy(results.errors)

		await this.copyEventBuildersAndPermissions(EVENT_NAME)

		const syncResults = await this.Action('event', 'sync').execute({})
		assert.isFalsy(syncResults.errors)

		const mixedResults = actionUtil.mergeActionResults(results, syncResults)

		await this.assertExpectedTargetAndPayload(mixedResults)
		await this.assertExpectedPayloadSchemas(mixedResults)
		await this.assertReturnsEventFromHealthCheck(cli, skill)
		await this.createsExpectedPermissionContract(mixedResults)
		await this.assertCreatesOptionsFile(mixedResults)
	}

	@test()
	protected static async createdEventsAreTypedCorrectly() {
		const { results } = await this.createEvent()

		assert.isFalsy(results.errors)

		const { fqen } = results.meta ?? {}

		const testFileContents = diskUtil
			.readFile(this.resolveTestPath('client-test.ts.hbs'))
			.replace('{{fqen}}', fqen)

		const testFile = this.resolvePath('src', 'test-client.ts')
		diskUtil.writeFile(testFile, testFileContents)

		await this.Service('typeChecker').check(testFile)
	}

	private static async createEvent() {
		const cli = await this.FeatureFixture().installCachedFeatures('events')

		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})

		const results = await this.Action('event', 'create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})
		return { results, cli, skill }
	}

	private static async assertCreatesOptionsFile(
		results: FeatureActionResponse
	) {
		const optionsFile = testUtil.assertsFileByNameInGeneratedFiles(
			'event.options.ts',
			results.files
		)

		const imported = await this.Service('import').importDefault(optionsFile)

		assert.isEqualDeep(imported, { isGlobal: false })
	}

	private static async assertExpectedTargetAndPayload(
		results: FeatureActionResponse
	) {
		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'myFantasticallyAmazingEventEmitTargetAndPayload.schema.ts',
			results.files
		)
		const schema = await this.Service('schema').importSchema(match)
		assert.isEqual(schema.id, 'myFantasticallyAmazingEventEmitTargetAndPayload')
		assert.isTruthy(schema.fields?.payload)
		assert.isTruthy(schema.fields?.target)
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

	protected static async assertCantCreateWithoutBeingRegistered() {
		const results = await this.Action('event', 'create').execute({
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
				fileName: 'emitTarget.builder.ts',
				expectedId: 'myFantasticallyAmazingEventEmitTarget',
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
