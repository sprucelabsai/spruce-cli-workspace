import { Feature } from '#spruce/autoloaders/features'
import log from '../lib/log'
import AbstractService from './AbstractService'
import { IFeaturePackage } from '../features/AbstractFeature'
// import { SpruceEvents } from '../types/events-generated'
// import SpruceError from '../errors/SpruceError'
// import { ErrorCode } from '#spruce/errors/codes.types'

export default class FeatureService extends AbstractService {
	/** Install some features! */
	public async install(
		features: { feature: Feature; options?: Record<string, any> }[]
	) {
		log.debug('FeatureService.install()', { features })
		// Get the packages we need to install for each feature
		const packages: {
			[pkgName: string]: IFeaturePackage
		} = {}

		const beforePackageInstallPromises: Promise<void>[] = []
		const afterPackageInstallPromises: Promise<void>[] = []

		features.forEach(f => {
			const feature = this.features[f.feature]
			beforePackageInstallPromises.push(feature.beforePackageInstall(f.options))
			afterPackageInstallPromises.push(feature.afterPackageInstall(f.options))
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

		// const promises = features.map(f => {
		// 	this.features[f.feature].install(f.options)
		// })

		// await Promise.allSettled(promises)
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
}
