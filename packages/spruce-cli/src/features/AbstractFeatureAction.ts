import {
	ISchema,
	SchemaValues,
	defaultSchemaValues,
	validateSchemaValues,
	SchemaPartialValues,
	SchemaValuesWithDefaults,
	normalizeSchemaValues,
} from '@sprucelabs/schema'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { Templates } from '@sprucelabs/spruce-templates'
import { IGeneratorOptions } from '../generators/AbstractGenerator'
import GeneratorFactory, {
	GeneratorCode,
	GeneratorMap,
} from '../generators/GeneratorFactory'
import ServiceFactory, {
	IServiceProvider,
	Service,
	IServiceMap,
} from '../services/ServiceFactory'
import StoreFactory, { StoreCode, IStoreMap } from '../stores/StoreFactory'
import { IGraphicsInterface } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import FeatureInstaller from './FeatureInstaller'
import {
	IFeatureAction,
	IFeatureActionExecuteResponse,
	IFeatureActionOptions,
	FeatureCode,
} from './features.types'

type StripNulls<T extends Record<string, any>> = {
	[K in keyof T]: Exclude<T[K], null>
}
export default abstract class AbstractFeatureAction<S extends ISchema = ISchema>
	implements IFeatureAction<S>, IServiceProvider {
	public abstract name: string
	public abstract optionsSchema: S

	private parent: AbstractFeature
	private serviceFactory: ServiceFactory
	private storeFactory: StoreFactory
	private generatorFactory: GeneratorFactory

	protected featureInstaller: FeatureInstaller
	protected cwd: string
	protected templates: Templates
	protected ui: IGraphicsInterface

	public constructor(options: IFeatureActionOptions) {
		this.cwd = options.cwd
		this.templates = options.templates
		this.parent = options.parent
		this.storeFactory = options.storeFactory
		this.serviceFactory = options.serviceFactory
		this.featureInstaller = options.featureInstaller
		this.ui = options.term
		this.generatorFactory = options.generatorFactory
	}

	public abstract execute(
		options: SchemaValues<S>
	): Promise<IFeatureActionExecuteResponse>

	protected Action(name: string) {
		return this.parent.Action(name)
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	protected Store<C extends StoreCode>(code: C, cwd?: string): IStoreMap[C] {
		return this.storeFactory.Store(code, cwd ?? this.cwd)
	}

	protected Generator<C extends GeneratorCode>(
		code: C,
		options?: Partial<IGeneratorOptions>
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

		const values = {
			...defaultSchemaValues(schema),
			...options,
		}

		validateSchemaValues(schema, values as SchemaValues<ISchema>, {})

		const normalized = normalizeSchemaValues(schema, values)

		const noUndefined = {}

		Object.keys(normalized).forEach((key: string) => {
			// @ts-ignore
			if (normalized[key] !== undefined) {
				//@ts-ignore
				noUndefined[key] = normalized[key]
			}
		})

		return noUndefined as StripNulls<SchemaValuesWithDefaults<S>>
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
}
