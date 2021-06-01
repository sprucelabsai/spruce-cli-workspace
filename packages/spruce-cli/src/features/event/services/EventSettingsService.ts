import { SettingsService } from '@sprucelabs/spruce-skill-utils'

export default class EventSettingsService {
	private settings: SettingsService<string>
	public constructor(settings: SettingsService) {
		this.settings = settings
	}

	public getLastSyncOptions() {
		return this.settings.get('events.lastSync')
	}

	public setLastSyncOptions(options: {
		shouldSyncOnlyCoreEvents?: boolean | null
	}) {
		this.settings.set('events.lastSync', options)
	}
}
