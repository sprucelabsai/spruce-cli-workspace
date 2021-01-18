import {
	eventContractUtil,
	eventNameUtil,
} from '@sprucelabs/spruce-event-utils'
import { namesUtil, versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../tests/AbstractEventTest'
import testUtil from '../../tests/utilities/test.utility'

const EVENT_NAME_READABLE = 'did book appointment'
const EVENT_NAME = 'did-book-appointment'
const EVENT_CAMEL = 'didBookAppointment'

export default class RegisteringEventsOnBootTest extends AbstractEventTest {
	@test()
	protected static async registeringEventsOnBoot() {
		const {
			cli,
			skill2,
			currentSkill,
		} = await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()
		testUtil.log('installed skill and org')
		await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})
		testUtil.log('booting')
		const boot = await cli
			.getFeature('skill')
			.Action('boot')
			.execute({ local: true })

		testUtil.log('done booting, holding for 10 seconds')
		await this.wait(10000)
		boot.meta?.kill()

		testUtil.log('killed skill, connecting to api')
		const client = await this.connectToApi({
			skillId: skill2.id,
			apiKey: skill2.apiKey,
		})

		testUtil.log('fetching event contracts')
		const { contracts } = await this.Store('event', {
			apiClientFactory: async () => client,
		}).fetchEventContracts()
		testUtil.log('fetched events contrcats')
		const version = versionUtil.generateVersion().constValue
		const name = eventNameUtil.join({
			eventNamespace: currentSkill.slug,
			eventName: EVENT_NAME,
			version,
		})

		testUtil.log('doing checks')
		assert.isLength(contracts, 2)
		const namespace = namesUtil.toPascal(currentSkill.slug)
		const sig = eventContractUtil.getSignatureByName(contracts[1], name)

		assert.isEqualDeep(sig, {
			emitPayloadSchema: {
				id: 'didBookAppointmentEmitTargetAndPayload',
				version,
				namespace,
				name: '',
				fields: {
					target: {
						type: 'schema',
						isRequired: true,
						options: {
							schema: {
								id: 'eventTarget',
								version,
								namespace,
								name: '',
								fields: {
									locationId: { type: 'id' },
									personId: { type: 'id' },
									organizationId: { type: 'id' },
									skillId: { type: 'id' },
								},
							},
						},
					},
				},
			},
			responsePayloadSchema: {
				id: 'didBookAppointmentResponsePayload',
				version,
				namespace,
				name: '',
				fields: {},
			},
			emitPermissionContract: {
				id: 'didBookAppointmentEmitPermissions',
				name: 'did book appointment',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-high-five',
						name: 'Can give high five',
						description: 'Will this person be allowed to high five?',
						requireAllStatuses: false,
					},
				],
			},
			listenPermissionContract: {
				id: 'didBookAppointmentListenPermissions',
				name: 'did book appointment',
				requireAllPermissions: false,
				permissions: [
					{
						id: 'can-high-five',
						name: 'Can give high five',
						description: 'Will this person be allowed to high five?',
						requireAllStatuses: false,
					},
				],
			},
		})
	}
}
