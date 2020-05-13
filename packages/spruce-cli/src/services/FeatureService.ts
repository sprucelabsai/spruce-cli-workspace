import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import _ from 'lodash'
import featuresAutoloader, {
	Feature,
	IFeatures
} from '#spruce/autoloaders/features'
import { IServices } from '#spruce/autoloaders/services'
import FormBuilder, { IFormOptions } from '../builders/FormBuilder'
import { IFeaturePackage } from '../features/AbstractFeature'
import log from '../lib/log'
import TerminalUtility from '../utilities/TerminalUtility'
import AbstractService, { IServiceOptions } from './AbstractService'

interface IInstallFeature {
	feature: Feature
	options?: Record<string, any>
}

export default class FeatureService extends AbstractService {
	private features!: IFeatures
	/** Convenience method that references this.utilities.terminal */
	private term: TerminalUtility

	public get cwd() {
		return this._cwd
	}

	public set cwd(newCwd: string) {
		if (newCwd) {
			this._cwd = newCwd
			if (this.features && newCwd) {
				Object.keys(this.features).forEach(f => {
					this.features[f].cwd = newCwd
				})
			}
		}
	}

	public constructor(options: IServiceOptions) {
		super(options)
		this.term = this.utilities.terminal
	}

	public async afterAutoload(siblings: IServices) {
		super.afterAutoload(siblings)

		log.trace('Loading features', { cwd: this.cwd })

		this.features = await featuresAutoloader({
			constructorOptions: {
				cwd: this.cwd,
				templates: this.templates,
				utilities: this.utilities,
				services: siblings
			}
		})
	}

	/** Install some features, prompting for info as needed */
	public async install(options: { features: IInstallFeature[] }) {
		const { features } = options

		let featuresToInstall: IInstallFeature[] = []

		for (let i = 0; i < features.length; i += 1) {
			const f = features[i]
			const isInstalled = await this.features[f.feature].isInstalled()
			if (!isInstalled) {
				featuresToInstall = featuresToInstall.concat(
					this.getFeatureDependencies(f)
				)
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
			const isInstalled = await this.features[f.feature].isInstalled()
			if (!isInstalled) {
				await this.installFeature(f)
			} else {
				log.debug(
					`Feature installation skipped because it's already installed: ${f.feature}`
				)
			}
		}
	}

	/** Check if features are installed */
	public async isInstalled(options: { features: Feature[]; cwd?: string }) {
		const cwd = options.cwd ?? this.cwd
		log.trace('FeatureService check', { cwd })
		const results = await Promise.all(
			options.features.map(f => {
				return this.features[f].isInstalled(cwd)
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
		installFeature: IInstallFeature,
		currentFeatures: IInstallFeature[] = []
	): IInstallFeature[] {
		let features: IInstallFeature[] = [installFeature]

		currentFeatures.push(installFeature)

		for (
			let i = 0;
			i < this.features[installFeature.feature].featureDependencies.length;
			i += 1
		) {
			const featureDependency = this.features[installFeature.feature]
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
			const description = this.features[f].description ?? f
			return {
				feature: f,
				description
			}
		})

		return availableFeatures
	}

	private async installFeature(installFeature: IInstallFeature): Promise<void> {
		const feature = this.features[installFeature.feature]
		this.term.info(`Beginning feature installation: ${installFeature.feature}`)
		let optionsSchema: ISchemaDefinition | undefined
		let isValid = false
		if (feature.optionsSchema) {
			optionsSchema = feature.optionsSchema()

			isValid = Schema.isDefinitionValid(optionsSchema)
		}
		let answers: Record<string, any> = {}
		if (isValid && optionsSchema) {
			const schema = new Schema(optionsSchema)
			const fieldNames = schema.getNamedFields()

			for (let i = 0; i < fieldNames.length; i += 1) {
				const fieldName = fieldNames[i]
				if (installFeature.options && installFeature.options[fieldName.name]) {
					// We don't need to prompt for this. Add it to the answers
					answers[fieldName.name] = installFeature.options[fieldName.name]
					delete optionsSchema.fields?.[fieldName.name]
				}
			}

			// Only present prompts if we don't already have the data
			if (
				optionsSchema.fields &&
				Object.keys(optionsSchema.fields).length > 0
			) {
				const formBuilder = this.formBuilder({
					definition: optionsSchema
				})
				const formAnswers = await formBuilder?.present()
				answers = {
					...answers,
					...formAnswers
				}
			}
		} else {
			log.debug(
				`Not prompting. Options schema is missing or invalid for: ${installFeature.feature}`
			)
		}

		this.term.startLoading(`[${installFeature.feature}]: Starting installation`)
		await feature.beforePackageInstall({
			// TODO: Figure out how to get the right type here
			// @ts-ignore
			answers
		})
		this.term.stopLoading()

		const packagesToInstall: string[] = []
		const devPackagesToInstall: string[] = []

		const packages: {
			[pkgName: string]: IFeaturePackage
		} = {}

		feature.packages.forEach(pkg => {
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
			this.term.startLoading(
				`[${installFeature.feature}]: Installing package.json dependencies`
			)
			await this.services.pkg.install(packagesToInstall)
			this.term.stopLoading()
		}
		if (devPackagesToInstall.length > 0) {
			this.term.startLoading(
				`[${installFeature.feature}]: Installing package.json devDependencies`
			)
			await this.services.pkg.install(devPackagesToInstall, {
				dev: true
			})
			this.term.stopLoading()
		}

		this.term.startLoading(`[${installFeature.feature}]: Finishing up`)
		await feature.afterPackageInstall({
			// TODO: Figure out how to get the right type here
			// @ts-ignore
			answers
		})
		this.term.stopLoading()

		this.term.info(`Feature installation complete: ${installFeature.feature}`)
	}

	/** Sorts installation features for dependency order. Mutates the array. */
	private sortInstallFeatures(features: IInstallFeature[]): void {
		features.sort((a, b) => {
			const aFeature = this.features[a.feature]
			const bFeature = this.features[b.feature]

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

	private formBuilder<T extends ISchemaDefinition>(
		options: Omit<IFormOptions<T>, 'term'>
	): FormBuilder<T> {
		const formBuilder = new FormBuilder({
			term: this.utilities.terminal,
			...options
		})
		return formBuilder
	}
}
