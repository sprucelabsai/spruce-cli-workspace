import { diskUtil, HASH_SPRUCE_DIR } from '@sprucelabs/spruce-skill-utils'
import { FeatureCode } from '../features/features.types'
import { Settings } from '../types/cli.types'

export default class SettingsService {
	private cwd: string
	private settings?: Settings
	public constructor(cwd: string) {
		this.cwd = cwd
	}

	public isMarkedAsInstalled(code: FeatureCode): boolean {
		const settings = this.loadSettings()
		return !!settings.installed?.find((c) => c === code)
	}

	public markAsInstalled(code: FeatureCode) {
		if (!this.isMarkedAsInstalled(code)) {
			const settings = this.loadSettings()
			if (!settings.installed) {
				settings.installed = []
			}
			if (settings.installed.indexOf(code) === -1) {
				settings.installed.push(code)
				this.saveSettings(settings)
			}
		}
	}

	public markAsPermanentlySkipped(code: FeatureCode) {
		const settings = this.loadSettings()
		if (!settings.skipped) {
			settings.skipped = []
		}

		if (settings.skipped.indexOf(code) === -1) {
			settings.skipped.push(code)
			this.saveSettings(settings)
		}
	}

	public isMarkedAsPermanentlySkipped(code: FeatureCode): boolean {
		const settings = this.loadSettings()
		return !!settings.skipped?.find((c) => c === code)
	}

	private loadSettings(): Settings {
		if (!this.settings) {
			const path = diskUtil.resolvePath(
				this.cwd,
				HASH_SPRUCE_DIR,
				'settings.json'
			)
			try {
				const contents = diskUtil.readFile(path)
				this.settings = JSON.parse(contents)
			} catch {
				this.settings = {}
			}
		}
		return this.settings as Settings
	}

	private saveSettings(settings: Settings) {
		const path = diskUtil.resolvePath(
			this.cwd,
			HASH_SPRUCE_DIR,
			'settings.json'
		)
		const contents = JSON.stringify(settings, null, 2)
		diskUtil.writeFile(path, contents)
	}
}
