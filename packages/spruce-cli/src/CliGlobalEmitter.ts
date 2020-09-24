import { AbstractEventEmitter } from '@sprucelabs/mercury-event-emitter'
import { MercuryClient } from '@sprucelabs/mercury-types'

const contract = {
	eventSignatures: [
		{
			eventNameWithOptionalNamespace: 'watcher.did-detect-change',
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
