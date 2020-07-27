import pathUtil from 'path'
import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import { IGenerators } from '#spruce/autoloaders/generators'
import ServiceFactory, {
	Service,
	IServiceProvider,
	IServiceMap,
} from '../factories/ServiceFactory'
import FeatureActionFactory, {
	IFeatureActionFactoryOptions,
} from '../featureActions/FeatureActionFactory'
import StoreFactory, { StoreCode, IStoreMap } from '../stores/StoreFactory'
import { INpmPackage, IGraphicsInterface } from '../types/cli.types'
import featuresUtil from './feature.utilities'
import FeatureInstaller from './FeatureInstaller'
import { IFeatureAction } from './features.types'
import { FeatureCode } from './features.types'

export default abstract class AbstractFeature<
	S extends ISchemaDefinition | undefined = ISchemaDefinition | undefined
> implements IServiceProvider {
	public abstract description: string
	public readonly dependencies: FeatureCode[] = []
	public readonly packageDependencies: INpmPackage[] = []
	public readonly optionsDefinition?: S

	protected cwd: string
	public abstract readonly code: FeatureCode
	public abstract readonly nameReadable: string

	protected actionsDir: string | undefined
	protected actionFactory?: FeatureActionFactory
	protected templates: Templates
	protected generators: IGenerators

	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory

	protected actionFactoryOptions: Omit<
		IFeatureActionFactoryOptions,
		'actionsDir'
	>

	public constructor(options: {
		cwd: string
		serviceFactory: ServiceFactory
		templates: Templates
		generators: IGenerators
		storeFactory: StoreFactory
		actionFactory?: FeatureActionFactory
		featureInstaller: FeatureInstaller
		term: IGraphicsInterface
	}) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
		this.templates = options.templates
		this.generators = options.generators
		this.actionFactory = options.actionFactory
		this.storeFactory = options.storeFactory

		this.actionFactoryOptions = {
			...options,
			parent: this,
			storeFactory: options.storeFactory,
		}
	}

	public async beforePackageInstall(
		_options: S extends ISchemaDefinition
			? SchemaDefinitionValues<S>
			: undefined
	): Promise<void> {}

	public async afterPackageInstall(
		_options: S extends ISchemaDefinition
			? SchemaDefinitionValues<S>
			: undefined
	): Promise<void> {}

	public abstract async isInstalled(): Promise<boolean>

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public Action(code: string): IFeatureAction {
		if (!this.actionFactory) {
			if (!this.actionsDir) {
				throw new Error(
					`${this.code} Feature does not have an actions dir configured, make sure your Feature class has an actionsDir field.`
				)
			}
			this.actionFactory = new FeatureActionFactory({
				...this.actionFactoryOptions,
				actionsDir: this.actionsDir,
			})

			if (!this.actionFactory) {
				throw new Error(`Feature does not have an action factory!`)
			}
		}

		return this.actionFactory.Action(code)
	}

	public async getAvailableActionCodes(): Promise<string[]> {
		if (!this.actionsDir) {
			return []
		}
		const matches: string[] = await globby(
			pathUtil.join(this.actionsDir, '**/*Action.js')
		)

		return matches.map((path) => featuresUtil.filePathToActionCode(path))
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): IStoreMap[C] {
		return this.storeFactory.Store(code, this.cwd ?? cwd)
	}
}
