import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './features.types'

export default class CircleCIFeature extends AbstractFeature {
	public code: FeatureCode = 'circleCi'
	public nameReadable = 'CircleCi'
	public description =
		'CircleCI: Creates a CircleCI config that can be used to automate CI tests and versioning'

	// public async beforePackageInstall() {
	// 	throw new Error('Use directory template creation outside a feature')
	// 	// await this.writeDirectoryTemplate({
	// 	// 	kind: DirectoryTemplateKind.CircleCi,
	// 	// 	context: {}
	// 	// })
	// }
}
