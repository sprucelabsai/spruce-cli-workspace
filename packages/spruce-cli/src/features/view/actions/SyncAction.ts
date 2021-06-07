import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import AbstractAction from '../../AbstractAction'
import { FeatureActionResponse } from '../../features.types'

const optionsSchema = buildSchema({
	id: 'syncViewsOptions',
	description: 'Keep types and generated files based on views in sync.',
	fields: {},
})

type OptionsSchema = typeof optionsSchema

export default class syncAction extends AbstractAction<OptionsSchema> {
	public code = 'sync'
	public optionsSchema: OptionsSchema = optionsSchema
	public commandAliases = ['create.view']
	public invocationMessage = 'Creating your new view controller... 🌲'

	public async execute(
		_options: SchemaValues<OptionsSchema>
	): Promise<FeatureActionResponse> {
		const matches = await globby(['**/*.svc.ts', '**/*.vc.ts'], {
			cwd: diskUtil.resolvePath(this.cwd, 'src'),
		})

		if (matches.length === 0) {
			return {}
		}

		const files = await this.Writer('view').writeCombinedViewsFile(this.cwd)

		return {
			files,
		}
	}
}
