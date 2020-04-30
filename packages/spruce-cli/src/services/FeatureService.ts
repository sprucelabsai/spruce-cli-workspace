import _ from 'lodash'
import Schema, {
	ISchemaDefinition,
	SchemaDefinitionValues
} from '@sprucelabs/schema'
import { Feature, IFeatures } from '#spruce/autoloaders/features'
import log from '../lib/log'
import AbstractService from './AbstractService'
import { IFeaturePackage } from '../features/AbstractFeature'
import { IServices } from '../../.spruce/autoloaders/services'
import featuresAutoloader from '#spruce/autoloaders/features'
import AbstractCommand from '../commands/AbstractCommand'

interface IInstallFeature {
	feature: Feature
	options?: Record<string, any>
}

export default class FeatureService extends AbstractService {
	private features!: IFeatures

	public async afterAutoload(siblings: IServices) {
		super.afterAutoload(siblings)

		this.features = await featuresAutoloader({
			constructorOptions: {
				cwd: this.cwd,
				utilities: this.utilities,
				services: siblings
			}
		})
	}

	/** Install some features, prompting for info as needed */
	public async install(options: {
		command?: AbstractCommand
		features: IInstallFeature[]
	}) {
		const { features } = options
		log.debug('FeatureService.install()', { features })
		// Get the packages we need to install for each feature
		const packages: {
			[pkgName: string]: IFeaturePackage
		} = {}

		let featuresToInstall: IInstallFeature[] = []

		const promptDefinitions: {
			installFeature: IInstallFeature
			def: ISchemaDefinition
		}[] = []
		const answers: {
			[featureName: string]: {
				[fieldName: string]: string | boolean | number
			}
			// [featureName: string]: Record<string, any>
		} = {}

		features.forEach(f => {
			answers[f.feature] = {}
			if (typeof this.features[f.feature].optionsSchema !== 'undefined') {
				const optionsSchema = _.cloneDeep(
					this.features[f.feature].optionsSchema
				) as ISchemaDefinition
				const schema = new Schema(optionsSchema)
				const fieldNames = schema.getNamedFields()

				fieldNames.forEach(fieldName => {
					if (f.options && f.options[fieldName.name]) {
						// We don't need to prompt for this. Add it to the answers
						answers[f.feature][fieldName.name] = f.options[fieldName.name]
						delete optionsSchema.fields?.[fieldName.name]
					}
				})

				promptDefinitions.push({ installFeature: f, def: optionsSchema })
			}
			featuresToInstall = featuresToInstall.concat(
				this.getFeatureDependencies(f)
			)
		})

		for (let i = 0; i < promptDefinitions.length; i += 1) {
			const promptDefinition = promptDefinitions[i]
			const formBuilder = options.command?.formBuilder({
				definition: promptDefinition.def
			})
			const results = await formBuilder?.present()
			answers[promptDefinition.installFeature.feature] = {
				...answers[promptDefinition.installFeature.feature],
				...results
			}

			log.debug({ results })
		}

		const beforePackageInstallPromises: Promise<void>[] = []
		const afterPackageInstallPromises: Promise<void>[] = []

		features.forEach(f => {
			const feature = this.features[f.feature]
			beforePackageInstallPromises.push(
				feature.beforePackageInstall({
					// @ts-ignore
					answers: answers[f.feature]
				})
			)
			// afterPackageInstallPromises.push(
			// 	feature.afterPackageInstall({ answers: answers[f.feature] })
			// )
			feature.packages.forEach(pkg => {
				const packageName = `${pkg.name}@${pkg.version ?? 'latest'}`
				packages[packageName] = pkg
			})
		})

		await Promise.all(beforePackageInstallPromises)

		const packagesToInstall: string[] = []
		const devPackagesToInstall: string[] = []

		Object.values(packages).forEach(p => {
			if (p.isDev) {
				devPackagesToInstall.push(p.name)
			} else {
				packagesToInstall.push(p.name)
			}
		})

		if (packagesToInstall.length > 0) {
			await this.services.pkg.install(packagesToInstall)
		}
		if (devPackagesToInstall.length > 0) {
			await this.services.pkg.install(devPackagesToInstall, {
				dev: true
			})
		}

		await Promise.all(afterPackageInstallPromises)
	}

	/** Check if features are installed */
	public async isInstalled(options: { features: Feature[]; cwd?: string }) {
		const results = await Promise.all(
			options.features.map(f => {
				return this.features[f].isInstalled(options.cwd)
			})
		)

		log.debug({ features: this.features, options, results })

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

		return features
	}
}
