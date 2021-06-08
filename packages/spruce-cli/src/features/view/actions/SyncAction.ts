import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { ViewControllerImport } from '../../../../../spruce-templates/build'
import introspectionUtil from '../../../utilities/introspection.utility'
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
		const targetDir = diskUtil.resolvePath(this.cwd, 'src')
		const matches = await globby(['**/*.svc.ts', '**/*.vc.ts'], {
			cwd: targetDir,
		})

		if (matches.length === 0) {
			return {}
		}

		const paths = matches.map((m) => diskUtil.resolvePath(targetDir, m))
		const introspect = introspectionUtil.introspect(paths)

		const imports = introspect.reduce<ViewControllerImport[]>((classes, i) => {
			classes.push(
				...i.classes.map((c) => ({
					namePascal: c.className,
					path: c.classPath,
				}))
			)

			return classes
		}, [])

		const files = await this.Writer('view').writeCombinedViewsFile(this.cwd, {
			imports,
		})

		return {
			files,
		}
	}
}
