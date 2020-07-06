import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import ServiceFactory, { Service } from '../factories/ServiceFactory'
import { FeatureCode } from './FeatureManager'
import PkgService from '../services/PkgService'
import { INpmPackage } from '../types/cli.types'

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

	public constructor(options: {
		cwd: string
		code: FeatureCode
		serviceFactory: ServiceFactory
		templates: Templates
	}) {
		this.cwd = options.cwd
		this.code = options.code
		this.serviceFactory = options.serviceFactory
		this.templates = options.templates
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
