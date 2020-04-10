/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from 'commander'
import chokidar, { FSWatcher } from 'chokidar'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'

type CommandToExecute = string

export interface IWatchConfig {
	[globbyPattern: string]: CommandToExecute
}

export default class WatchCommand extends AbstractCommand {
	private watcher!: FSWatcher
	/**  */
	// private resolve!: () => void
	private reject!: (e: Error) => void

	public attachCommands(program: Command): void {
		// TODO: add option to override globby
		// Or .autoloader
		program
			.command('watch')
			.description('Watch and regenerate types')
			.action(this.watch.bind(this))
	}

	private async watch() {
		log.debug(process.cwd())
		this.watcher = chokidar.watch('**/*.ts')
		this.watcher.on('change', this.onChange.bind(this))
		this.watcher.on('add', this.onChange.bind(this))
		this.watcher.on('error', this.onError.bind(this))

		const finishedPromise = new Promise((resolve, reject) => {
			// This.resolve = resolve
			this.reject = reject
		})
		await finishedPromise
	}

	private onChange(path: string) {
		log.debug(`${path} changed`)
	}

	private onError(e: Error) {
		this.reject(e)
	}

	private getWatchConfig(): IWatchConfig {
		// Default
		const defaultConfig: IWatchConfig = {
			'src/services/**/*Service.ts': 'autoloader -s Service ./src/services'
		}

		return defaultConfig
	}
}
