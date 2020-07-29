import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import SpruceError from '../errors/SpruceError'
import ServiceFactory from '../factories/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import { IGeneratedFile, IGraphicsInterface } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import FeatureInstaller from './FeatureInstaller'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './TestFeature'
import VsCodeFeature from './VsCodeFeature'

export interface IFeatureActionOptions {
	templates: Templates
	serviceFactory: ServiceFactory
	cwd: string
	parent: AbstractFeature
	storeFactory: StoreFactory
	featureInstaller: FeatureInstaller
	term: IGraphicsInterface
}

export type FeatureCode = keyof IFeatureMap

export type FeatureOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchemaDefinition
	? SchemaDefinitionValues<IFeatureMap[F]['optionsDefinition']>
	: undefined

export interface IFeatureInstallResponse {}

export type InstallFeature =
	| {
			code: 'skill'
			options: SchemaDefinitionValues<SkillFeature['optionsDefinition']>
	  }
	| {
			code: 'schema'
			options?: undefined
	  }
	| {
			code: 'circleCi'
			options?: undefined
	  }
	| {
			code: 'error'
			options?: undefined
	  }
	| {
			code: 'test'
			options?: undefined
	  }
	| {
			code: 'vsCode'
			options?: undefined
	  }

export interface IInstallFeatureOptions {
	features: InstallFeature[]
	installFeatureDependencies?: boolean
}

export interface IFeatureMap {
	circleCi: CircleCIFeature
	error: ErrorFeature
	schema: SchemaFeature
	skill: SkillFeature
	test: TestFeature
	vsCode: VsCodeFeature
}

export interface IFeatureActionExecuteResponse {
	files?: IGeneratedFile[]
	meta?: Record<string, any>
	errors?: SpruceError[]
}

export interface IFeatureAction<
	S extends ISchemaDefinition = ISchemaDefinition
> {
	name: string
	optionsDefinition?: S
	execute: (
		options: SchemaDefinitionValues<S>
	) => Promise<IFeatureActionExecuteResponse>
}
