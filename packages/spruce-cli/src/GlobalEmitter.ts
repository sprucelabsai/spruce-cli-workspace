import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import {
	buildEventContract,
	MercuryEventEmitter,
} from '@sprucelabs/mercury-types'
import watcherDidDetectChangesEmitPayloadSchema from '#spruce/schemas/spruceCli/v2020_07_22/watcherDidDetectChangesEmitPayload.schema'

const contract = buildEventContract({
	eventSignatures: {
		'watcher.did-detect-change': {
			emitPayloadSchema: watcherDidDetectChangesEmitPayloadSchema,
		},
		'skill.register-dashboard-widgets': {},
	},
})

type CliContract = typeof contract
export type GlobalEmitter = MercuryEventEmitter<CliContract>

export default class CliGlobalEmitter extends AbstractEventEmitter<CliContract> {
	public static Emitter() {
		return new CliGlobalEmitter(contract) as GlobalEmitter
	}
}
