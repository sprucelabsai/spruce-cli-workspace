import pathUtil from 'path'
import { EventContract, eventContractUtil } from '@sprucelabs/mercury-types'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { EventListenerOptions } from '@sprucelabs/spruce-templates'
import { GeneratedFile } from '../types/cli.types'
import AbstractGenerator from './AbstractGenerator'

export default class EventGenerator extends AbstractGenerator {
	public async generateContracts(
		destinationDir: string,
		options: {
			contracts: EventContract[]
		}
	) {
		const { contracts } = options

		const generated: Promise<GeneratedFile>[] = []

		for (const contract of contracts) {
			const signatures = eventContractUtil.getNamedEventSignatures(contract)
			for (const namedSig of signatures) {
				const destination = diskUtil.resolvePath(
					destinationDir,
					namesUtil.toCamel(namedSig.eventNameWithOptionalNamespace) +
						'.contract.ts'
				)

				generated.push(
					this.generateContract(destination, {
						eventSignatures: {
							[namedSig.eventNameWithOptionalNamespace]: namedSig.signature,
						},
					})
				)
			}
		}

		const all = await Promise.all(generated)

		return all
	}

	private async generateContract(
		destinationFile: string,
		contract: EventContract
	): Promise<GeneratedFile> {
		const eventsContractContents = this.templates.eventContract({
			eventContract: JSON.stringify(contract),
		})

		const results = await this.writeFileIfChangedMixinResults(
			destinationFile,
			eventsContractContents,
			`The event contract for ${contract}`
		)

		return results[0]
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
