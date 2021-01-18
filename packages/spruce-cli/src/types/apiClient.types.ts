import { MercuryClient } from '@sprucelabs/mercury-client'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { EventContracts } from '#spruce/events/events.contract'

export type ApiClientFactoryOptions = SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitPayload & {
	shouldAuthAsCurrentSkill?: boolean
}
export type ApiClient = MercuryClient<EventContracts>
export type ApiClientFactory = (
	options?: ApiClientFactoryOptions
) => Promise<ApiClient>
