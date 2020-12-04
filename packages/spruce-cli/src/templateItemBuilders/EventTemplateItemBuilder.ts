import {
	EventContract,
	eventContractUtil,
	EventSignature,
} from '@sprucelabs/mercury-types'
import { Schema, SchemaTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE, namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventSignatureTemplateItem,
} from '@sprucelabs/spruce-templates'
import SchemaTemplateItemBuilder from './SchemaTemplateItemBuilder'

export interface NamedEventSignature {
	eventNameWithOptionalNamespace: string
	eventName: string
	eventNamespace?: string
	signature: EventSignature
}

export default class EventTemplateItemBuilder {
	public generateTemplateItems(
		contracts: EventContract[]
	): EventContractTemplateItem[] {
		const items: EventContractTemplateItem[] = []

		for (const contract of contracts) {
			const contractItems = this.generateTemplateItemsForContract(contract)
			items.push(...contractItems)
		}

		return items
	}

	private generateTemplateItemsForContract(
		contract: EventContract
	): EventContractTemplateItem[] {
		const namedSignatures = eventContractUtil.getNamedEventSignatures(contract)

		const schemaItems: SchemaTemplateItem[] = this.mapEventSigsToSchemaTemplateItems(
			namedSignatures
		)

		const items: EventContractTemplateItem[] = []

		for (const namedSig of namedSignatures) {
			const namespacePascal = this.sigToNamespacePascal(namedSig)

			const signatureTemplateItem: EventSignatureTemplateItem = this.buildEventSigTemplateItem(
				namedSig,
				schemaItems
			)

			const item: EventContractTemplateItem = {
				nameCamel: namesUtil.toCamel(namedSig.eventName),
				namePascal: namesUtil.toPascal(namedSig.eventName),
				namespace: namesUtil.toKebab(namedSig.eventNamespace ?? CORE_NAMESPACE),
				namespaceCamel: namesUtil.toCamel(
					namedSig.eventNamespace ?? CORE_NAMESPACE
				),
				namespacePascal,
				eventSignatures: {
					[namedSig.eventNameWithOptionalNamespace]: signatureTemplateItem,
				},
			}

			items.push(item)
		}

		return items
	}

	private buildEventSigTemplateItem(
		namedSig: NamedEventSignature,
		schemaItems: SchemaTemplateItem[]
	) {
		const {
			emitPayloadSchema,
			responsePayloadSchema,
			...signature
		} = namedSig.signature

		const signatureTemplateItem: EventSignatureTemplateItem = { ...signature }

		if (emitPayloadSchema) {
			signatureTemplateItem.emitPayloadSchema = schemaItems.find(
				(i) => i.id === emitPayloadSchema.id
			)
		}

		if (responsePayloadSchema) {
			signatureTemplateItem.responsePayloadSchema = schemaItems.find(
				(i) => i.id === responsePayloadSchema.id
			)
		}
		return signatureTemplateItem
	}

	private mapEventSigsToSchemaTemplateItems(
		namedSignatures: NamedEventSignature[]
	) {
		const schemasByNamespace: Record<
			string,
			Schema[]
		> = this.mapEventSigsToSchemasByNampace(namedSignatures)

		const schemaTemplateItemBuilder = new SchemaTemplateItemBuilder('Cli')
		const schemaItems: SchemaTemplateItem[] = schemaTemplateItemBuilder.generateTemplateItems(
			schemasByNamespace,
			'#spruce/events'
		)
		return schemaItems
	}

	private mapEventSigsToSchemasByNampace(
		namedSignatures: NamedEventSignature[]
	) {
		const schemasByNamespace: Record<string, Schema[]> = {}

		for (const namedSig of namedSignatures) {
			const namespacePascal = this.sigToNamespacePascal(namedSig)
			const { emitPayloadSchema, responsePayloadSchema } = namedSig.signature

			if (!schemasByNamespace[namespacePascal]) {
				schemasByNamespace[namespacePascal] = []
			}

			if (emitPayloadSchema) {
				schemasByNamespace[namespacePascal].push(emitPayloadSchema)
			}

			if (responsePayloadSchema) {
				schemasByNamespace[namespacePascal].push(responsePayloadSchema)
			}
		}
		return schemasByNamespace
	}

	private sigToNamespacePascal(namedSig: NamedEventSignature) {
		return namesUtil.toPascal(namedSig.eventNamespace ?? CORE_NAMESPACE)
	}
}
