import { coreEventContracts } from '@sprucelabs/mercury-types'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { eventContractCleanerUtil } from '../../utilities/eventContractCleaner.utility'

const didMessageContract = {
	eventSignatures: {
		'did-message::v2020_12_25':
			coreEventContracts[0].eventSignatures['did-message::v2020_12_25'],
	},
}

const didMessageGlobalContract = {
	eventSignatures: {
		'did-message::v2020_12_25': {
			...coreEventContracts[0].eventSignatures['did-message::v2020_12_25'],
			isGlobal: true,
		},
	},
}

const didMessageGlobalContractWithoutPayload = {
	eventSignatures: {
		'did-message::v2020_12_25': {
			...coreEventContracts[0].eventSignatures['did-message::v2020_12_25'],
			isGlobal: true,
			emitPayloadSchema: {
				...coreEventContracts[0].eventSignatures['did-message::v2020_12_25']
					.emitPayloadSchema,
				fields: {
					target:
						coreEventContracts[0].eventSignatures['did-message::v2020_12_25']
							.emitPayloadSchema.fields.payload,
				},
			},
		},
	},
}

export default class EventContractCleanerUtilTest extends AbstractSpruceTest {
	@test()
	protected static async canGetEventContractCleanerUtil() {
		assert.isTruthy(eventContractCleanerUtil)
	}

	@test()
	protected static async makesNoChangeToLocalContract() {
		const cleaned =
			eventContractCleanerUtil.cleanPayloadsAndPermissions(didMessageContract)

		assert.isEqualDeep(cleaned, didMessageContract)
	}

	@test()
	protected static async stripsOutTagetForGlobal() {
		const cleaned = eventContractCleanerUtil.cleanPayloadsAndPermissions(
			didMessageGlobalContract
		)

		assert.isFalsy(
			cleaned.eventSignatures['did-message::v2020_12_25']?.emitPayloadSchema
				?.fields?.target
		)
	}

	@test()
	protected static async stripsOutEntireEmitPayloadIfNoTargetNorPayload() {
		const cleaned = eventContractCleanerUtil.cleanPayloadsAndPermissions(
			didMessageGlobalContractWithoutPayload
		)

		assert.isFalsy(
			cleaned.eventSignatures['did-message::v2020_12_25']?.emitPayloadSchema
		)
	}
}
