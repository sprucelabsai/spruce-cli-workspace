import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { IStores } from '#spruce/autoloaders/stores'
import ServiceFactory from '../factories/ServiceFactory'

export interface IFeatureActionOptions {
	stores: IStores
	templates: Templates
	serviceFactory: ServiceFactory
	cwd: string
}

export interface IFeatureAction<
	S extends ISchemaDefinition = ISchemaDefinition
> {
	name: string
	optionsDefinition: S
	execute: (options: SchemaDefinitionValues<S>) => Promise<void>
}
