import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { MercuryClient } from '@sprucelabs/mercury-types'
import watcherDidDetectChangesEmitPayloadSchema from '#spruce/schemas/spruceCli/v2020_07_22/watcherDidDetectChangesEmitPayload.schema'

const contract = {
	eventSignatures: [
		{
			eventNameWithOptionalNamespace: 'watcher.did-detect-change',
			emitPayload: watcherDidDetectChangesEmitPayloadSchema,
		},
		{
			eventNameWithOptionalNamespace: 'skill.register-dashboard-widgets',
		},
	],
} as const

type CliContract = typeof contract
export type GlobalEmitter = MercuryClient<CliContract>

export default class CliGlobalEmitter extends AbstractEventEmitter<
	CliContract
> {
	public static Emitter() {
		return new CliGlobalEmitter(contract) as GlobalEmitter
	}
}
