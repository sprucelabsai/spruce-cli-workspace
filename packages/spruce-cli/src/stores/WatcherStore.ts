import AbstractStore, { IBaseStoreSettings, StoreScope } from './AbstractStore'

type CommandToExecute = string
export interface IWatchers {
	[globbyPattern: string]: CommandToExecute[]
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
			watchers[globbyPattern] = []
		}
		watchers[globbyPattern].push(cmd)
		this.writeValue('watchers', watchers)
	}
}
