/* eslint-disable @typescript-eslint/member-ordering */
import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { templates } from '@sprucelabs/spruce-templates'
import { uniq } from 'lodash'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import ServiceFactory, { Service } from '../factories/ServiceFactory'
import log from '../singletons/log'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './ErrorFeature'
import SchemaFeature from './SchemaFeature'
import SkillFeature from './SkillFeature'
import TestFeature from './TestFeature'
import VsCodeFeature from './VsCodeFeature'

export type FeatureOptions<
	F extends FeatureCode
> = IFeatureMap[F]['optionsDefinition'] extends ISchemaDefinition
	? SchemaDefinitionValues<IFeatureMap[F]['optionsDefinition']>
	: undefined

export interface IFeatureInstallResponse {}

export interface IInstallFeatureOptions<F extends FeatureCode> {
	features: InstallFeature[]
	installFeatureDependencies?: boolean
}

export enum FeatureCode {
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
	vsCode: VsCodeFeature
}

type InstallFeature =
	| { code: FeatureCode.CircleCi; options?: undefined }
	| { code: FeatureCode.Error; options?: undefined }
	| { code: FeatureCode.Schema; options?: undefined }
	| { code: FeatureCode.Skill; options: SpruceSchemas.Local.ISkillFeature }
	| { code: FeatureCode.Test; options?: undefined }
	| { code: FeatureCode.VsCode; options?: undefined }

export default class FeatureManager {
	public cwd: string
	private featureMap: IFeatureMap
	private serviceFactory: ServiceFactory

	public constructor(
		cwd: string,
		featureMap: IFeatureMap,
		serviceFactory: ServiceFactory
	) {
		this.cwd = cwd
		this.featureMap = featureMap
		this.serviceFactory = serviceFactory
	}

	public async isInstalled(options: { features: FeatureCode[] }) {
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

	public getFeatureDependencies(
		featureCode: FeatureCode,
		trackedFeatures: FeatureCode[] = []
	): FeatureCode[] {
		trackedFeatures.push(featureCode)

		const feature = this.featureMap[featureCode]
		const dependencies = feature.dependencies

		for (let i = 0; i < dependencies.length; i += 1) {
			trackedFeatures = this.trackFeatureDependencyIfNotTracked(
				dependencies[i],
				trackedFeatures
			)
		}

		return uniq(trackedFeatures)
	}

	public async install<F extends FeatureCode>(
		options: IInstallFeatureOptions<F>
	): Promise<IFeatureInstallResponse> {
		const { features, installFeatureDependencies = true } = options

		let codesToInstall: FeatureCode[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const code = f.code
			const isInstalled = await this.featureMap[code].isInstalled()
			if (!isInstalled && installFeatureDependencies) {
				codesToInstall = codesToInstall.concat(
					this.getFeatureDependencies(code)
				)
			} else if (!isInstalled) {
				debugger
				throw new Error('make custom error')
			}
		}

		codesToInstall = uniq(codesToInstall)
		codesToInstall = this.sortFeatures(codesToInstall)

		for (let i = 0; i < codesToInstall.length; i += 1) {
			const code = codesToInstall[i]
			const isInstalled = await this.featureMap[code].isInstalled()

			if (!isInstalled) {
				const installOptions = options.features.find(f => f.code === code)
					?.options

				await this.installFeature({
					code: codesToInstall[i],
					//@ts-ignore WHY!!??
					options: installOptions as FeatureOptions<F> | undefined
				})
			} else {
				log.debug(
					`Feature installation skipped because it's already installed: ${code}`
				)
			}
		}

		return {}
	}

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
	}): FeatureManager {
		const { cwd, serviceFactory } = options
		const featureMap: IFeatureMap = {
			circleCi: new CircleCIFeature({
				cwd,
				code: FeatureCode.CircleCi,
				serviceFactory,
				templates
			}),
			error: new ErrorFeature({
				cwd,
				code: FeatureCode.Error,
				serviceFactory,
				templates
			}),
			schema: new SchemaFeature({
				cwd,
				code: FeatureCode.Schema,
				serviceFactory,
				templates
			}),
			skill: new SkillFeature({
				cwd,
				code: FeatureCode.Skill,
				serviceFactory,
				templates
			}),
			test: new TestFeature({
				cwd,
				code: FeatureCode.Test,
				serviceFactory,
				templates
			}),
			vsCode: new VsCodeFeature({
				cwd,
				code: FeatureCode.VsCode,
				serviceFactory,
				templates
			})
		}
		const manager = new FeatureManager(cwd, featureMap, serviceFactory)
		return manager
	}

	private trackFeatureDependencyIfNotTracked(
		dependencyCode: FeatureCode,
		trackedFeatures: FeatureCode[]
	) {
		const isTracked = !!trackedFeatures.find(f => f === dependencyCode)
		if (!isTracked) {
			trackedFeatures.push(dependencyCode)

			const features = this.getFeatureDependencies(
				dependencyCode,
				trackedFeatures
			)
			trackedFeatures = trackedFeatures.concat(features)
		}
		return trackedFeatures
	}

	private async installFeature(installFeature: InstallFeature): Promise<void> {
		const feature = this.featureMap[installFeature.code] as AbstractFeature

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

		const pkgService = this.PkgService()

		if (packagesToInstall.length > 0) {
			await pkgService.install(packagesToInstall)
		}

		if (devPackagesToInstall.length > 0) {
			await pkgService.install(devPackagesToInstall, {
				dev: true
			})
		}

		await feature.afterPackageInstall(installFeature.options)
	}

	private sortFeatures(codes: FeatureCode[]): FeatureCode[] {
		return [...codes].sort((a, b) => {
			const aFeature = this.featureMap[a]
			const bFeature = this.featureMap[b]

			const aDependsOnB = aFeature.dependencies.find(d => d === b)
			const bDependsOnA = bFeature.dependencies.find(d => d === a)

			if (aDependsOnB) {
				return 1
			} else if (bDependsOnA) {
				return -1
			}
			return 0
		})
	}

	private PkgService() {
		return this.serviceFactory.Service(this.cwd, Service.Pkg)
	}

	public definitionForFeature(code: FeatureCode) {
		return this.featureMap[code].optionsDefinition
	}
}
