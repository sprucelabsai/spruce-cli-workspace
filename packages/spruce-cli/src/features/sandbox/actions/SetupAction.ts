import { buildSchema } from '@sprucelabs/schema'
import setupVscodeSchema from '#spruce/schemas/spruceCli/v2020_07_22/setupVscodeOptions.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'setupSandboxOptions',
	name: 'Setup sandbox options',
	fields: {},
})

type OptionsSchema = typeof optionsSchema

export default class SetupAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'setup'
	public optionsSchema = setupVscodeSchema

	public async execute(): Promise<FeatureActionResponse> {
		const createListenerAction = this.getFeature('event').Action('listen')
		const results = await createListenerAction.execute({
			eventNamespace: 'skill',
			eventName: 'will-boot',
		})

		if (results.errors) {
			return results
		}

		const match = (results.files ?? []).find(
			(file) => file.name.search('will-boot') === 0
		)

		if (!match) {
			throw new Error('file was not generated')
		}

		await this.Writer('sandbox').writeDidBootListener(match.path)

		return results
	}
}
