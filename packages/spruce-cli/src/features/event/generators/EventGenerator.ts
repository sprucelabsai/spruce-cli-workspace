import pathUtil from 'path'
import { SchemaTemplateItem } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventListenerOptions,
} from '@sprucelabs/spruce-templates'
import AbstractGenerator from '../../../generators/AbstractGenerator'
import { GeneratedFile } from '../../../types/cli.types'
import { DEFAULT_SCHEMA_TYPES_FILENAME } from '../../schema/generators/SchemaGenerator'

const CONTRACT_FILE_NAME = `events.contract.ts`
export default class EventGenerator extends AbstractGenerator {
	public async generateContracts(
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
				this.generateContract({
					destinationDir,
					eventContractTemplateItem: item,
					schemaTemplateItems,
				})
			)
		}

		generated.push(
			this.generateCombinedEvents(destinationDir, eventContractTemplateItems)
		)

		const all = await Promise.all(generated)

		return all
	}

	private async generateContract(options: {
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
			namesUtil.toCamel(eventContractTemplateItem.namespace),
			`${eventContractTemplateItem.nameCamel}.contract.ts`
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

	private async generateCombinedEvents(
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

	public async generateListener(
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

		const resolvedDestination = pathUtil.join(
			destinationDir,
			version,
			eventNamespace,
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
