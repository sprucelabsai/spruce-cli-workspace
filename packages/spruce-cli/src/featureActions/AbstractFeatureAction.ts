import {
	ISchemaDefinition,
	SchemaDefinitionValues,
	defaultSchemaValues,
	validateSchemaValues,
} from '@sprucelabs/schema'
import { SchemaDefinitionPartialValues } from '@sprucelabs/schema/build/schemas.static.types'
import { Templates } from '@sprucelabs/spruce-templates'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../factories/ServiceFactory'
import AbstractFeature from '../features/AbstractFeature'
import {
	IFeatureAction,
	IFeatureActionExecuteResponse,
	IFeatureActionOptions,
} from '../features/features.types'
import StoreFactory, { StoreCode, IStoreMap } from '../stores/StoreFactory'

export default abstract class AbstractFeatureAction<
	S extends ISchemaDefinition | undefined = ISchemaDefinition | undefined
> implements IFeatureAction<S>, IServiceProvider {
	public abstract name: string
	public abstract optionsDefinition: S

	private parent: AbstractFeature
	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory

	protected cwd: string
	protected templates: Templates

	public constructor(options: IFeatureActionOptions) {
		this.cwd = options.cwd
		this.templates = options.templates
		this.parent = options.parent
		this.storeFactory = options.storeFactory
		this.serviceFactory = options.serviceFactory
	}

	public abstract execute(
		options: S extends ISchemaDefinition ? SchemaDefinitionValues<S> : undefined
	): Promise<IFeatureActionExecuteResponse>

	protected Action(name: string) {
		return this.parent.Action(name)
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public Store<C extends StoreCode>(code: C, cwd?: string): IStoreMap[C] {
		return this.storeFactory.Store(code, cwd ?? this.cwd)
	}

	protected validateAndNormalizeOptions(
		options: S extends ISchemaDefinition
			? SchemaDefinitionPartialValues<S>
			: undefined
	) {
		const definition = this.optionsDefinition as ISchemaDefinition | undefined

		if (!definition) {
			return undefined
		}

		const allOptions = {
			...defaultSchemaValues(definition),
			...options,
		}

		validateSchemaValues(
			definition,
			allOptions as SchemaDefinitionValues<ISchemaDefinition>
		)

		return allOptions
	}
}
