/* eslint-disable no-unreachable */
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../errors/SpruceError'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class VsCodeFeature extends AbstractFeature {
	public nameReadable = 'VSCode'
	public description = 'Create settings and install VSCode extensions'
	public code: FeatureCode = 'vscode'
	public dependencies: FeatureCode[] = []
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled() {
		return this.Service('vsCode').isInstalled()
	}

	public async afterPackageInstall() {
		throw new SpruceError({
			code: 'VSCODE_NOT_INSTALLED',
		})

		return {}
	}
}
