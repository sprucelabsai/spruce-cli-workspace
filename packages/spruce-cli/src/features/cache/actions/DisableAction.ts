import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractAction from '../../AbstractAction'
import { FeatureActionResponse } from '../../features.types'
import { DISABLE_NPM_CACHE_COMMAND } from '../constants'

const optionsSchema = buildSchema({
	id: 'disableCacheAction',
	description: 'Disable caching.',
	fields: {},
})

type OptionsSchema = typeof optionsSchema
type Options = SchemaValues<OptionsSchema>

export default class DisableCacheAction extends AbstractAction<OptionsSchema> {
	public optionsSchema = optionsSchema
	public commandAliases = [
		'disable.cache',
		'stop.cache',
		'disable.caching',
		'stop.caching',
	]
	public invocationMessage = 'Disabling cache...'

	public async execute(_options: Options): Promise<FeatureActionResponse> {
		try {
			await this.Service('command').execute(DISABLE_NPM_CACHE_COMMAND)

			return {
				headline: 'Stopping cache',
				summaryLines: ['Shutting down cache!'],
			}
		} catch (err) {
			if (err.message?.toLowerCase()?.includes('no such container')) {
				return {
					errors: [
						new SpruceError({
							code: 'CACHE_NOT_ENABLED',
						}),
					],
				}
			}

			return {
				errors: [
					new SpruceError({
						code: 'MISSING_DEPENDENCIES',
						dependencies: [
							{
								name: 'Docker',
								hint: 'Get Docker here: https://www.docker.com/products/docker-desktop',
							},
						],
					}),
				],
			}
		}
	}
}
