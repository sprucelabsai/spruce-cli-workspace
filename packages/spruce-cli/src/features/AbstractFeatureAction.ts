import { Schema, SchemaValues, SchemaPartialValues } from '@sprucelabs/schema'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { Templates } from '@sprucelabs/spruce-templates'
import { GeneratorOptions } from '../generators/AbstractGenerator'
import GeneratorFactory, {
	GeneratorCode,
	GeneratorMap,
} from '../generators/GeneratorFactory'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory, {
	ServiceProvider,
	Service,
	ServiceMap,
} from '../services/ServiceFactory'
import StoreFactory, {
	StoreCode,
	StoreFactoryMethodOptions,
	StoreMap,
} from '../stores/StoreFactory'
import {
	ApiClient,
	ApiClientFactory,
	ApiClientFactoryOptions,
} from '../types/apiClient.types'
import { GraphicsInterface } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import FeatureInstaller from './FeatureInstaller'
import {
	FeatureAction,
	FeatureActionResponse,
	FeatureActionOptions,
	FeatureCode,
} from './features.types'
import validateAndNormalizeUtil from './validateAndNormalize.utility'

export default abstract class AbstractFeatureAction<S extends Schema = Schema>
	implements FeatureAction<S>, ServiceProvider {
	public abstract name: string
	public abstract optionsSchema: S

	protected parent: AbstractFeature
	protected featureInstaller: FeatureInstaller
	protected cwd: string
	protected templates: Templates
	protected ui: GraphicsInterface
	protected emitter: GlobalEmitter

	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory
	private generatorFactory: GeneratorFactory
	private apiClientFactory: ApiClientFactory

	public constructor(options: FeatureActionOptions) {
		this.cwd = options.cwd
		this.templates = options.templates
		this.parent = options.parent
		this.storeFactory = options.storeFactory
		this.serviceFactory = options.serviceFactory
		this.featureInstaller = options.featureInstaller
		this.ui = options.ui
		this.generatorFactory = options.generatorFactory
		this.emitter = options.emitter
		this.apiClientFactory = options.apiClientFactory
	}

	public abstract execute(
		options: SchemaValues<S>
	): Promise<FeatureActionResponse>

	protected Action<S extends Schema = Schema>(name: string) {
		return this.parent.Action<S>(name)
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected Store<C extends StoreCode>(
		code: C,
		options?: StoreFactoryMethodOptions
	): StoreMap[C] {
		return this.storeFactory.Store(code, { cwd: this.cwd, ...options })
	}

	protected Generator<C extends GeneratorCode>(
		code: C,
		options?: Partial<GeneratorOptions>
	): GeneratorMap[C] {
		return this.generatorFactory.Generator(code, options)
	}

	protected getFeature(code: FeatureCode) {
		return this.featureInstaller.getFeature(code)
	}

	protected getFeatureCodes(): FeatureCode[] {
		return this.featureInstaller.getAllCodes()
	}

	protected validateAndNormalizeOptions(options: SchemaPartialValues<S>) {
		const schema = this.optionsSchema
		return validateAndNormalizeUtil.validateAndNormalize(schema, options)
	}

	protected async resolveVersion(
		userSuppliedVersion: string | null | undefined,
		resolvedDestination: string
	) {
		let resolvedVersion = versionUtil.generateVersion(
			userSuppliedVersion ?? undefined
		).constValue

		if (!userSuppliedVersion) {
			resolvedVersion = await this.askForVersion(
				resolvedDestination,
				resolvedVersion
			)
		}
		versionUtil.assertValidVersion(resolvedVersion)

		return versionUtil.generateVersion(resolvedVersion).dirValue
	}

	private async askForVersion(
		resolvedDestination: string,
		fallbackVersion: string
	) {
		const versions = diskUtil.doesDirExist(resolvedDestination)
			? versionUtil.getAllVersions(resolvedDestination)
			: []
		const todaysVersion = versionUtil.generateVersion()

		let version = fallbackVersion
		const alreadyHasToday = !!versions.find(
			(version) => version.dirValue === todaysVersion.dirValue
		)
		const choices = []

		if (!alreadyHasToday) {
			choices.push({
				label: 'New Version',
				value: todaysVersion.dirValue,
			})
		}

		choices.push(
			...versions
				.sort((a, b) => {
					return a.intValue > b.intValue ? -1 : 1
				})
				.map((version) => ({
					value: version.dirValue,
					label: version.dirValue,
				}))
		)

		if (versions.length > 0) {
			version = await this.ui.prompt({
				type: 'select',
				label: 'Version',
				hint: 'Confirm which version you want to use?',
				isRequired: true,
				options: {
					choices,
				},
			})
		}
		return version
	}

	protected async connectToApi(
		options?: ApiClientFactoryOptions
	): Promise<ApiClient> {
		return this.apiClientFactory(options)
	}
}
