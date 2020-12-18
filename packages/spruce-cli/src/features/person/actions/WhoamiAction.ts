import { buildSchema } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'whoAmI',
	fields: {},
})

type OptionsSchema = typeof optionsSchema

export default class WhoAmIAction extends AbstractFeatureAction<OptionsSchema> {
	public name = 'whoami'
	public optionsSchema: OptionsSchema = optionsSchema

	public async execute(): Promise<FeatureActionResponse> {
		const client = await this.connectToApi()

		const results = await client.emit('who-am-i')
		const { type, auth } = eventResponseUtil.getFirstResponseOrThrow(results)

		const summaryLines: string[] = []

		if (type === 'anonymous') {
			summaryLines.push('You are not logged in.')
		} else if (auth.person) {
			summaryLines.push(`You are logged in as a person.`)
			summaryLines.push(`Name: ${auth.person.casualName}`)
		}

		return {
			summaryLines,
		}
	}
}
