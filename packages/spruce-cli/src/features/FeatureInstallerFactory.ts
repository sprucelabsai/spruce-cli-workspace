import { templates } from '@sprucelabs/spruce-templates'
import generatorsAutoloader from '#spruce/autoloaders/generators'
import { IGenerators } from '#spruce/autoloaders/generators'
import ServiceFactory from '../factories/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import { IGraphicsInterface } from '../types/cli.types'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode } from './features.types'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
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

	public static readonly featureCodes: FeatureCode[] = [
		'circleCi',
		'error',
		'schema',
		'skill',
		'test',
		'vsCode',
	]

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
		generators?: IGenerators
		storeFactory: StoreFactory
		featureInstaller?: FeatureInstaller
		term: IGraphicsInterface
	}): FeatureInstaller {
		const { cwd, serviceFactory, storeFactory, term } = options

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
				featureInstaller,
				term,
			})

			featureInstaller.mapFeature(feature.code, feature)
		})

		return featureInstaller
	}
}
