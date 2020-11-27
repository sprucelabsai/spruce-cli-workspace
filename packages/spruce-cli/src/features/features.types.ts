import { Schema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import SpruceError from '../errors/SpruceError'
import GeneratorFactory from '../generators/GeneratorFactory'
import ServiceFactory from '../services/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import {
	GeneratedFile,
	GraphicsInterface,
	NpmPackage,
} from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import NodeFeature from './node/NodeFeature'
import OnboardFeature from './onboard/OnboardFeature'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
import VsCodeFeature from './vscode/VsCodeFeature'
import WatchFeature from './watch/WatchFeature'

export interface FeatureMap {
	circleCi: CircleCIFeature
	error: ErrorFeature
	schema: SchemaFeature
	skill: SkillFeature
	test: TestFeature
	vscode: VsCodeFeature
	event: EventFeature
	watch: WatchFeature
	node: NodeFeature
	onboard: OnboardFeature
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
	| {
			code: 'onboard'
			options?: undefined
	  }

export interface FeatureActionOptions {
	templates: Templates
	serviceFactory: ServiceFactory
	cwd: string
	parent: AbstractFeature
	storeFactory: StoreFactory
	featureInstaller: FeatureInstaller
	term: GraphicsInterface
	generatorFactory: GeneratorFactory
}

export type FeatureCode = keyof FeatureMap

export type FeatureOptions<
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
	errors?: SpruceError[]
	hints?: string[]
	summaryLines?: string[]
}

export interface FeatureAction<S extends Schema = Schema> {
	name: string
	optionsSchema?: S
	execute: (options: SchemaValues<S>) => Promise<FeatureActionResponse>
}
