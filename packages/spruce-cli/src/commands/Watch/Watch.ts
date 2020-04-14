/* eslint-disable @typescript-eslint/no-var-requires */
import readline from 'readline'
import { Command } from 'commander'
import chokidar, { FSWatcher } from 'chokidar'
import minimatch from 'minimatch'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'
import { FieldType } from '@sprucelabs/schema'
import { IWatchers } from '../../stores/WatcherStore'

enum WatchAction {
	Add = 'a',
	Edit = 'e',
	List = 'l',
	Unwatch = 'u',
	Quit = 'q'
}

// Const watchChoices = [
// 	{
// 		label: 'Add a pattern',
// 		value: WatchAction.Add
// 	},
// 	{
// 		label: 'Edit a pattern',
// 		value: WatchAction.Edit
// 	},
// 	{
// 		label: 'Unwatch a pattern',
// 		value: WatchAction.Unwatch
// 	}
// ]

export default class WatchCommand extends AbstractCommand {
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
		readline.emitKeypressEvents(process.stdin)
		process.stdin.setRawMode(true)
		process.stdin.on('keypress', this.handleKeypress.bind(this))
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

	private async showStatus(lines?: string[]) {
		this.clear()
		this.section({
			headline: 'Spruce Watcher',
			lines: [
				'Use these commands:',
				'  l - list all watchers',
				'  a - create a new watcher',
				'  e - edit a watcher',
				'  q - quit'
			]
		})

		if (lines) {
			this.writeLns(lines)
		}
	}

	/** Loads the watchers and starts watching anything new */
	private async loadWatchers() {
		const watchers = this.stores.watcher.getWatchers()
		this.watchers = watchers
	}

	// TODO
	// private async showMenu() {
	// 	const action = await this.prompt({
	// 		type: FieldType.Select,
	// 		label: 'What should we do?',
	// 		options: {
	// 			choices: watchChoices
	// 		}
	// 	})

	// 	if (action) {
	// 		await this.handleSelection(action as WatchAction)
	// 	}
	// }

	private async handleReady() {
		this.clear()
		this.showStatus()
	}

	private async handleFileChange(path: string) {
		log.trace(`${path} changed`)
		let commandsToExecute: string[] = []
		// Check if the path matches any of the glob patterns
		Object.keys(this.watchers).forEach(pattern => {
			const isMatch = minimatch(path, pattern)

			if (isMatch) {
				// Execute the command
				const cmd = this.watchers[pattern]
				commandsToExecute = commandsToExecute.concat(cmd)
			}
		})

		if (commandsToExecute.length > 0) {
			await this.startLoading(
				`Executing ${commandsToExecute.length} watcher commands`
			)
			const promises = commandsToExecute.map(c => this.executeCommand(c))
			const results = await Promise.allSettled(promises)
			await this.stopLoading()
			const lines: string[] = []
			results.forEach(result => {
				if (result.status === 'fulfilled') {
					lines.push(result.value.stdout)
				}
			})
			this.showStatus(lines)
		} else {
			log.trace('Nothing run. No matching glob patterns.')
		}
	}

	private handleFileAdd(path: string) {
		log.trace(`${path} added`)
	}

	private handleWatcherError(e: Error) {
		log.crit(e)
		this.reject(e)
	}

	// Private async handleSelection(
	// 	/** The selected action */
	// 	selection: WatchAction
	// ) {
	// 	log.debug(`Selection made: ${selection}`)

	// 	switch (selection) {
	// 		case WatchAction.Add:
	// 		case WatchAction.Add.toUpperCase():
	// 			await this.handleAddPatten()
	// 			break

	// 		case WatchAction.Edit:
	// 		case WatchAction.Edit.toUpperCase():
	// 			break

	// 		default:
	// 			break
	// 	}
	// }

	private async handleAddPatten() {
		this.isPromptActive = true
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
		this.isPromptActive = false
	}

	private async handleKeypress(str: string, key: readline.Key) {
		try {
			if (key.ctrl && key.name === 'c') {
				this.resolve()
			} else if (key.name === 'escape') {
				this.showStatus()
			} else {
				if (this.isPromptActive) {
					// The prompt is up so we shouldn't handle this keypress
					return
				}

				switch (str) {
					case WatchAction.Add:
					case WatchAction.Add.toUpperCase():
						await this.handleAddPatten()
						break

					case WatchAction.Quit:
					case WatchAction.Quit.toUpperCase():
						this.resolve()
						break

					case WatchAction.List:
					case WatchAction.List.toUpperCase():
						this.listWatchers()
						break

					default:
						break
				}
			}
		} catch (e) {
			log.debug('Nothing to do')
		}
	}

	private async listWatchers() {
		const lines: string[] = []

		Object.keys(this.watchers).forEach(pattern => {
			const commands = this.watchers[pattern]
			lines.push(`Pattern: ${pattern}`)
			lines.push(`Commands:`)
			commands.forEach(command => {
				lines.push(`  ${command}`)
			})
			lines.push('\n')
		})

		this.section({
			headline: 'Current watchers',
			lines
		})
	}
}
