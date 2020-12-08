import {
	EventContract,
	eventContractUtil,
	EventSignature,
} from '@sprucelabs/mercury-types'
import { Schema, SchemaTemplateItem } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventSignatureTemplateItem,
} from '@sprucelabs/spruce-templates'
import { MERCURY_API_NAMESPACE } from '../cli'
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
	): {
		eventContractTemplateItems: EventContractTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
	} {
		const eventContractTemplateItems: EventContractTemplateItem[] = []
		const schemaTemplateItems: SchemaTemplateItem[] = []

		for (const contract of contracts) {
			const {
				schemaTemplateItems: schemaItems,
				eventContractTemplateItems: contractItems,
			} = this.generateTemplateItemsForContract(contract)

			eventContractTemplateItems.push(...contractItems)
			schemaTemplateItems.push(...schemaItems)
		}

		return { eventContractTemplateItems, schemaTemplateItems }
	}

	private generateTemplateItemsForContract(
		contract: EventContract
	): {
		eventContractTemplateItems: EventContractTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
	} {
		const namedSignatures = eventContractUtil.getNamedEventSignatures(contract)

		const schemaTemplateItems: SchemaTemplateItem[] = this.mapEventSigsToSchemaTemplateItems(
			namedSignatures
		)

		const eventContractTemplateItems: EventContractTemplateItem[] = []

		for (const namedSig of namedSignatures) {
			const namespacePascal = this.sigToNamespacePascal(namedSig)

			const signatureTemplateItem: EventSignatureTemplateItem = this.buildEventSigTemplateItem(
				namedSig,
				schemaTemplateItems
			)

			const item: EventContractTemplateItem = {
				nameCamel: namesUtil.toCamel(namedSig.eventName),
				namePascal: namesUtil.toPascal(namedSig.eventName),
				namespace: namesUtil.toKebab(
					namedSig.eventNamespace ?? MERCURY_API_NAMESPACE
				),
				namespaceCamel: namesUtil.toCamel(
					namedSig.eventNamespace ?? MERCURY_API_NAMESPACE
				),
				imports: [
					signatureTemplateItem.emitPayloadSchema as SchemaTemplateItem,
					signatureTemplateItem.responsePayloadSchema as SchemaTemplateItem,
				]
					.filter((i) => !!i)
					.map((item: SchemaTemplateItem) => ({
						package: `#spruce/schemas/${namesUtil.toCamel(item.namespace)}/${
							item.nameCamel
						}.schema`,
						importAs: `${item.nameCamel}Schema`,
					})),
				namespacePascal,
				eventSignatures: {
					[namedSig.eventNameWithOptionalNamespace]: signatureTemplateItem,
				},
			}

			eventContractTemplateItems.push(item)
		}

		return {
			eventContractTemplateItems,
			schemaTemplateItems,
		}
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
		const schemaItems: SchemaTemplateItem[] = schemaTemplateItemBuilder.buildTemplateItems(
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
		return namesUtil.toPascal(namedSig.eventNamespace ?? MERCURY_API_NAMESPACE)
	}
}
