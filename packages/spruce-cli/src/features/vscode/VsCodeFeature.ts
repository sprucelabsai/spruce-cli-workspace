/* eslint-disable no-unreachable */
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../errors/SpruceError'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class VsCodeFeature extends AbstractFeature {
	public nameReadable = 'VSCode'
	public description = 'Create settings and install VSCode extensions'
	public code: FeatureCode = 'vscode'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public isInstalled = async () =>{
		const command = this.Service('command')
		
		try {
			await command.execute('which code')
		} catch (err) {
			throw new SpruceError({
				code: 'VSCODE_NOT_INSTALLED',
			})
		}


		return true
	}
}
