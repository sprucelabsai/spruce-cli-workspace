import { validateSchemaValues } from '@sprucelabs/schema'
import { uniq } from 'lodash'
import merge from 'lodash/merge'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, {
	Service,
	ServiceProvider,
	ServiceMap,
} from '../services/ServiceFactory'
import { InternalUpdateHandler, NpmPackage } from '../types/cli.types'
import AbstractFeature, { FeatureDependency } from './AbstractFeature'
import {
	InstallFeatureOptions,
	FeatureInstallResponse,
	FeatureCode,
	InstallFeature,
	FeatureMap,
} from './features.types'

export default class FeatureInstaller implements ServiceProvider {
	public cwd: string

	private featureMap: Partial<FeatureMap> = {}
	private serviceFactory: ServiceFactory
	private featuresMarkedAsSkippedThisRun: FeatureCode[] = []

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
	}

	public async isInstalled(code: FeatureCode): Promise<boolean> {
		const feature = this.getFeature(code)
		if (feature.isInstalled) {
			return feature.isInstalled()
		}
		return this.Service('settings').isMarkedAsInstalled(code)
	}

	public markAsSkippedThisRun(code: FeatureCode) {
		if (!this.isMarkedAsSkipped(code)) {
			this.featuresMarkedAsSkippedThisRun.push(code)
		}
	}
	public markAsPermanentlySkipped(code: FeatureCode) {
		if (!this.isMarkedAsSkipped(code)) {
			this.Service('settings').markAsPermanentlySkipped(code)
		}
	}

	public isMarkedAsSkipped(code: FeatureCode) {
		return (
			this.featuresMarkedAsSkippedThisRun.indexOf(code) > -1 ||
			this.Service('settings').isMarkedAsPermanentlySkipped(code)
		)
	}

	public mapFeature<C extends FeatureCode>(code: C, feature: FeatureMap[C]) {
		this.featureMap[code] = feature
	}

	public getFeature<C extends FeatureCode>(code: C): FeatureMap[C] {
		const feature = this.featureMap[code]
		if (!feature) {
			throw new SpruceError({ code: 'INVALID_FEATURE_CODE', featureCode: code })
		}

		return feature as FeatureMap[C]
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
		const features: FeatureDependency[] = []

		if (!this.isDependencyInTracker(trackedFeatures, featureDependency)) {
			features.push(featureDependency)
			trackedFeatures.push(featureDependency)
		}

		const feature = this.getFeature(featureDependency.code)
		const dependencies = feature.dependencies

		for (let i = 0; i < dependencies.length; i += 1) {
			const dependency = dependencies[i]
			if (!this.isDependencyInTracker(trackedFeatures, dependency)) {
				features.push(dependency)
				trackedFeatures.push(dependency)
			}
		}

		for (let x = 0; x < dependencies.length; x += 1) {
			const dependency = dependencies[x]
			let dependencyDependencies = this.getFeatureDependenciesIncludingSelf(
				dependency,
				trackedFeatures
			)
			if (!dependency.isRequired) {
				dependencyDependencies = dependencyDependencies.map((f) => ({
					...f,
					isRequired: false,
				}))
			}

			features.push(...dependencyDependencies)
		}

		return features
	}

	private isDependencyInTracker(
		trackedFeatures: FeatureDependency[],
		dependency: FeatureDependency
	) {
		return !!trackedFeatures.find((f) => f.code === dependency.code)
	}

	public async install(
		options: InstallFeatureOptions
	): Promise<FeatureInstallResponse> {
		const {
			features,
			installFeatureDependencies = true,
			didUpdateHandler,
		} = options

		let results: FeatureInstallResponse = {}

		let dependenciesToInstall: FeatureDependency[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const code = f.code

			didUpdateHandler?.(`Checking if ${code} is installed...`)

			const isInstalled = await this.isInstalled(code)
			if (!isInstalled && installFeatureDependencies) {
				didUpdateHandler?.(`It is not, checking dependencies...`)
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

				didUpdateHandler?.(`Installing ${installFeature.code}...`)

				const installResults = await this.installFeature(
					installFeature,
					didUpdateHandler
				)
				results = merge(results, installResults)
			}
		}

		return results
	}

	private async installFeature(
		installFeature: InstallFeature,
		didUpdateHandler?: InternalUpdateHandler
	): Promise<FeatureInstallResponse> {
		const feature = this.getFeature(installFeature.code) as AbstractFeature

		if (feature.optionsDefinition) {
			validateSchemaValues(
				feature.optionsDefinition,
				installFeature.options ?? {}
			)
		}

		didUpdateHandler?.(`Running before package install hook...`)
		const beforeInstallResults = await feature.beforePackageInstall(
			installFeature.options
		)

		didUpdateHandler?.(`Installing package dependencies...`)
		const packagesInstalled = await this.installPackageDependencies(
			feature,
			didUpdateHandler
		)

		didUpdateHandler?.(`Running after package install hook...`)
		const afterInstallResults = await feature.afterPackageInstall(
			installFeature.options
		)

		if (!feature.isInstalled) {
			this.Service('settings').markAsInstalled(feature.code)
		}

		const files = [
			...(beforeInstallResults.files ?? []),
			...(afterInstallResults.files ?? []),
		]

		return {
			files: files ?? undefined,
			packagesInstalled,
		}
	}

	public async installPackageDependencies(
		feature: AbstractFeature,
		didUpdateHandler?: InternalUpdateHandler
	) {
		const packagesToInstall: string[] = []
		const devPackagesToInstall: string[] = []
		const packagesInstalled: NpmPackage[] = []

		feature.packageDependencies.forEach((pkg) => {
			const packageName = `${pkg.name}@${pkg.version ?? 'latest'}`

			packagesInstalled.push(pkg)

			didUpdateHandler?.(`Checking node dependency: ${pkg.name}`)

			if (pkg.isDev) {
				devPackagesToInstall.push(packageName)
			} else {
				packagesToInstall.push(packageName)
			}
		})

		const pkgService = this.Service('pkg')

		if (packagesToInstall.length > 0) {
			didUpdateHandler?.(
				`Installing ${packagesToInstall.length} node dependenc${
					packagesToInstall.length === 1
						? 'y.'
						: 'ies using. NPM is slow, so this may take a sec....'
				}.`
			)
			await pkgService.install(packagesToInstall, {})
		}

		if (devPackagesToInstall.length > 0) {
			didUpdateHandler?.(
				`Now installing ${packagesToInstall.length} DEV node dependenc${
					packagesToInstall.length === 1
						? 'y.'
						: 'ies using NPM. NPM is slow, so this may take a sec....'
				}.`
			)
			await pkgService.install(devPackagesToInstall, {
				isDev: true,
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

			if (
				aDependsOnB ||
				aFeature.installOrderWeight < bFeature.installOrderWeight
			) {
				return 1
			} else if (
				bDependsOnA ||
				aFeature.installOrderWeight > bFeature.installOrderWeight
			) {
				return -1
			}
			return 0
		})
	}

	public Service<S extends Service>(type: S, cwd?: string): ServiceMap[S] {
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
