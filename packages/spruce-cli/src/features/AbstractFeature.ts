import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IStores } from '#spruce/autoloaders/stores'
import ServiceFactory, {
	Service,
	IServiceProvider,
	IServices,
} from '../factories/ServiceFactory'
import FeatureActionFactory from '../featureActions/FeatureActionFactory'
import { INpmPackage } from '../types/cli.types'
import { IFeatureAction } from './feature.types'
import { FeatureCode } from './FeatureManager'

export default abstract class AbstractFeature<
	S extends ISchemaDefinition | undefined = ISchemaDefinition | undefined
> implements IServiceProvider {
	public abstract description: string
	public readonly dependencies: FeatureCode[] = []
	public readonly packageDependencies: INpmPackage[] = []
	public readonly optionsDefinition?: S extends ISchemaDefinition ? S : null

	protected cwd: string
	public readonly code: FeatureCode

	protected actionsDir: string | undefined
	protected serviceFactory: ServiceFactory
	protected actionFactory?: FeatureActionFactory
	protected templates: Templates
	protected generators: IGenerators
	protected stores: IStores

	public constructor(options: {
		cwd: string
		code: FeatureCode
		serviceFactory: ServiceFactory
		templates: Templates
		generators: IGenerators
		stores: IStores
		actionFactory?: FeatureActionFactory
	}) {
		this.cwd = options.cwd
		this.code = options.code
		this.serviceFactory = options.serviceFactory
		this.templates = options.templates
		this.generators = options.generators
		this.stores = options.stores

		this.actionFactory = options.actionFactory

		if (!this.actionFactory && this.actionsDir) {
			this.actionFactory = new FeatureActionFactory(
				this.cwd,
				this.actionsDir,
				this.templates
			)
		}
	}

	public async beforePackageInstall(
		_options?: S extends ISchemaDefinition
			? SchemaDefinitionValues<S>
			: undefined
	): Promise<void> {}

	public async afterPackageInstall(
		_options?: S extends ISchemaDefinition
			? SchemaDefinitionValues<S>
			: undefined
	): Promise<void> {}

	public abstract async isInstalled(): Promise<boolean>

	public Service<S extends Service>(type: S, cwd?: string): IServices[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public Action(name: string): IFeatureAction {
		if (!this.actionFactory) {
			throw new Error(`Feature does not have action named ${name}`)
		}

		return this.actionFactory.Action(name)
	}
}
