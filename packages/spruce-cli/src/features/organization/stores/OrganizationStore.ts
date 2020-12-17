import { eventResponseUtil } from '@sprucelabs/mercury-types'
import AbstractStore from '../../../stores/AbstractStore'

export default class OrganizationStore extends AbstractStore {
	public name = 'organization'

	public async isSkillInstalledAtOrg(skillId: string, orgId: string) {
		const client = await this.connectToApi()
		const results = await client.emit('is-skill-installed', {
			target: {
				organizationId: orgId,
			},
			payload: {
				skillId,
			},
		})

		const { isInstalled } = eventResponseUtil.getFirstResponseOrThrow(results)

		return isInstalled
	}

	public async installSkillAtOrg(skillId: string, orgId: any): Promise<void> {
		const client = await this.connectToApi()
		const results = await client.emit('install-skill', {
			target: {
				organizationId: orgId,
			},
			payload: {
				skillId,
			},
		})

		eventResponseUtil.getFirstResponseOrThrow(results)
	}

	public async getMyOrganizations() {
		const client = await this.connectToApi()
		const results = await client.emit('list-organizations', {
			payload: {
				showMineOnly: true,
			},
		})

		const { organizations } = eventResponseUtil.getFirstResponseOrThrow(results)

		return organizations
	}

	public async create(values: { name: string; slug?: string }) {
		const { name, slug } = values

		const client = await this.connectToApi()

		const results = await client.emit('create-organization', {
			payload: {
				name,
				slug,
			},
		})

		const { organization } = eventResponseUtil.getFirstResponseOrThrow(results)

		return organization
	}
}
