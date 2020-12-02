import { EventContract, eventContractUtil } from '@sprucelabs/mercury-types'
import { CORE_NAMESPACE, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { EventContractTemplateItem } from '@sprucelabs/spruce-templates'

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
		const items: EventContractTemplateItem[] = []

		for (const namedSig of namedSignatures) {
			const item: EventContractTemplateItem = {
				nameCamel: namesUtil.toCamel(namedSig.eventName),
				namePascal: namesUtil.toPascal(namedSig.eventName),
				namespace: namedSig.eventNamespace ?? CORE_NAMESPACE,
				eventSignatures: {
					[namedSig.eventNameWithOptionalNamespace]: namedSig.signature,
				},
			}

			items.push(item)
		}

		return items
	}
}
