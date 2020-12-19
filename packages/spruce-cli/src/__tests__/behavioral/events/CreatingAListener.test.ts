import { EventSignature } from '@sprucelabs/mercury-types'
import { buildSchema } from '@sprucelabs/schema'
import { diskUtil, MERCURY_API_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractEventTest from '../../../tests/AbstractEventTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class SkillEmitsBootstrapEventTest extends AbstractEventTest {
	@test()
	protected static async throwsWithBadNamespace() {
		const cli = await this.installEventFeature('events')
		const results = await cli
			.getFeature('event')
			.Action('listen')
			.execute({ eventNamespace: 'taco-bell' })

		assert.isTruthy(results.errors)
		const err = results.errors[0]

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['eventNamespace'],
		})
	}

	@test()
	protected static async throwsWithBadEventName() {
		const cli = await this.installEventFeature('events')
		const results = await cli
			.getFeature('event')
			.Action('listen')
			.execute({ eventNamespace: 'mercuryApi', eventName: 'bad-time' })

		assert.isTruthy(results.errors)
		const err = results.errors[0]

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['eventName'],
		})
	}

	@test()
	protected static async createsValidListener() {
		const cli = await this.installEventFeature('events')

		const version = 'v2020_01_01'

		const results = await cli.getFeature('event').Action('listen').execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
			version,
		})

		assert.isFalsy(results.errors)

		const match = testUtil.assertsFileByNameInGeneratedFiles(
			'will-boot.listener.ts',
			results.files
		)

		assert.doesInclude(match, version)

		diskUtil.writeFile(match, 'export default () => {}')

		await this.Service('typeChecker').check(match)

		const health = await cli.checkHealth()

		assert.isTruthy(health.skill)

		assert.isUndefined(health.skill.errors)
		assert.isTruthy(health.event)

		assert.doesInclude(health.event.listeners, {
			eventName: 'will-boot',
			eventNamespace: 'skill',
			version,
		})
	}

	@test()
	protected static async creatingANewListenerAsksWhichEventToListenTo() {
		const cli = await this.installEventFeature('events')

		void cli.getFeature('event').Action('listen').execute({})

		await this.waitForInput()

		let lastInvocation = this.ui.lastInvocation()

		assert.isEqual(lastInvocation.command, 'prompt')
		assert.doesInclude(lastInvocation.options.label, 'namespace')

		await this.ui.sendInput(MERCURY_API_NAMESPACE)

		await this.waitForInput()

		lastInvocation = this.ui.lastInvocation()

		assert.doesInclude(lastInvocation.options.label, 'event')

		this.ui.reset()
	}

	@test()
	protected static async generatesTypedListenerWithoutPayloads() {
		const {
			contents,
		} = await this.setupSkillsInstallAtOrgRegisterEventContractAndGenerateListener(
			{}
		)

		assert.doesInclude(
			contents,
			'export default (event: SpruceEvent): SpruceEventResponse'
		)
	}

	@test()
	protected static async generatesTypedListenerWithEmitPayload() {
		const {
			contents,
		} = await this.setupSkillsInstallAtOrgRegisterEventContractAndGenerateListener(
			{
				emitPayloadSchema: buildSchema({
					id: 'myNewEventEmitPayload',
					fields: {
						booleanField: {
							type: 'boolean',
						},
					},
				}),
			}
		)

		assert.doesInclude(
			contents,
			'export default (event: SpruceEvent<EventContracts, EmitPayload>): SpruceEventResponse'
		)
	}

	@test()
	protected static async generatesTypedListenerWithAllPayloads() {
		const {
			contents,
		} = await this.setupSkillsInstallAtOrgRegisterEventContractAndGenerateListener(
			{
				emitPayloadSchema: buildSchema({
					id: 'myNewEventEmitPayload',
					fields: {
						booleanField: {
							type: 'boolean',
						},
					},
				}),
				responsePayloadSchema: buildSchema({
					id: 'myNewEventResponsePayload',
					fields: {
						booleanField: {
							type: 'boolean',
						},
					},
				}),
			}
		)

		assert.doesInclude(
			contents,
			'export default (event: SpruceEvent<EventContracts, EmitPayload>): SpruceEventResponse<ResponsePayload>'
		)
	}

	@test.only()
	protected static async emittingEventTriggersListener() {
		const {
			skill2,
			contents,
			listenerPath,
		} = await this.setupSkillsInstallAtOrgRegisterEventContractAndGenerateListener(
			{
				emitPayloadSchema: buildSchema({
					id: 'myNewEventEmitPayload',
					fields: {
						booleanField: {
							type: 'boolean',
						},
					},
				}),
				responsePayloadSchema: buildSchema({
					id: 'myNewEventResponsePayload',
					fields: {
						booleanField: {
							type: 'boolean',
						},
					},
				}),
			}
		)

		await this.openInVsCode()
	}

	private static async setupSkillsInstallAtOrgRegisterEventContractAndGenerateListener(
		eventSignature: EventSignature
	) {
		const eventContract = {
			eventSignatures: {
				'my-new-event': eventSignature,
			},
		}

		const {
			skillFixture,
			skill2,
			cli,
		} = await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		await skillFixture.registerEventContract(skill2, eventContract)

		const results = await cli.getFeature('event').Action('listen').execute({
			eventNamespace: skill2.slug,
			eventName: 'my-new-event',
		})

		assert.isFalsy(results.errors)

		const listener = testUtil.assertsFileByNameInGeneratedFiles(
			'my-new-event.listener.ts',
			results.files
		)

		await this.Service('typeChecker').check(listener)

		const contents = diskUtil.readFile(listener)

		return { contents, skill2, listenerPath: listener }
	}
}
