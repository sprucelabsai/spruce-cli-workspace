import AbstractFeature from './AbstractFeature'

export default class CircleCIFeature extends AbstractFeature {
	public description =
		'CircleCI: Creates a CircleCI config that can be used to automate CI tests and versioning'

	// public async beforePackageInstall() {
	// 	throw new Error('Use directory template creation outside a feature')
	// 	// await this.writeDirectoryTemplate({
	// 	// 	kind: DirectoryTemplateKind.CircleCi,
	// 	// 	context: {}
	// 	// })
	// }

	public getActions() {
		return []
	}

	public async isInstalled() {
		return true
		// return this.templates.isValidTemplatedDirectory({
		// 	kind: DirectoryTemplateKind.CircleCi,
		// 	dir: dir || this.cwd
		// })
	}
}
