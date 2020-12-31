import pathUtil from 'path'
import { SchemaTemplateItem } from '@sprucelabs/schema'
import {
	diskUtil,
	namesUtil,
	DEFAULT_SCHEMA_TYPES_FILENAME,
} from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventListenerOptions,
} from '@sprucelabs/spruce-templates'
import { GeneratedFile } from '../../../types/cli.types'
import AbstractWriter from '../../../writers/AbstractWriter'

const CONTRACT_FILE_NAME = `events.contract.ts`
export default class EventWriter extends AbstractWriter {
	public async writeContracts(
		destinationDir: string,
		options: {
			eventContractTemplateItems: EventContractTemplateItem[]
			schemaTemplateItems: SchemaTemplateItem[]
		}
	) {
		const { eventContractTemplateItems, schemaTemplateItems } = options

		const generated: Promise<GeneratedFile>[] = []

		for (const item of eventContractTemplateItems) {
			generated.push(
				this.writeContract({
					destinationDir,
					eventContractTemplateItem: item,
					schemaTemplateItems,
				})
			)
		}

		generated.push(
			this.writeCombinedEvents(destinationDir, eventContractTemplateItems)
		)

		const all = await Promise.all(generated)

		return all
	}

	private async writeContract(options: {
		destinationDir: string
		eventContractTemplateItem: EventContractTemplateItem
		schemaTemplateItems: SchemaTemplateItem[]
	}): Promise<GeneratedFile> {
		const {
			destinationDir,
			eventContractTemplateItem,
			schemaTemplateItems,
		} = options

		const destinationFile = diskUtil.resolvePath(
			destinationDir,
			eventContractTemplateItem.namespaceCamel,
			`${eventContractTemplateItem.nameCamel}.${eventContractTemplateItem.version}.contract.ts`
		)

		const eventsContractContents = this.templates.eventContract({
			...eventContractTemplateItem,
			schemaTemplateItems,
		})

		const results = await this.writeFileIfChangedMixinResults(
			destinationFile,
			eventsContractContents,
			`The event contract for ${
				Object.keys(eventContractTemplateItem.eventSignatures)[0]
			}`
		)

		return results[0]
	}

	private async writeCombinedEvents(
		destinationDir: string,
		templateItems: EventContractTemplateItem[]
	): Promise<GeneratedFile> {
		const destinationFile = diskUtil.resolvePath(
			destinationDir,
			CONTRACT_FILE_NAME
		)

		const contents = this.templates.combinedEventsContract(templateItems)

		const results = await this.writeFileIfChangedMixinResults(
			destinationFile,
			contents,
			'All event contracts combined to a single export.'
		)

		return results[0]
	}

	public async writeListener(
		destinationDir: string,
		options: Omit<
			EventListenerOptions,
			'nameConst' | 'schemaTypesFile' | 'contractsFile'
		> & {
			version: string
			schemaTypesLookupDir: string
			contractDestinationDir: string
		}
	) {
		const {
			eventName,
			eventNamespace,
			version,
			schemaTypesLookupDir,
			contractDestinationDir,
		} = options
		const filename = `${eventName}.listener.ts`

		debugger

		const resolvedDestination = pathUtil.join(
			destinationDir,
			eventNamespace,
			version,
			filename
		)

		const relativeTypesFile = this.resolveSchemaTypesFile(
			schemaTypesLookupDir,
			resolvedDestination
		)

		const contractsFile = pathUtil.join(
			contractDestinationDir,
			CONTRACT_FILE_NAME.replace('.ts', '')
		)

		const listenerContents = this.templates.listener({
			...options,
			nameConst: namesUtil.toConst(`${eventNamespace}_${eventName}`),
			schemaTypesFile: relativeTypesFile,
			contractsFile,
		})

		const results = await this.writeFileIfChangedMixinResults(
			resolvedDestination,
			listenerContents,
			`Listener for  ${eventNamespace}.${eventName}.`
		)

		return results
	}

	private resolveSchemaTypesFile(
		schemaTypesLookupDir: string,
		resolvedDestination: string
	) {
		const schemaTypesFile = pathUtil.join(
			schemaTypesLookupDir,
			DEFAULT_SCHEMA_TYPES_FILENAME
		)

		let relativeTypesFile = pathUtil.relative(
			pathUtil.dirname(resolvedDestination),
			schemaTypesFile
		)

		relativeTypesFile = relativeTypesFile.replace(
			pathUtil.extname(relativeTypesFile),
			''
		)

		return relativeTypesFile
	}
}
