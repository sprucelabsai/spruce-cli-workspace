import { TemplateKind } from '@sprucelabs/spruce-templates'
import AbstractFeature from './AbstractFeature'

export default class CircleCIFeature extends AbstractFeature {
	public description =
		'CircleCI: Creates a CircleCI config that can be used to automate CI tests and versioning'

	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			template: TemplateKind.CircleCI
		})
	}

	public async isInstalled(
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	) {
		return this.containsAllTemplateFiles({
			templateKind: TemplateKind.CircleCI,
			dir
		})
	}
}
