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
import AbstractFeature, { FeatureDependency } from './AbstractFeature'
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
		return this.Service('settings').isMarkedAsInstalled(code)
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
		trackedFeatures: FeatureDependency[] = []
	): FeatureDependency[] {
		let deps = this.getFeatureDependenciesIncludingSelf(
			{ code: featureCode, isRequired: true },
			trackedFeatures
		).filter((f) => f.code !== featureCode)

		deps = this.sortFeatures(deps)

		return deps
	}

	private getFeatureDependenciesIncludingSelf(
		featureDependency: FeatureDependency,
		trackedFeatures: FeatureDependency[] = []
	): FeatureDependency[] {
		let features: FeatureDependency[] = []
		features.push(featureDependency)
		trackedFeatures.push(featureDependency)

		const feature = this.getFeature(featureDependency.code)
		const dependencies = feature.dependencies

		for (let i = 0; i < dependencies.length; i += 1) {
			features = features.concat(
				this.getUnTrackedDependenciesIncludingSelf(
					dependencies[i],
					trackedFeatures
				)
			)
		}

		return features
	}

	private getUnTrackedDependenciesIncludingSelf(
		dependency: FeatureDependency,
		trackedFeatures: FeatureDependency[]
	) {
		const isTracked = !!trackedFeatures.find((f) => f.code === dependency.code)
		let unTracked: FeatureDependency[] = []

		if (!isTracked) {
			let features = this.getFeatureDependenciesIncludingSelf(
				dependency,
				trackedFeatures
			)
			if (!dependency.isRequired) {
				features = features.map((f) => ({ ...f, isRequired: false }))
			}
			unTracked = unTracked.concat(features)
		}

		return unTracked
	}

	public async install(
		options: IInstallFeatureOptions
	): Promise<FeatureInstallResponse> {
		const { features, installFeatureDependencies = true } = options

		let results: FeatureInstallResponse = {}

		let dependenciesToInstall: FeatureDependency[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const code = f.code
			const isInstalled = await this.isInstalled(code)
			if (!isInstalled && installFeatureDependencies) {
				dependenciesToInstall = dependenciesToInstall.concat(
					this.getFeatureDependenciesIncludingSelf({ code, isRequired: true })
				)
			} else if (!isInstalled) {
				dependenciesToInstall.push({ code, isRequired: true })
			}
		}

		dependenciesToInstall = uniq(dependenciesToInstall)
		dependenciesToInstall = this.sortFeatures(dependenciesToInstall)

		for (let i = 0; i < dependenciesToInstall.length; i += 1) {
			const { code, isRequired } = dependenciesToInstall[i]

			const isInstalled = await this.isInstalled(code)

			if (!isInstalled && isRequired) {
				const installOptions = options.features.find((f) => f.code === code)
					?.options

				const installFeature = {
					code: dependenciesToInstall[i].code,
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

		this.Service('settings').markAsInstalled(feature.code)

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

	private sortFeatures(
		featureDependencies: FeatureDependency[]
	): FeatureDependency[] {
		return [...featureDependencies].sort((a, b) => {
			const aFeature = this.getFeature(a.code)
			const bFeature = this.getFeature(b.code)

			const aDependsOnB = aFeature.dependencies.find((d) => d.code === b.code)
			const bDependsOnA = bFeature.dependencies.find((d) => d.code === a.code)

			if (aDependsOnB) {
				return 1
			} else if (bDependsOnA) {
				return -1
			}
			return 0
		})
	}

	public Service<S extends Service>(type: S, cwd?: string): IServiceMap[S] {
		return this.serviceFactory.Service(cwd ?? this.cwd, type)
	}

	public getDefinitionForFeature(code: FeatureCode) {
		return this.getFeature(code).optionsDefinition
	}

	public getAllCodes(): FeatureCode[] {
		const codes = Object.keys(this.featureMap) as FeatureCode[]
		return this.sortFeatures(
			codes.map((code) => ({ code, isRequired: true }))
		).map((dep) => dep.code)
	}
}
