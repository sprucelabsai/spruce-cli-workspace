import pathUtil from 'path'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import globby from 'globby'
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
import { NpmPackage, GeneratedFile, FileDescription } from '../types/cli.types'
import { GraphicsInterface } from '../types/cli.types'
import WriterFactory, { WriterCode, WriterMap } from '../writers/WriterFactory'
import featuresUtil from './feature.utilities'
import FeatureActionFactory, {
	FeatureActionFactoryOptions,
} from './FeatureActionFactory'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode } from './features.types'

export interface InstallResults {
	files?: GeneratedFile[]
	cwd?: string
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
> implements ServiceProvider
{
	public abstract description: string
	public readonly dependencies: FeatureDependency[] = []
	public readonly packageDependencies: NpmPackage[] = []
	public readonly optionsSchema?: S
	public readonly fileDescriptions: FileDescription[] = []

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
	private writerFactory: WriterFactory
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
		this.writerFactory = new WriterFactory(
			this.templates,
			options.ui,
			this.Service('lint')
		)
		this.emitter = options.emitter
		this.featureInstaller = options.featureInstaller
		this.ui = options.ui
		this.apiClientFactory = options.apiClientFactory

		this.actionFactoryOptions = {
			...options,
			parent: this as AbstractFeature<any>,
			writerFactory: this.writerFactory,
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

	protected Writer<C extends WriterCode>(code: C): WriterMap[C] {
		return this.writerFactory.Writer(code, {
			fileDescriptions: this.fileDescriptions,
		})
	}

	public getFeature<Code extends FeatureCode>(code: Code) {
		return this.featureInstaller.getFeature(code)
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
