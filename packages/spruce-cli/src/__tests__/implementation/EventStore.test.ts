import {
	eventContractUtil,
	validateEventContract,
} from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class EventStoreTest extends AbstractCliTest {
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
		const results = await this.Store('event').fetchEventContracts()
		const { contracts, errors } = results

		assert.isAbove(contracts.length, 0)

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
					'my-fantastic-event': {},
				},
			},
		})

		const { contracts } = await eventStore2.fetchEventContracts()

		assert.isLength(contracts, 2)
		const skillContract = contracts[1]

		eventContractUtil.getSignatureByName(
			skillContract,
			`${skill1.slug}.my-fantastic-event`
		)
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
