import { buildSchema, Schema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
import { FileDescription } from '../../types/cli.types'
import AbstractFeature, { FeatureDependency } from '../AbstractFeature'
import { FeatureCode } from '../features.types'

const nodeFeatureSchema = buildSchema({
	id: 'nodeFeature',
	name: 'Node feature options',
	fields: {
		name: {
			type: 'text',
			isRequired: true,
			label: "What's the name of your module?",
		},
		description: {
			type: 'text',
			isRequired: true,
			label: 'How would you describe your module?',
		},
	},
})

type OptionsSchema = typeof nodeFeatureSchema

declare module '../../features/features.types' {
	interface FeatureMap {
		node: NodeFeature
	}

	interface FeatureOptionsMap {
		node: SchemaValues<OptionsSchema>
	}
}

export default class NodeFeature<
	S extends OptionsSchema = OptionsSchema
> extends AbstractFeature<S> {
	public code: FeatureCode = 'node'
	public nameReadable = 'nodejs support'
	public description = ''
	public dependencies: FeatureDependency[] = []
	public optionsSchema = nodeFeatureSchema as S
	public packageDependencies = [
		{ name: 'typescript', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'tsconfig-paths', isDev: true },
	]
	public readonly fileDescriptions: FileDescription[] = [
		{
			path: 'tsconfig.json',
			description: 'For mapping #spruce dirs.',
			shouldOverwriteWhenChanged: true,
		},
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async beforePackageInstall() {
		if (!diskUtil.doesDirExist(this.cwd)) {
			diskUtil.createDir(this.cwd)
		}

		await this.Service('command').execute('yarn init -y')

		const nodeWriter = this.Writer('node')
		const files = await nodeWriter.writeNodeModule(this.cwd)

		return { files }
	}

	public async afterPackageInstall(
		options: S extends Schema ? SchemaValues<S> : undefined
	) {
		const pkg = this.Service('pkg')
		pkg.set({ path: 'name', value: namesUtil.toKebab(options.name) })
		pkg.set({ path: 'description', value: options.description })
		pkg.set({ path: 'version', value: '0.0.1' })

		pkg.unset('main')
		pkg.unset('license')

		return {}
	}

	public isInstalled = async (): Promise<boolean> => {
		return diskUtil.doesFileExist(
			diskUtil.resolvePath(this.cwd, 'package.json')
		)
	}
}
