import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Feature } from '../FeatureManager'
import { INpmPackage } from '../types/cli.types'

export default abstract class AbstractFeature<
	S extends ISchemaDefinition | undefined = ISchemaDefinition | undefined
> {
	public featureDependencies: Feature[] = []
	public packageDependencies: INpmPackage[] = []

	public optionsDefinition?: S extends ISchemaDefinition ? S : null

	public cwd: string
	public abstract description: string

	public constructor(cwd: string) {
		this.cwd = cwd
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
}
