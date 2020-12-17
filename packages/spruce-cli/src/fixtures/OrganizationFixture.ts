import OrganizationStore from '../features/organization/stores/OrganizationStore'
import PersonFixture from './PersonFixture'

export default class OrganizationFixture {
	private store: OrganizationStore
	private personFixture: PersonFixture

	public constructor(
		organizationStore: OrganizationStore,
		personFixture: PersonFixture
	) {
		this.store = organizationStore
		this.personFixture = personFixture
	}

	public async seedDummyOrg(options: { name: string; slug?: string }) {
		await this.personFixture.loginAsDummyPerson()

		return this.store.create({
			slug: `my-org-${new Date().getTime()}`,
			...options,
		})
	}

	public async clearAllOrgs() {
		await this.personFixture.loginAsDummyPerson()

		const orgs = await this.store.fetchMyOrganizations()

		for (const org of orgs) {
			await this.store.deleteOrganization(org.id)
		}
	}
}
