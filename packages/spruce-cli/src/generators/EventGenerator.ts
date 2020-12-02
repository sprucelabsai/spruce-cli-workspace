import pathUtil from 'path'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventListenerOptions,
} from '@sprucelabs/spruce-templates'
import { GeneratedFile } from '../types/cli.types'
import AbstractGenerator from './AbstractGenerator'

export default class EventGenerator extends AbstractGenerator {
	public async generateContracts(
		destinationDir: string,
		options: {
			templateItems: EventContractTemplateItem[]
		}
	) {
		const { templateItems } = options

		const generated: Promise<GeneratedFile>[] = []

		for (const item of templateItems) {
			generated.push(this.generateContract(destinationDir, item))
		}

		const all = await Promise.all(generated)

		return all
	}

	private async generateContract(
		destinationDir: string,
		templateItem: EventContractTemplateItem
	): Promise<GeneratedFile> {
		const destinationFile = diskUtil.resolvePath(
			destinationDir,
			`${templateItem.nameCamel}.contract.ts`
		)
		const eventsContractContents = this.templates.eventContract(templateItem)

		const results = await this.writeFileIfChangedMixinResults(
			destinationFile,
			eventsContractContents,
			`The event contract for ${templateItem}`
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
