import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import _ from 'lodash'
import CircleCIFeature from './features/CircleCIFeature'
import ErrorFeature from './features/ErrorFeature'
import SchemaFeature from './features/SchemaFeature'
import SkillFeature from './features/SkillFeature'
import TestFeature from './features/TestFeature'
import VSCodeFeature from './features/VsCodeFeature'
import PkgService from './services/PkgService'
import VsCodeService from './services/VsCodeService'
import log from './singletons/log'
import { INpmPackage } from './types/cli.types'

export interface IInstallFeature<F extends Feature = Feature> {
	feature: F
	options?: IFeatureMap[F]['optionsDefinition'] extends ISchemaDefinition
		? SchemaDefinitionValues<IFeatureMap[F]['optionsDefinition']>
		: undefined
}

interface IInstallFeatureOptions {
	features: IInstallFeature[]
	installFeatureDependencies?: boolean
}

export enum Feature {
	CircleCi = 'circleCi',
	Error = 'error',
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
	VsCode = 'vsCode'
}

export interface IFeatureMap {
	circleCi: CircleCIFeature
	error: ErrorFeature
	schema: SchemaFeature
	skill: SkillFeature
	test: TestFeature
	vsCode: VSCodeFeature
}

export default class FeatureManager {
	protected featureMap: IFeatureMap
	protected pkgService: PkgService
	private _cwd: string
	public constructor(
		cwd: string,
		featureMap: IFeatureMap,
		pkgService: PkgService
	) {
		this.cwd = this._cwd = cwd
		this.featureMap = featureMap
		this.pkgService = pkgService
	}
	public static WithAllFeatures(
		cwd: string,
		pkgService: PkgService,
		vsCodeService: VsCodeService
	): FeatureManager {
		const featureMap: IFeatureMap = {
			circleCi: new CircleCIFeature(cwd),
			error: new ErrorFeature(cwd, pkgService),
			schema: new SchemaFeature(cwd, pkgService),
			skill: new SkillFeature(cwd),
			test: new TestFeature(cwd, pkgService),
			vsCode: new VSCodeFeature(cwd, vsCodeService)
		}
		const manager = new FeatureManager(cwd, featureMap, pkgService)
		return manager
	}

	public set cwd(newCwd: string) {
		this._cwd = newCwd
		Object.keys(this.featureMap).forEach(
			key => (this.featureMap[key as keyof IFeatureMap].cwd = newCwd)
		)
	}

	public get cwd() {
		return this._cwd
	}

	public install = async (options: IInstallFeatureOptions) => {
		const { features, installFeatureDependencies = true } = options

		let featuresToInstall: IInstallFeature[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const isInstalled = await this.featureMap[f.feature].isInstalled()
			if (!isInstalled && installFeatureDependencies) {
				featuresToInstall = featuresToInstall.concat(
					this.getFeatureDependencies(f)
				)
			} else if (!isInstalled) {
				debugger
			} else {
				log.debug(
					`Feature prompts / dependencies skipped because it's already installed: ${f.feature}`
				)
			}
		}

		featuresToInstall = _.uniq(featuresToInstall)
		this.sortInstallFeatures(featuresToInstall)

		for (let i = 0; i < featuresToInstall.length; i += 1) {
			const f = featuresToInstall[i]
			const isInstalled = await this.featureMap[f.feature].isInstalled()
			if (!isInstalled) {
				await this.installFeature(f)
			} else {
				log.debug(
					`Feature installation skipped because it's already installed: ${f.feature}`
				)
			}
		}
	}

	public isInstalled = async (options: { features: Feature[] }) => {
		const results = await Promise.all(
			options.features.map(f => {
				return this.featureMap[f].isInstalled()
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

	public getFeature(code: Feature) {
		return this.featureMap[code]
	}

	public getFeatureDependencies = (
		installFeature: IInstallFeature,
		currentFeatures: IInstallFeature[] = []
	): IInstallFeature[] => {
		let features: IInstallFeature[] = [installFeature]

		currentFeatures.push(installFeature)

		for (
			let i = 0;
			i < this.featureMap[installFeature.feature].featureDependencies.length;
			i += 1
		) {
			const featureDependency = this.featureMap[installFeature.feature]
				.featureDependencies[i]

			const currentFeature = currentFeatures?.find(
				f => f.feature === featureDependency
			)

			if (!currentFeature) {
				features = this.getFeatureDependencies(
					{
						feature: featureDependency,
						options: installFeature.options
					},
					currentFeatures
				).concat(features)

				currentFeatures = currentFeatures.concat(features)
			}
		}

		this.sortInstallFeatures(features)
		return features
	}

	/** Gets available features */
	public getAvailableFeatures(): {
		feature: Feature
		description: string
	}[] {
		const availableFeatures = Object.values(Feature).map(f => {
			const description = this.featureMap[f].description ?? f
			return {
				feature: f,
				description
			}
		})

		return availableFeatures
	}

	private async installFeature(installFeature: IInstallFeature): Promise<void> {
		const feature = this.featureMap[installFeature.feature]
		await feature.beforePackageInstall(installFeature.options)

		const packagesToInstall: string[] = []
		const devPackagesToInstall: string[] = []

		const packages: {
			[pkgName: string]: INpmPackage
		} = {}

		feature.packageDependencies.forEach(pkg => {
			const packageName = `${pkg.name}@${pkg.version ?? 'latest'}`
			packages[packageName] = pkg
		})

		Object.values(packages).forEach(p => {
			if (p.isDev) {
				devPackagesToInstall.push(p.name)
			} else {
				packagesToInstall.push(p.name)
			}
		})

		if (packagesToInstall.length > 0) {
			await this.pkgService.install(packagesToInstall)
		}

		if (devPackagesToInstall.length > 0) {
			await this.pkgService.install(devPackagesToInstall, {
				dev: true
			})
		}

		await feature.afterPackageInstall(installFeature.options)
	}

	/** Sorts installation features for dependency order. Mutates the array. */
	private sortInstallFeatures(features: IInstallFeature[]): void {
		features.sort((a, b) => {
			const aFeature = this.featureMap[a.feature]
			const bFeature = this.featureMap[b.feature]

			const aDependsOnB = aFeature.featureDependencies.find(
				d => d === b.feature
			)
			const bDependsOnA = bFeature.featureDependencies.find(
				d => d === a.feature
			)

			if (aDependsOnB) {
				return 1
			} else if (bDependsOnA) {
				return -1
			}
			return 0
		})
	}
}
