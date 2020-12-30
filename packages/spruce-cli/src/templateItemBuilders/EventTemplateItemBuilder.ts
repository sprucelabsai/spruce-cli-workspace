import { EventContract, EventSignature } from '@sprucelabs/mercury-types'
import { Schema, SchemaTemplateItem } from '@sprucelabs/schema'
import {
	eventContractUtil,
	NamedEventSignature,
} from '@sprucelabs/spruce-event-utils'
import {
	MERCURY_API_NAMESPACE,
	namesUtil,
} from '@sprucelabs/spruce-skill-utils'
import {
	EventContractTemplateItem,
	EventSignatureTemplateItem,
} from '@sprucelabs/spruce-templates'
import SpruceError from '../errors/SpruceError'
import SchemaTemplateItemBuilder from './SchemaTemplateItemBuilder'

export interface NamedEventSignature {
	eventNameWithOptionalNamespace: string
	eventName: string
	eventNamespace?: string
	version: string
	signature: EventSignature
}

export default class EventTemplateItemBuilder {
	public buildTemplateItems(
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
			} = this.buildTemplateItemsForContract(contract)

			eventContractTemplateItems.push(...contractItems)
			schemaTemplateItems.push(...schemaItems)
		}

		return { eventContractTemplateItems, schemaTemplateItems }
	}

	public buildEventTemplateItemForName(
		contracts: EventContract[],
		eventNameWithOptionalNamespace: string
	): {
		responsePayloadSchemaTemplateItem: SchemaTemplateItem | undefined
		emitPayloadSchemaTemplateItem: SchemaTemplateItem | undefined
	} {
		for (const contract of contracts) {
			const namedSignatures = eventContractUtil.getNamedEventSignatures(
				contract
			)

			for (const namedSig of namedSignatures) {
				if (
					namedSig.eventNameWithOptionalNamespace ===
					eventNameWithOptionalNamespace
				) {
					const schemaTemplateItems: SchemaTemplateItem[] = this.mapEventSigsToSchemaTemplateItems(
						namedSignatures
					)

					const signatureTemplateItem: EventSignatureTemplateItem = this.buildEventSigTemplateItem(
						namedSig,
						schemaTemplateItems
					)

					return {
						emitPayloadSchemaTemplateItem:
							signatureTemplateItem.emitPayloadSchema,
						responsePayloadSchemaTemplateItem:
							signatureTemplateItem.responsePayloadSchema,
					}
				}
			}
		}

		throw new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['eventNameWithOptionalNamespace'],
		})
	}

	private buildTemplateItemsForContract(
		contract: EventContract
	): {
		eventContractTemplateItems: EventContractTemplateItem[]
		schemaTemplateItems: SchemaTemplateItem[]
	} {
		const namedSignatures = eventContractUtil.getNamedEventSignatures(contract)

		const schemaTemplateItems: SchemaTemplateItem[] = this.mapEventSigsToSchemaTemplateItems(
			namedSignatures
		)

		debugger

		const eventContractTemplateItems: EventContractTemplateItem[] = []

		for (const namedSig of namedSignatures) {
			const item: EventContractTemplateItem = this.buildTemplateItemForEventSignature(
				namedSig,
				schemaTemplateItems
			)

			eventContractTemplateItems.push(item)
		}

		return {
			eventContractTemplateItems,
			schemaTemplateItems,
		}
	}

	private buildTemplateItemForEventSignature(
		namedSig: NamedEventSignature,
		schemaTemplateItems: SchemaTemplateItem[]
	) {
		const namespacePascal = this.sigToNamespacePascal(namedSig)

		const signatureTemplateItem: EventSignatureTemplateItem = this.buildEventSigTemplateItem(
			namedSig,
			schemaTemplateItems
		)

		const item: EventContractTemplateItem = {
			nameCamel: namesUtil.toCamel(namedSig.eventName),
			namePascal: namesUtil.toPascal(namedSig.eventName),
			version: namedSig.version ?? '***MISSING***',
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
		return item
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
				schemasByNamespace[namespacePascal].push({
					version: namedSig.version,
					...emitPayloadSchema,
				})
			}

			if (responsePayloadSchema) {
				schemasByNamespace[namespacePascal].push({
					version: namedSig.version,
					...responsePayloadSchema,
				})
			}
		}

		return schemasByNamespace
	}

	private sigToNamespacePascal(namedSig: NamedEventSignature) {
		return namesUtil.toPascal(namedSig.eventNamespace ?? MERCURY_API_NAMESPACE)
	}
}
