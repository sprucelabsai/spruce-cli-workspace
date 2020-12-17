import { EventContract, SpruceSchemas } from '@sprucelabs/mercury-types'
import { RegisterSkillOptions } from '../features/skill/stores/SkillStore'
import StoreFactory from '../stores/StoreFactory'
import {
	ApiClientFactory,
	ApiClientFactoryOptions,
} from '../types/apiClient.types'
import apiClientUtil from '../utilities/apiClient.utility'
import PersonFixture from './PersonFixture'

export default class SkillFixture {
	private storeFactory: StoreFactory
	private apiClientFactory: ApiClientFactory
	private personFixture: PersonFixture

	public constructor(
		personFixture: PersonFixture,
		storeFactory: StoreFactory,
		apiClientFactory: ApiClientFactory
	) {
		this.personFixture = personFixture
		this.storeFactory = storeFactory
		this.apiClientFactory = apiClientFactory
	}

	public async seedDummySkill(values: { name: string }) {
		return this.registerCurrentSkill(values, {
			isRegisteringCurrentSkill: false,
		})
	}

	public async registerCurrentSkill(
		values: { name: string; slug?: string },
		options?: RegisterSkillOptions
	) {
		await this.personFixture.loginAsDummyPerson()

		return this.storeFactory.Store('skill').register(
			{
				slug: values.slug ?? `my-skill-${new Date().getTime()}`,
				...values,
			},
			options
		)
	}

	public async registerEventContract(
		auth: ApiClientFactoryOptions | SpruceSchemas.Spruce.v2020_07_22.Skill,
		contract: EventContract
	) {
		const skillAuth = apiClientUtil.skillOrAuthToAuth(auth)
		const client = await this.apiClientFactory(skillAuth)

		const eventStore = this.storeFactory.Store('event', {
			apiClientFactory: async () => {
				return client
			},
		})

		await eventStore.registerEventContract({
			eventContract: contract,
		})
	}
}
