import { Feature } from '#spruce/autoloaders/features'
import log from '../lib/log'
import AbstractService from './AbstractService'
import { IFeaturePackage } from '../features/AbstractFeature'
// import { SpruceEvents } from '../types/events-generated'
// import SpruceError from '../errors/SpruceError'
// import { ErrorCode } from '#spruce/errors/codes.types'

export default class FeatureService extends AbstractService {
	/** Give me a phone and i'll send you a pin */
	public async install(
		features: { feature: Feature; options?: Record<string, any> }[]
	) {
		// Get the packages we need to install for each feature
		const packages: {
			[pkgName: string]: IFeaturePackage
		} = {}

		features.forEach(f => {
			const feature = this.features[f.feature]
			feature.packages.forEach(pkg => {
				const packageName = `${pkg.name}@${pkg.version ?? 'latest'}`
				packages[packageName] = pkg
			})
		})

		log.debug({})

		// const promises = features.map(f => {
		// 	this.features[f.feature].install(f.options)
		// })

		// await Promise.allSettled(promises)
	}
}
