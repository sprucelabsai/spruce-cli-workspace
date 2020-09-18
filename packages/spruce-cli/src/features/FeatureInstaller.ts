import { validateSchemaValues } from '@sprucelabs/schema'
import { uniq } from 'lodash'
import merge from 'lodash/merge'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, {
	Service,
	IServiceProvider,
	IServiceMap,
} from '../services/ServiceFactory'
import { NpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import {
	IInstallFeatureOptions,
	FeatureInstallResponse,
	FeatureCode,
	InstallFeature,
	IFeatureMap,
} from './features.types'

export default class FeatureInstaller implements IServiceProvider {
	public cwd: string

	private featureMap: Partial<IFeatureMap> = {}
	private serviceFactory: ServiceFactory

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
	}

	public async isInstalled(code: FeatureCode) {
		return this.getFeature(code).isInstalled()
	}

	public mapFeature<C extends FeatureCode>(code: C, feature: IFeatureMap[C]) {
		this.featureMap[code] = feature
	}

	public getFeature<C extends FeatureCode>(code: C): IFeatureMap[C] {
		const feature = this.featureMap[code]
		if (!feature) {
			throw new SpruceError({ code: 'INVALID_FEATURE_CODE', featureCode: code })
		}

		return feature as IFeatureMap[C]
	}

	public async areInstalled(codes: FeatureCode[]) {
		const results = await Promise.all(
			codes.map((f) => {
				return this.isInstalled(f)
			})
		)

		for (let i = 0; i < results.length; i += 1) {
			const result = results[i]
			if (!result) {
				return false
			}
		}

		return true
	}

	public getFeatureDependencies<C extends FeatureCode>(
		featureCode: C,
		trackedFeatures: FeatureCode[] = []
	): FeatureCode[] {
		let deps = this.getFeatureDependenciesIncludingSelf(
			featureCode,
			trackedFeatures
		).filter((f) => f !== featureCode)

		deps = this.sortFeatures(deps)

		return deps
	}

	private getFeatureDependenciesIncludingSelf<C extends FeatureCode>(
		featureCode: C,
		trackedFeatures: FeatureCode[] = []
	): FeatureCode[] {
		trackedFeatures.push(featureCode)

		const feature = this.getFeature(featureCode)
		const dependencies = feature.dependencies

		for (let i = 0; i < dependencies.length; i += 1) {
			trackedFeatures = this.trackFeatureDependencyIfNotTracked(
				dependencies[i],
				trackedFeatures
			)
		}

		return uniq(trackedFeatures)
	}

	private trackFeatureDependencyIfNotTracked<C extends FeatureCode>(
		dependencyCode: C,
		trackedFeatures: FeatureCode[]
	) {
		const isTracked = !!trackedFeatures.find((f) => f === dependencyCode)

		if (!isTracked) {
			trackedFeatures.push(dependencyCode)

			const features = this.getFeatureDependenciesIncludingSelf(
				dependencyCode,
				trackedFeatures
			)
			trackedFeatures = trackedFeatures.concat(features)
		}

		return trackedFeatures
	}

	public async install(
		options: IInstallFeatureOptions
	): Promise<FeatureInstallResponse> {
		const { features, installFeatureDependencies = true } = options

		let results: FeatureInstallResponse = {}

		let codesToInstall: FeatureCode[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const code = f.code
			const isInstalled = await this.getFeature(code).isInstalled()
			if (!isInstalled && installFeatureDependencies) {
				codesToInstall = codesToInstall.concat(
					this.getFeatureDependenciesIncludingSelf(code)
				)
			} else if (!isInstalled) {
				// eslint-disable-next-line no-debugger
				debugger
				throw new Error('make custom error')
			}
		}

		codesToInstall = uniq(codesToInstall)
		codesToInstall = this.sortFeatures(codesToInstall)

		for (let i = 0; i < codesToInstall.length; i += 1) {
			const code = codesToInstall[i]

			const feature = this.getFeature(code)

			const isInstalled = await feature.isInstalled()

			if (!isInstalled) {
				const installOptions = options.features.find((f) => f.code === code)
					?.options

				const installFeature = {
					code: codesToInstall[i],
					options: installOptions,
				} as InstallFeature

				const installResults = await this.installFeature(installFeature)
				results = merge(results, installResults)
			}
		}

		return results
	}

	private async installFeature(
		installFeature: InstallFeature
	): Promise<FeatureInstallResponse> {
		const feature = this.getFeature(installFeature.code) as AbstractFeature

		if (feature.optionsDefinition) {
			validateSchemaValues(
				feature.optionsDefinition,
				installFeature.options ?? {}
			)
		}

		const beforeInstallResults = await feature.beforePackageInstall(
			installFeature.options
		)

		const packagesInstalled = await this.installPackageDependencies(feature)

		const afterInstallResults = await feature.afterPackageInstall(
			installFeature.options
		)

		const files = [
			...(beforeInstallResults.files ?? []),
			...(afterInstallResults.files ?? []),
		]

		return {
			files: files ?? undefined,
			packagesInstalled,
		}
	}

	public async installPackageDependencies(feature: AbstractFeature) {
		const packagesToInstall: string[] = []
		const devPackagesToInstall: string[] = []
		const packagesInstalled: NpmPackage[] = []

		feature.packageDependencies.forEach((pkg) => {
			const packageName = `${pkg.name}@${pkg.version ?? 'latest'}`

			packagesInstalled.push(pkg)

			if (pkg.isDev) {
				devPackagesToInstall.push(packageName)
			} else {
				packagesToInstall.push(packageName)
			}
		})

		const pkgService = this.Service('pkg')

		if (packagesToInstall.length > 0) {
			await pkgService.install(packagesToInstall)
		}

		if (devPackagesToInstall.length > 0) {
			await pkgService.install(devPackagesToInstall, {
				dev: true,
			})
		}

		return packagesInstalled
	}

	private sortFeatures<F extends FeatureCode[]>(codes: F): F {
		return [...codes].sort((a, b) => {
			const aFeature = this.getFeature(a)
			const bFeature = this.getFeature(b)

			const aDependsOnB = aFeature.dependencies.find((d) => d === b)
			const bDependsOnA = bFeature.dependencies.find((d) => d === a)

			if (aDependsOnB) {
				return 1
			} else if (bDependsOnA) {
				return -1
			}
			return 0
		}) as F
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public getDefinitionForFeature(code: FeatureCode) {
		return this.getFeature(code).optionsDefinition
	}

	public getAllCodes(): FeatureCode[] {
		const codes = Object.keys(this.featureMap) as FeatureCode[]
		return this.sortFeatures(codes)
	}
}
