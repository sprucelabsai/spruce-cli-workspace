import { buildSchema } from '@sprucelabs/schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'testConversationOptions',
	fields: {},
})

type OptionsSchema = typeof optionsSchema
export default class TestAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'test'
	public optionsSchema = optionsSchema
	public commandAliases = ['test.conversation']

	public async execute(): Promise<FeatureActionResponse> {
		this.ui.clear()
		try {
			await this.Service('command').execute('yarn boot.local', {
				env: {
					ACTION: 'test.conversation',
				},
				shouldStream: true,
			})
			// eslint-disable-next-line no-empty
		} catch {}
		return {
			summaryLines: ['Talk soon! 👋'],
		}
	}
}
