import { IMercuryEventContract } from '@sprucelabs/mercury'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'

export const SpruceEvents = {
	Local: {
		ListEvents: 'list-events',
		TestThings: 'test-things'
	}
} as const

export interface IMyEventContract extends IMercuryEventContract {
	'list-events': {
		emitPayload: SpruceSchemas.Local.IListEventsEmitPayload
		responsePayload: SpruceSchemas.Local.IListEventsResponsePayload
	}
	'test-things': {
		emitPayload: SpruceSchemas.Local.ITestThingsEmitPayload
		responsePayload: SpruceSchemas.Local.ITestThingsResponsePayload
	}
}
