import pathUtil from 'path'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import GeneratorFactory, {
	GeneratorCode,
	GeneratorMap,
} from '../generators/GeneratorFactory'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory, {
	Service,
	ServiceProvider,
	ServiceMap,
} from '../services/ServiceFactory'
import StoreFactory, {
	StoreCode,
	StoreFactoryMethodOptions,
	StoreMap,
} from '../stores/StoreFactory'
import {
	ApiClient,
	ApiClientFactory,
	ApiClientFactoryOptions,
} from '../types/apiClient.types'
import {
	NpmPackage,
	GraphicsInterface,
	GeneratedFile,
} from '../types/cli.types'
import featuresUtil from './feature.utilities'
import FeatureActionFactory, {
	FeatureActionFactoryOptions,
} from './FeatureActionFactory'
import FeatureInstaller from './FeatureInstaller'
import { FeatureAction } from './features.types'
import { FeatureCode } from './features.types'

export interface InstallResults {
	files?: GeneratedFile[]
}

export interface FeatureDependency {
	isRequired: boolean
	code: FeatureCode
}

export interface FeatureOptions {
	cwd: string
	serviceFactory: ServiceFactory
	templates: Templates
	storeFactory: StoreFactory
	actionFactory?: FeatureActionFactory
	featureInstaller: FeatureInstaller
	ui: GraphicsInterface
	emitter: GlobalEmitter
	apiClientFactory: ApiClientFactory
}

export default abstract class AbstractFeature<
	S extends Schema | undefined = Schema | undefined
> implements ServiceProvider {
	public abstract description: string
	public readonly dependencies: FeatureDependency[] = []
	public readonly packageDependencies: NpmPackage[] = []
	public readonly optionsDefinition?: S

	public isInstalled?: () => Promise<boolean>

	public abstract readonly code: FeatureCode
	public abstract readonly nameReadable: string
	public readonly installOrderWeight: number = 0

	protected cwd: string
	protected actionsDir: string | undefined
	protected actionFactory?: FeatureActionFactory
	protected templates: Templates
	protected emitter: GlobalEmitter
	protected featureInstaller: FeatureInstaller
	protected ui: GraphicsInterface

	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory
	private generatorFactory: GeneratorFactory
	private apiClientFactory: ApiClientFactory

	protected actionFactoryOptions: Omit<
		FeatureActionFactoryOptions,
		'actionsDir'
	>

	public constructor(options: FeatureOptions) {
		this.cwd = options.cwd
		this.serviceFactory = options.serviceFactory
		this.templates = options.templates
		this.actionFactory = options.actionFactory
		this.storeFactory = options.storeFactory
		this.generatorFactory = new GeneratorFactory(this.templates, options.ui)
		this.emitter = options.emitter
		this.featureInstaller = options.featureInstaller
		this.ui = options.ui
		this.apiClientFactory = options.apiClientFactory

		this.actionFactoryOptions = {
			...options,
			parent: this as AbstractFeature<any>,
			generatorFactory: this.generatorFactory,
			apiClientFactory: options.apiClientFactory,
		}
	}

	public async beforePackageInstall(
		_options: S extends Schema ? SchemaValues<S> : undefined
	): Promise<InstallResults> {
		return {}
	}

	public async afterPackageInstall(
		_options: S extends Schema ? SchemaValues<S> : undefined
	): Promise<InstallResults> {
		return {}
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected Generator<C extends GeneratorCode>(code: C): GeneratorMap[C] {
		return this.generatorFactory.Generator(code)
	}

	public getFeature<Code extends FeatureCode>(code: Code) {
		return this.featureInstaller.getFeature(code)
	}

	public Action<S extends Schema = Schema>(code: string): FeatureAction<S> {
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

	public Store<C extends StoreCode>(
		code: C,
		options?: StoreFactoryMethodOptions
	): StoreMap[C] {
		return this.storeFactory.Store(code, { cwd: this.cwd, ...options })
	}

	protected async connectToApi(
		options?: ApiClientFactoryOptions
	): Promise<ApiClient> {
		return this.apiClientFactory(options)
	}
}
