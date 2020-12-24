import { EventContract, EventSignature } from '@sprucelabs/mercury-types'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'

export interface EventStoreFetchEventContractsResponse {
	errors: SpruceError[]
	contracts: EventContract[]
}

export default class EventStore extends AbstractStore {
	public name = 'event'

	public async fetchEventContracts(): Promise<EventStoreFetchEventContractsResponse> {
		const client = await this.connectToApi({ authAsCurrentSkill: true })

		const results = await client.emit('get-event-contracts')
		const { contracts } = eventResponseUtil.getFirstResponseOrThrow(results)

		const localContract = await this.loadLocalContract()

		if (localContract) {
			contracts.push(localContract)
		}

		return {
			contracts,
			errors: [],
		}
	}

	public async loadLocalContract() {
		const localMatches = await globby(
			diskUtil.resolvePath(this.cwd, 'src', 'events', '**/*.builder.ts')
		)

		const eventSignatures: EventSignature[] = []
		debugger
		await Promise.all(
			localMatches.map(async (match: string) => {
				debugger
			})
		)

		debugger
		if (eventSignatures.length > 0) {
		}

		return null
	}

	public async registerEventContract(options: {
		eventContract: EventContract
	}) {
		const client = await this.connectToApi({ authAsCurrentSkill: true })

		const results = await client.emit('register-events', {
			payload: {
				contract: options.eventContract,
			},
		})

		eventResponseUtil.getFirstResponseOrThrow(results)
	}
}
