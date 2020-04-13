/* eslint-disable @typescript-eslint/no-var-requires */
// import readline from 'readline'
import { Command } from 'commander'
import chokidar, { FSWatcher } from 'chokidar'
import minimatch from 'minimatch'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'
import { FieldType } from '@sprucelabs/schema'
import { IWatchers } from '../../stores/WatcherStore'

enum WatchAction {
	Add = 'add',
	Edit = 'edit',
	Unwatch = 'unwatch'
}

const watchChoices = [
	{
		label: 'Add a pattern',
		value: WatchAction.Add
	},
	{
		label: 'Edit a pattern',
		value: WatchAction.Edit
	},
	{
		label: 'Unwatch a pattern',
		value: WatchAction.Unwatch
	}
]

export default class WatchCommand extends AbstractCommand {
	private isDone = false
	private watcher!: FSWatcher
	/** Key / value where key is the glob and value is the command to execute */
	private watchers: IWatchers = {}
	/**  */
	private resolve!: () => void
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
		this.loadWatchers()
		// Watch everything. We'll check individual glob patterns on each file change
		this.watcher = chokidar.watch('**/*', {
			ignoreInitial: true
		})
		this.watcher.on('change', this.handleFileChange.bind(this))
		this.watcher.on('add', this.handleFileAdd.bind(this))
		this.watcher.on('error', this.handleWatcherError.bind(this))
		this.watcher.on('ready', this.handleReady.bind(this))

		const finishedPromise = new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
		})
		await finishedPromise
	}

	/** Loads the watchers and starts watching anything new */
	private async loadWatchers() {
		const watchers = this.stores.watcher.getWatchers()
		this.watchers = watchers
	}

	private async waitForInput() {
		const action = await this.prompt({
			type: FieldType.Select,
			label: 'What should we do?',
			options: {
				choices: watchChoices
			}
		})

		if (action) {
			await this.handleSelection(action as WatchAction)
		}
	}

	private async handleReady() {
		this.clear()
		// TODO: print out currently watched files
		while (!this.isDone) {
			await this.waitForInput()
		}
		this.resolve()
	}

	private handleFileChange(path: string) {
		log.debug(`${path} changed`)
		// Check if the path matches any of the glob patterns
		Object.keys(this.watchers).forEach(pattern => {
			const isMatch = minimatch(path, pattern)

			if (isMatch) {
				// Execute the command
				const cmd = this.watchers[pattern]
				log.debug(`Executing command: ${cmd}`)
			}
		})
	}

	private handleFileAdd(path: string) {
		log.debug(`${path} added`)
	}

	private handleWatcherError(e: Error) {
		log.crit(e)
		this.reject(e)
	}

	private async handleSelection(
		/** The selected action */
		selection: WatchAction
	) {
		log.debug(`Selection made: ${selection}`)

		switch (selection) {
			case WatchAction.Add:
			case WatchAction.Add.toUpperCase():
				await this.handleAddPatten()
				break

			case WatchAction.Edit:
			case WatchAction.Edit.toUpperCase():
				break

			default:
				break
		}
	}

	private async handleAddPatten() {
		let pattern: string | undefined
		let commandStr: string | undefined
		let isPatternValid = false
		let isCmdValid = false
		while (!isPatternValid) {
			pattern = await this.prompt({
				type: FieldType.Text,
				label: 'What is the globby pattern to watch?',
				defaultValue: ''
			})

			if (pattern && pattern.length > 0) {
				isPatternValid = true
			}
		}

		while (!isCmdValid) {
			commandStr = await this.prompt({
				type: FieldType.Text,
				label: 'And what command should we run?',
				defaultValue: ''
			})
			if (commandStr && commandStr.length > 0) {
				isCmdValid = true
			}
		}

		this.stores.watcher.addWatcher(pattern as string, commandStr as string)
		this.loadWatchers()
	}
}
