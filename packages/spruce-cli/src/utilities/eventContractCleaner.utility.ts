import { EventContract } from '@sprucelabs/mercury-types'
import { eventContractUtil } from '@sprucelabs/spruce-event-utils'

export const eventContractCleanerUtil = {
	cleanPayloads(contract: EventContract): EventContract {
		debugger
		const cleaned: EventContract = {
			eventSignatures: {},
		}

		const signatures = eventContractUtil.getNamedEventSignatures(contract)

		for (const sig of signatures) {
			const cleanedSig = {
				...sig.signature,
			}

			if (cleanedSig.isGlobal) {
				delete cleanedSig.emitPayloadSchema?.fields?.target
			}

			if (
				cleanedSig.emitPayloadSchema?.fields &&
				Object.keys(cleanedSig.emitPayloadSchema?.fields).length === 0
			) {
				delete cleanedSig.emitPayloadSchema
			}

			if (
				cleanedSig.responsePayloadSchema?.fields &&
				Object.keys(cleanedSig.responsePayloadSchema?.fields).length === 0
			) {
				delete cleanedSig.responsePayloadSchema
			}

			cleaned.eventSignatures[sig.fullyQualifiedEventName] = cleanedSig
		}

		return cleaned
	},
}
