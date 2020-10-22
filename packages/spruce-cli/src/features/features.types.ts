import { ISchema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import SpruceError from '../errors/SpruceError'
import GeneratorFactory from '../generators/GeneratorFactory'
import ServiceFactory from '../services/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import {
	GeneratedFile,
	IGraphicsInterface,
	NpmPackage,
} from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
import VsCodeFeature from './vscode/VsCodeFeature'
import WatchFeature from './watch/WatchFeature'

export interface IFeatureActionOptions {
	templates: Templates
	serviceFactory: ServiceFactory
	cwd: string
	parent: AbstractFeature
	storeFactory: StoreFactory
	featureInstaller: FeatureInstaller
	term: IGraphicsInterface
	generatorFactory: GeneratorFactory
}

export type FeatureCode = keyof IFeatureMap

export type FeatureOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchema
	? SchemaValues<IFeatureMap[F]['optionsDefinition']>
	: undefined

export type InstallFeature =
	| {
			code: 'skill'
			options: SchemaValues<SkillFeature['optionsDefinition']>
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
			code: 'vscode'
			options?: undefined
	  }
	| {
			code: 'event'
			options?: undefined
	  }
	| {
			code: 'watch'
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
	vscode: VsCodeFeature
	event: EventFeature
	watch: WatchFeature
}

export interface FeatureInstallResponse {
	files?: GeneratedFile[]
	packagesInstalled?: NpmPackage[]
}

export interface IFeatureActionExecuteResponse extends FeatureInstallResponse {
	meta?: Record<string, any>
	errors?: SpruceError[]
	hints?: string[]
	summaryLines?: string[]
}

export interface IFeatureAction<S extends ISchema = ISchema> {
	name: string
	optionsSchema?: S
	execute: (options: SchemaValues<S>) => Promise<IFeatureActionExecuteResponse>
}
