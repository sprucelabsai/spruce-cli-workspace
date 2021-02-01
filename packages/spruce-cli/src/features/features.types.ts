import AbstractSpruceError from '@sprucelabs/error'
import { Schema, SchemaValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory from '../services/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import { ApiClientFactory } from '../types/apiClient.types'
import {
	GeneratedFile,
	NpmPackage,
	InternalUpdateHandler,
} from '../types/cli.types'
import { GraphicsInterface } from '../types/cli.types'
import WriterFactory from '../writers/WriterFactory'
import AbstractFeature from './AbstractFeature'
import ConversationFeature from './conversation/ConversationFeature'
import DeployFeature from './deploy/DeployFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import EventContractFeature from './eventContract/EventContractFeature'
import FeatureInstaller from './FeatureInstaller'
import NodeFeature from './node/NodeFeature'
import OnboardFeature from './onboard/OnboardFeature'
import OrganizationFeature from './organization/OrganizationFeature'
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
	organization: OrganizationFeature
	conversation: ConversationFeature
	eventContract: EventContractFeature
	deploy: DeployFeature
}

export type InstallFeature =
	| {
			code: 'node'
			options: SchemaValues<NodeFeature['optionsSchema']>
	  }
	| {
			code: 'skill'
			options: SchemaValues<SkillFeature['optionsSchema']>
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
	| {
			code: 'organization'
			options?: undefined
	  }
	| {
			code: 'conversation'
			options?: undefined
	  }
	| {
			code: 'eventContract'
			options?: undefined
	  }
	| {
			code: 'deploy'
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
	generatorFactory: WriterFactory
	emitter: GlobalEmitter
	apiClientFactory: ApiClientFactory
}

export type FeatureCode = keyof FeatureMap

export type FeatureExecuteOptions<
	F extends FeatureCode
> = FeatureMap[F]['optionsSchema'] extends Schema
	? SchemaValues<FeatureMap[F]['optionsSchema']>
	: undefined

export interface InstallFeatureOptions {
	features: InstallFeature[]
	installFeatureDependencies?: boolean
	didUpdateHandler?: InternalUpdateHandler
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
	code: string
	optionsSchema?: S
	commandAliases: string[]
	execute: (options: SchemaValues<S>) => Promise<FeatureActionResponse>
}
