import {
	buildPermissionContract,
	validateEventContract,
} from '@sprucelabs/mercury-types'
import {
	eventContractUtil,
	eventNameUtil,
} from '@sprucelabs/spruce-event-utils'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

const EVENT_NAME_READABLE = 'my fantastically amazing event'
const EVENT_NAME = 'my-fantastically-amazing-event'
const EVENT_CAMEL = 'myFantasticallyAmazingEvent'

export default class EventStoreTest extends AbstractCliTest {
	protected static get version() {
		return versionUtil.generateVersion()
	}
	@test()
	protected static async canInstantiateEventStore() {
		assert.isTruthy(this.Store('event'))
	}

	@test()
	protected static async hasFetchEventContractsMethod() {
		assert.isFunction(this.Store('event').fetchEventContracts)
	}

	@test()
	protected static async fetchesEventContracts() {
		const results = await this.Store('event').fetchEventContracts({
			localNamespace: 'my-skill',
		})
		const { contracts, errors } = results

		assert.isLength(contracts, 1)

		for (const contract of contracts) {
			validateEventContract(contract)
		}

		assert.isEqual(errors.length, 0)
	}

	@test()
	protected static async registerEventContract() {
		const organizationFixture = this.OrganizationFixture()
		const org = await organizationFixture.seedDummyOrg({
			name: 'my new org',
		})

		const {
			eventStore: eventStore1,
			skill: skill1,
		} = await this.seedSkillAndInstallAtOrg(org, 'skill 1')

		const { eventStore: eventStore2 } = await this.seedSkillAndInstallAtOrg(
			org,
			'skill 2'
		)

		await eventStore1.registerEventContract({
			eventContract: {
				eventSignatures: {
					[`my-fantastic-event::${this.version.constValue}`]: {
						emitPermissionContract: buildPermissionContract({
							id: 'my-fantastic-event-contract',
							name: 'Fanstastic emit perms',
							permissions: [
								{
									id: 'can-emit-perms',
									name: 'can emit perm',
									can: {
										default: true,
									},
								},
							],
						}),
					},
				},
			},
		})

		const { contracts } = await eventStore2.fetchEventContracts({
			localNamespace: 'my-skill',
		})

		assert.isLength(contracts, 2)
		const skillContract = contracts[1]

		const sig = eventContractUtil.getSignatureByName(
			skillContract,
			`${skill1.slug}.my-fantastic-event::${this.version.constValue}`
		)

		assert.isEqual(
			sig.emitPermissionContract?.id,
			'my-fantastic-event-contract'
		)
	}

	@test()
	protected static async mixesInLocalContracts() {
		this.log('copy cached')
		const cli = await this.FeatureFixture().installCachedFeatures('events')
		this.log('DONE copy cached')

		this.log('registering skill')
		const skill = await this.SkillFixture().registerCurrentSkill({
			name: 'my new skill',
		})
		this.log('done registering skill')

		this.log('creating event')
		await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		this.log('done creating event')
		this.log('fetching event contract')

		const { contracts } = await this.Store('event').fetchEventContracts({
			localNamespace: skill.slug,
		})

		this.log('done fetching event contract')

		this.log('doing checks')
		assert.isLength(contracts, 2)
		const name = eventNameUtil.join({
			eventName: EVENT_NAME,
			eventNamespace: skill.slug,
			version: this.version.constValue,
		})

		assert.isTruthy(contracts[1].eventSignatures[name].emitPayloadSchema)
		assert.isEqual(
			contracts[1].eventSignatures[name].emitPayloadSchema?.id,
			EVENT_CAMEL + 'EmitTargetAndPayload'
		)
		assert.isTruthy(
			contracts[1].eventSignatures[name].emitPayloadSchema?.fields?.target
		)
		assert.isFalsy(
			contracts[1].eventSignatures[name].emitPayloadSchema?.fields?.payload
		)
		assert.isTruthy(contracts[1].eventSignatures[name].responsePayloadSchema)
		assert.isTruthy(contracts[1].eventSignatures[name].emitPermissionContract)
		assert.isTruthy(contracts[1].eventSignatures[name].listenPermissionContract)

		validateEventContract(contracts[1])
		this.log('done doing checks')
	}

	private static async seedSkillAndInstallAtOrg(org: any, name: string) {
		const skill = await this.SkillFixture().seedDummySkill({
			name,
		})

		await this.OrganizationFixture().installSkillAtOrganization(
			skill.id,
			org.id
		)

		const client = await this.connectToApi({
			skillId: skill.id,
			apiKey: skill.apiKey,
		})

		const eventStore = this.Store('event', {
			apiClientFactory: async () => {
				return client
			},
		})

		return { eventStore, skill }
	}
}
