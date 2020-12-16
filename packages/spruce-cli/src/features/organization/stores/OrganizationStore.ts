import { eventResponseUtil } from '@sprucelabs/mercury-types'
import AbstractStore from '../../../stores/AbstractStore'

export default class OrganizationStore extends AbstractStore {
	public name = 'organization'

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
