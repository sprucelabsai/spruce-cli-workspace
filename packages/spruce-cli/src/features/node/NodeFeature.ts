import { buildSchema, ISchema, SchemaValues } from '@sprucelabs/schema'
import { diskUtil, namesUtil } from '@sprucelabs/spruce-skill-utils'
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

type NodeFeatureSchema = typeof nodeFeatureSchema

export default class NodeFeature<
	S extends NodeFeatureSchema = NodeFeatureSchema
> extends AbstractFeature<S> {
	public code: FeatureCode = 'node'
	public nameReadable = 'Node'
	public description = 'Get a fresh node module started!'
	public dependencies: FeatureDependency[] = []
	public optionsDefinition = nodeFeatureSchema as S
	public packageDependencies = [
		{ name: 'typescript', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'tsconfig-paths', isDev: true },
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async beforePackageInstall() {
		await this.Service('command').execute('yarn init -y')

		const nodeGenerator = this.Generator('node')
		const files = await nodeGenerator.generateNodeModule(this.cwd)

		return { files }
	}

	public async afterPackageInstall(
		options: S extends ISchema ? SchemaValues<S> : undefined
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