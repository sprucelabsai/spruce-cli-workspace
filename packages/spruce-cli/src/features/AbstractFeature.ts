import { Feature } from '#spruce/autoloaders/features'

export interface IFeatureOptions {
	cwd: string
}

export interface IFeaturePackage {
	/** The full package name */
	name: string
	/** The package version. Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export default abstract class AbstractFeature {
	/** Other features that must also be installed for this feature to work */
	public featureDependencies: Feature[] = []

	/** The current working directory */
	protected cwd: string

	/** The required npm packages for this feature */
	public abstract packages: IFeaturePackage[]

	public constructor(options: IFeatureOptions) {
		this.cwd = options.cwd
	}

	/** Called after packages have been installed */
	public abstract install(options?: Record<string, any>): Promise<void>

	/** Should return true if the feature is currently installed */
	public abstract isInstalled(): Promise<boolean>
}
