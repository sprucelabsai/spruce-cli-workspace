import semver from 'semver'
import log from '../singletons/log'
import commandUtil from '../utilities/command.utility'

const VSCODE_MINIMUM_VERSION = '1.44.0'

export interface IExtension {
	/** The vscode extension id like dbaeumer.vscode-eslint  */
	id: string
	/** A friendly name / description that will describe what the extension is or does */
	label: string
}

export default class VsCodeService {
	public cwd: string
	public constructor(cwd: string) {
		this.cwd = cwd
	}
	/** Returns whether or not vscode is installed */
	public async isInstalled(): Promise<boolean> {
		const isInstalled = false
		try {
			const { stdout } = await commandUtil.execute('code', this.cwd, {
				args: ['--version']
			})

			const lines = stdout.split('\n')
			if (
				lines &&
				lines[0] &&
				semver.satisfies(lines[0], `>=${VSCODE_MINIMUM_VERSION}`)
			) {
				return true
			}
		} catch (e) {
			log.trace(e)
		}

		return isInstalled
	}

	public async getVSCodeExtensions(): Promise<string[]> {
		let extensions: string[] = []

		try {
			const { stdout } = await commandUtil.execute('code', this.cwd, {
				args: ['--list-extensions']
			})

			extensions = stdout.split('\n')
		} catch (e) {
			log.warn(
				'VSCode extensions not installed. Check that VSCode is installed and the "code" cli tool is available. See https://code.visualstudio.com/docs/setup/setup-overview for more information.'
			)
		}

		return extensions
	}

	public async installExtensions(extensions: IExtension[]) {
		const extensionIds = extensions.map(e => e.id)
		let args: string[] = []
		extensionIds.forEach(eId => {
			args = args.concat('--install-extension', eId)
		})
		try {
			const { stdout } = await commandUtil.execute('code', this.cwd, {
				args
			})

			log.debug('VSCode installed extensions', stdout)
		} catch (e) {
			log.warn(
				'VSCode extensions not installed. Check that VSCode is installed and the "code" cli tool is available. See https://code.visualstudio.com/docs/setup/setup-overview for more information.'
			)
		}
	}
}
