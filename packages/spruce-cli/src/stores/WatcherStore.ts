import AbstractStore, { IBaseStoreSettings, StoreScope } from './AbstractStore'

type CommandToExecute = string
export interface IWatchers {
	[globbyPattern: string]: {
		isEnabled: boolean
		commands: CommandToExecute[]
	}
}

export interface IWatcherStoreSettings extends IBaseStoreSettings {
	watchers: IWatchers
}

export default class WatcherStore extends AbstractStore<IWatcherStoreSettings> {
	public name = 'watcher'
	public scope = StoreScope.Local

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

	/** Deletes a globby pattern / command */
	public deleteWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		// @ts-ignore unset this key
		watchers[globbyPattern] = undefined
		this.writeValue('watchers', watchers)
	}

	/** Enable or disable multiple watchers */
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

	/** Enables a watcher as long as it has previously been set */
	public enableWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		if (typeof watchers[globbyPattern]?.isEnabled === 'boolean') {
			watchers[globbyPattern].isEnabled = true
		}
		this.writeValue('watchers', watchers)
	}

	/** Disables a watcher if it's been set */
	public disableWatcher(globbyPattern: string) {
		const watchers = this.getWatchers()
		if (typeof watchers[globbyPattern]?.isEnabled === 'boolean') {
			watchers[globbyPattern].isEnabled = false
		}
		this.writeValue('watchers', watchers)
	}
}
