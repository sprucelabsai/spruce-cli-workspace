import { MercuryClient } from '@sprucelabs/mercury-client'
import { SkillEventContract, SpruceSchemas } from '@sprucelabs/mercury-types'

export type ApiClientFactoryOptions = SpruceSchemas.Mercury.v2020_12_25.AuthenticateEmitPayload & {
	shouldAuthAsCurrentSkill?: boolean
}
//@ts-ignore
export type ApiClient = MercuryClient<SkillEventContract>
export type ApiClientFactory = (
	options?: ApiClientFactoryOptions
) => Promise<ApiClient>
