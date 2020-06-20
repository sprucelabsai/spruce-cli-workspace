import AbstractLocalStore, { ILocalStoreSettings } from './AbstractLocalStore'

type CommandToExecute = string
export interface IWatchers {
	[globbyPattern: string]: {
		isEnabled: boolean
		commands: CommandToExecute[]
	}
}

export interface IWatcherStoreSettings extends ILocalStoreSettings {
	watchers: IWatchers
}

export default class WatcherStore extends AbstractLocalStore<
	IWatcherStoreSettings
> {
	public name = 'watcher'

	/** Get current watch commands */
	public getWatchers(): IWatchers {
		const watchers = this.readValue('watchers')

		return watchers || {}
	}

	/** Save a globby pattern / command */
	public addWatcher(globbyPattern: string, cmd: CommandToExecute) {
		const watchers = this.getWatchers()
		if (!watchers[globbyPattern]) {
			watchers[globbyPattern] = {
				isEnabled: true,
				commands: []
			}
		}
		watchers[globbyPattern].commands.push(cmd)
		this.writeValue('watchers', watchers)
	}

	public deleteWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		// @ts-ignore unset this key
		watchers[globbyPattern] = null
		this.writeValue('watchers', watchers)
	}

	public setWatchStatus(
		watchersToUpdate: { globbyPattern: string; isEnabled: boolean }[]
	) {
		const watchers = this.getWatchers()
		watchersToUpdate.forEach(wtu => {
			if (typeof watchers[wtu.globbyPattern]?.isEnabled === 'boolean') {
				watchers[wtu.globbyPattern].isEnabled = wtu.isEnabled
			}
		})
		this.writeValue('watchers', watchers)
	}

	public enableWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		if (typeof watchers[globbyPattern]?.isEnabled === 'boolean') {
			watchers[globbyPattern].isEnabled = true
		}
		this.writeValue('watchers', watchers)
	}

	public disableWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		if (typeof watchers[globbyPattern]?.isEnabled === 'boolean') {
			watchers[globbyPattern].isEnabled = false
		}
		this.writeValue('watchers', watchers)
	}
}
