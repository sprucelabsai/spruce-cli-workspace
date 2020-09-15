import { templates } from '@sprucelabs/spruce-templates'
import ServiceFactory from '../services/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import { IGraphicsInterface } from '../types/cli.types'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode } from './features.types'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
import VsCodeFeature from './vscode/VsCodeFeature'
import WatchFeature from './watch/WatchFeature'

export default class FeatureInstallerFactory {
	private static readonly features: any[] = [
		CircleCIFeature,
		ErrorFeature,
		SchemaFeature,
		SkillFeature,
		TestFeature,
		VsCodeFeature,
		EventFeature,
		WatchFeature,
	]

	public static readonly featureCodes: FeatureCode[] = [
		'circleCi',
		'error',
		'schema',
		'skill',
		'test',
		'vscode',
		'event',
		'watch',
	]

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
		storeFactory: StoreFactory
		featureInstaller?: FeatureInstaller
		term: IGraphicsInterface
	}): FeatureInstaller {
		const { cwd, serviceFactory, storeFactory, term } = options

		// lazy load installer
		const featureInstaller =
			options.featureInstaller ?? new FeatureInstaller(cwd, serviceFactory)

		this.features.forEach((item) => {
			const feature = new item({
				cwd,
				serviceFactory,
				templates,
				storeFactory,
				featureInstaller,
				term,
			})

			featureInstaller.mapFeature(feature.code, feature)
		})

		return featureInstaller
	}
}
