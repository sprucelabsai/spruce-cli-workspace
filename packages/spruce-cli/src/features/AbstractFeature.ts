import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { IGenerators } from '#spruce/autoloaders/generators'
import { IStores } from '#spruce/autoloaders/stores'
import ServiceFactory, { Service } from '../factories/ServiceFactory'
import PkgService from '../services/PkgService'
import { INpmPackage } from '../types/cli.types'
import { FeatureCode } from './FeatureManager'

export default abstract class AbstractFeature<
	S extends ISchemaDefinition | undefined = ISchemaDefinition | undefined
> {
	public readonly dependencies: FeatureCode[] = []
	public readonly packageDependencies: INpmPackage[] = []
	public readonly optionsDefinition?: S extends ISchemaDefinition ? S : null

	public cwd: string
	public readonly code: FeatureCode

	protected serviceFactory: ServiceFactory
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
	}) {
		this.cwd = options.cwd
		this.code = options.code
		this.serviceFactory = options.serviceFactory
		this.templates = options.templates
		this.generators = options.generators
		this.stores = options.stores
	}
	public abstract description: string

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

	protected PkgService(): PkgService {
		return this.serviceFactory.Service(this.cwd, Service.Pkg)
	}
}
