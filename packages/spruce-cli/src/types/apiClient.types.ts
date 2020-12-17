import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { EventContracts } from '#spruce/events/events.contract'

export type ApiClientFactoryOptions = SpruceSchemas.MercuryApi.AuthenticateEmitPayload
export type ApiClient = MercuryClient<EventContracts>
export type ApiClientFactory = (
	options?: ApiClientFactoryOptions
) => Promise<ApiClient>
