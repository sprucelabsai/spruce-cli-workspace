import AbstractSpruceError from '@sprucelabs/error'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import GeneratorFactory from '../generators/GeneratorFactory'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory from '../services/ServiceFactory'
import { ApiClientFactory } from '../stores/AbstractStore'
import StoreFactory from '../stores/StoreFactory'
import {
	GeneratedFile,
	GraphicsInterface,
	NpmPackage,
} from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import NodeFeature from './node/NodeFeature'
import OnboardFeature from './onboard/OnboardFeature'
import PersonFeature from './person/PersonFeature'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
import VsCodeFeature from './vscode/VsCodeFeature'
import WatchFeature from './watch/WatchFeature'

export interface FeatureMap {
	error: ErrorFeature
	schema: SchemaFeature
	skill: SkillFeature
	test: TestFeature
	vscode: VsCodeFeature
	event: EventFeature
	watch: WatchFeature
	node: NodeFeature
	onboard: OnboardFeature
	person: PersonFeature
}

export type InstallFeature =
	| {
			code: 'node'
			options: SchemaValues<NodeFeature['optionsDefinition']>
	  }
	| {
			code: 'skill'
			options: SchemaValues<SkillFeature['optionsDefinition']>
	  }
	| {
			code: 'schema'
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
	| {
			code: 'onboard'
			options?: undefined
	  }
	| {
			code: 'person'
			options?: undefined
	  }

export interface FeatureActionOptions {
	templates: Templates
	serviceFactory: ServiceFactory
	cwd: string
	parent: AbstractFeature
	storeFactory: StoreFactory
	featureInstaller: FeatureInstaller
	ui: GraphicsInterface
	generatorFactory: GeneratorFactory
	emitter: GlobalEmitter
	apiClientFactory: ApiClientFactory
}

export type FeatureCode = keyof FeatureMap

export type FeatureExecuteOptions<
	F extends FeatureCode
> = FeatureMap[F]['optionsDefinition'] extends Schema
	? SchemaValues<FeatureMap[F]['optionsDefinition']>
	: undefined

export interface InstallFeatureOptions {
	features: InstallFeature[]
	installFeatureDependencies?: boolean
}
export interface FeatureInstallResponse {
	files?: GeneratedFile[]
	packagesInstalled?: NpmPackage[]
}

export interface FeatureActionResponse extends FeatureInstallResponse {
	meta?: Record<string, any>
	errors?: AbstractSpruceError<any>[]
	hints?: string[]
	headline?: string
	summaryLines?: string[]
}

export interface FeatureAction<S extends Schema = Schema> {
	name: string
	optionsSchema?: S
	execute: (options: SchemaValues<S>) => Promise<FeatureActionResponse>
}
