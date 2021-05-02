import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractFeature, {
	FeatureDependency,
	FeatureOptions,
} from '../AbstractFeature'
import { FeatureCode } from '../features.types'

declare module '../../features/features.types' {
	interface FeatureMap {
		store: StoreFeature
	}
}

export default class StoreFeature extends AbstractFeature {
	public nameReadable = 'Data Stores'
	public description = 'For working with remote places of storage.'
	public code: FeatureCode = 'store'
	public dependencies: FeatureDependency[] = [
		{
			code: 'skill',
			isRequired: true,
		},
	]
	public packageDependencies = [
		{ name: '@sprucelabs/spruce-store-plugin', isDev: false },
		{ name: '@sprucelabs/data-stores', isDev: false },
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public constructor(options: FeatureOptions) {
		super(options)

		void this.emitter.on('test.register-abstract-test-classes', async () => {
			const isInstalled = await this.featureInstaller.isInstalled('store')

			if (!isInstalled) {
				return {
					abstractClasses: [],
				}
			}

			return {
				abstractClasses: [
					{
						name: 'AbstractStoreTest',
						import: '@sprucelabs/spruce-store-plugin',
					},
				],
			}
		})
	}

	public async afterPackageInstall() {
		const files = await this.Writer('store').writePlugin(this.cwd)
		return {
			files,
		}
	}
}
