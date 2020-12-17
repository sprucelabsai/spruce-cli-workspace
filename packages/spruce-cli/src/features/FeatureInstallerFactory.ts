import { templates } from '@sprucelabs/spruce-templates'
import { GlobalEmitter } from '../GlobalEmitter'
import ServiceFactory from '../services/ServiceFactory'
import { ApiClientFactory } from '../stores/AbstractStore'
import StoreFactory from '../stores/StoreFactory'
import { GraphicsInterface } from '../types/cli.types'
import { FeatureOptions } from './AbstractFeature'
import ErrorFeature from './error/ErrorFeature'
import EventFeature from './event/EventFeature'
import FeatureInstaller from './FeatureInstaller'
import { FeatureCode } from './features.types'
import NodeFeature from './node/NodeFeature'
import OnboardFeature from './onboard/OnboardFeature'
import OrganizationFeature from './organization/OrganizationFeature'
import PersonFeature from './person/PersonFeature'
import SchemaFeature from './schema/SchemaFeature'
import SkillFeature from './skill/SkillFeature'
import TestFeature from './test/TestFeature'
import VsCodeFeature from './vscode/VsCodeFeature'
import WatchFeature from './watch/WatchFeature'

export default class FeatureInstallerFactory {
	private static readonly features: any[] = [
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
		OrganizationFeature,
	]

	public static readonly featureCodes: FeatureCode[] = [
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
		'organization',
	]

	public static WithAllFeatures(options: {
		cwd: string
		serviceFactory: ServiceFactory
		storeFactory: StoreFactory
		featureInstaller?: FeatureInstaller
		ui: GraphicsInterface
		emitter: GlobalEmitter
		apiClientFactory: ApiClientFactory
	}): FeatureInstaller {
		const { cwd, serviceFactory, storeFactory, ui, emitter } = options

		const featureInstaller =
			options.featureInstaller ?? new FeatureInstaller(cwd, serviceFactory)

		const featureOptions: FeatureOptions = {
			cwd,
			serviceFactory,
			templates,
			storeFactory,
			featureInstaller,
			ui,
			emitter,
			apiClientFactory: options.apiClientFactory,
		}

		this.features.forEach((Feature) => {
			const feature = new Feature(featureOptions)

			featureInstaller.mapFeature(feature.code, feature)
		})

		return featureInstaller
	}
}
