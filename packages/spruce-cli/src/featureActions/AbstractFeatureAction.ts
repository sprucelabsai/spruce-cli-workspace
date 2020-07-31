import {
	ISchema,
	SchemaValues,
	defaultSchemaValues,
	validateSchemaValues,
	SchemaPartialValues,
	SchemaValuesWithDefaults,
} from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../factories/ServiceFactory'
import AbstractFeature from '../features/AbstractFeature'
import FeatureInstaller from '../features/FeatureInstaller'
import {
	IFeatureAction,
	IFeatureActionExecuteResponse,
	IFeatureActionOptions,
	FeatureCode,
} from '../features/features.types'
import StoreFactory, { StoreCode, IStoreMap } from '../stores/StoreFactory'
import { IGraphicsInterface } from '../types/cli.types'

type StripNulls<T extends Record<string, any>> = {
	[K in keyof T]: Exclude<T[K], null>
}
export default abstract class AbstractFeatureAction<S extends ISchema = ISchema>
	implements IFeatureAction<S>, IServiceProvider {
	public abstract name: string
	public abstract optionsSchema: S

	private parent: AbstractFeature
	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory
	private featureInstaller: FeatureInstaller

	protected cwd: string
	protected templates: Templates
	protected term: IGraphicsInterface

	public constructor(options: IFeatureActionOptions) {
		this.cwd = options.cwd
		this.templates = options.templates
		this.parent = options.parent
		this.storeFactory = options.storeFactory
		this.serviceFactory = options.serviceFactory
		this.featureInstaller = options.featureInstaller
		this.term = options.term
	}

	public abstract execute(
		options: SchemaValues<S>
	): Promise<IFeatureActionExecuteResponse>

	protected Action(name: string) {
		return this.parent.Action(name)
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected Store<C extends StoreCode>(code: C, cwd?: string): IStoreMap[C] {
		return this.storeFactory.Store(code, cwd ?? this.cwd)
	}

	protected getFeature(code: FeatureCode) {
		return this.featureInstaller.getFeature(code)
	}

	protected getFeatureCodes(): FeatureCode[] {
		return this.featureInstaller.getAllCodes()
	}

	protected validateAndNormalizeOptions(options: SchemaPartialValues<S>) {
		const schema = this.optionsSchema

		const allOptions = {
			...defaultSchemaValues(schema),
			...options,
		}

		validateSchemaValues(schema, allOptions as SchemaValues<ISchema>)

		return allOptions as StripNulls<SchemaValuesWithDefaults<S>>
	}
}
