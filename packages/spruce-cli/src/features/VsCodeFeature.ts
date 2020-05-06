import { TemplateKind } from '@sprucelabs/spruce-templates'
import AbstractFeature from './AbstractFeature'

export default class VSCodeFeature extends AbstractFeature {
	public async beforePackageInstall() {
		await this.writeDirectoryTemplate({
			template: TemplateKind.Skill
		})
	}

	public async isInstalled() {
		return false
	}

	public async afterPackageInstall() {
		const extensions = await this.getVSCodeExtensions()
		console.log({ extensions })
	}

	private async getVSCodeExtensions() {
		const { stdout } = await this.services.child.executeCommand('code', {
			args: ['--list-extensions']
		})

		return stdout
	}
}
