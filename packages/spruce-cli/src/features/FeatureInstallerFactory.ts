import { templates } from '@sprucelabs/spruce-templates'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory from '../services/ServiceFactory'
import StoreFactory from '../stores/StoreFactory'
import { GraphicsInterface } from '../types/cli.types'
import CircleCIFeature from './CircleCIFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode } from './features.types'
import NodeFeature from './node/NodeFeature'
import OnboardFeature from './onboard/OnboardFeature'
import PersonFeature from './person/PersonFeature'
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
		NodeFeature,
		OnboardFeature,
		PersonFeature,
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
		'node',
		'onboard',
		'person',
	]

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
		storeFactory: StoreFactory
		featureInstaller?: FeatureInstaller
		ui: GraphicsInterface
		emitter: GlobalEmitter
	}): FeatureInstaller {
		const { cwd, serviceFactory, storeFactory, ui, emitter } = options

		// lazy load installer
		const featureInstaller =
			options.featureInstaller ?? new FeatureInstaller(cwd, serviceFactory)

		this.features.forEach((Feature) => {
			const feature = new Feature({
				cwd,
				serviceFactory,
				templates,
				storeFactory,
				featureInstaller,
				ui,
				emitter,
			})

			featureInstaller.mapFeature(feature.code, feature)
		})

		return featureInstaller
	}
}
