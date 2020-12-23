/* eslint-disable no-unreachable */
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../../errors/SpruceError'
import { FileDescription } from '../../types/cli.types'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class VsCodeFeature extends AbstractFeature {
	public nameReadable = 'VSCode'
	public description = 'Create settings and install VSCode extensions'
	public code: FeatureCode = 'vscode'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public readonly fileDescriptions: FileDescription[] = [
		{
			path: '.vscode/launch.json',
			description: 'Sets you up for debugging in Visual Studio Code.',
			shouldOverwriteWhenChanged: true,
			confirmPromptOnFirstWrite: 'Want me to setup debugging for you?',
		},
		{
			path: '.vscode/tasks.json',
			description:
				'command+shift+t to open the Test Reporter, build watch on load, etc.',
			shouldOverwriteWhenChanged: true,
			confirmPromptOnFirstWrite:
				'Want me to setup tasks for building and testing?',
		},
		{
			path: '.vscode/settings.json',
			description: 'Ties everything together for optimal team productivity.',
			shouldOverwriteWhenChanged: true,
			confirmPromptOnFirstWrite:
				'Want me to setup vscode settings for building, testing and linting on save?',
		},
	]

	public isInstalled = async () => {
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
