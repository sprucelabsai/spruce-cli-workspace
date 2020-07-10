import { templates } from '@sprucelabs/spruce-templates'
import generatorsAutoloader from '#spruce/autoloaders/generators'
import { IGenerators } from '#spruce/autoloaders/generators'
import ServiceFactory from '../factories/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './ErrorFeature'
import FeatureInstaller from './FeatureInstaller'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './SkillFeature'
import TestFeature from './TestFeature'
import VsCodeFeature from './VsCodeFeature'

export default class FeatureInstallerFactory {
	private static readonly features: any[] = [
		CircleCIFeature,
		ErrorFeature,
		SchemaFeature,
		SkillFeature,
		TestFeature,
		VsCodeFeature,
	]

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
		generators?: IGenerators
		storeFactory: StoreFactory
		featureInstaller?: FeatureInstaller
	}): FeatureInstaller {
		const { cwd, serviceFactory, storeFactory } = options

		// lazy load installer
		const featureInstaller =
			options.featureInstaller ?? new FeatureInstaller(cwd, serviceFactory)

		// lazy load generators
		const generators =
			options.generators ??
			generatorsAutoloader({
				constructorOptions: templates,
			})

		this.features.forEach((item) => {
			const feature = new item({
				cwd,
				serviceFactory,
				templates,
				generators,
				storeFactory,
				featureManager: featureInstaller,
			})

			featureInstaller.mapFeature(feature.code, feature)
		})

		return featureInstaller
	}
}
