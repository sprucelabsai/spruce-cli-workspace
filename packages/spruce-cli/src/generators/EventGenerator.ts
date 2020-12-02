import pathUtil from 'path'
import { EventContract, eventContractUtil } from '@sprucelabs/mercury-types'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { EventListenerOptions } from '@sprucelabs/spruce-templates'
import AbstractGenerator from './AbstractGenerator'

export default class EventGenerator extends AbstractGenerator {
	public async generateContract(
		resolvedDestination: string,
		options: {
			contracts: EventContract[]
		}
	) {
		const eventContract = eventContractUtil.unifyContracts(options.contracts)

		const eventsContractContents = this.templates.eventsContract({
			eventContract: JSON.stringify(eventContract),
		})

		const results = await this.writeFileIfChangedMixinResults(
			resolvedDestination,
			eventsContractContents,
			`The event contract for communicating with Mercury.`
		)

		return results
	}

	public async generateListener(
		destinationDir: string,
		options: Omit<EventListenerOptions, 'nameConst'> & { version: string }
	) {
		const { eventName, eventNamespace, version } = options
		const filename = `${eventName}.listener.ts`

		const resolvedDestination = pathUtil.join(
			destinationDir,
			version,
			eventNamespace,
			filename
		)
		const listenerContents = this.templates.listener({
			...options,
			nameConst: namesUtil.toConst(`${eventNamespace}_${eventName}`),
		})

		const results = await this.writeFileIfChangedMixinResults(
			resolvedDestination,
			listenerContents,
			`Listener for  ${eventNamespace}.${eventName}.`
		)

		return results
	}
}
