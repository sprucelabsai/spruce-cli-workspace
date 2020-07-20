import readline from 'readline'
import chokidar, { FSWatcher } from 'chokidar'
import { Command } from 'commander'
import _ from 'lodash'
import minimatch from 'minimatch'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import log from '../singletons/log'
import WatcherStore, { IWatchers } from '../stores/WatcherStore'
import { IGraphicsTextEffect } from '../types/cli.types'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

enum WatchAction {
	Add = 'a',
	Delete = 'd',
	Edit = 'e',
	List = 'l',
	Quit = 'q',
}

/** Debounce keypresses triggering add/change/remove events */
const DEBOUNCE_MS = 100

interface IWatchCommandOptions extends ICommandOptions {
	stores: {
		watch: WatcherStore
	}
}

export default class WatchCommand extends AbstractCommand {
	private watcherStore: WatcherStore
	private watcher!: FSWatcher
	private watchers: IWatchers = {}
	private resolve!: () => void
	private reject!: (e: Error) => void

	public attachCommands = (program: Command): void => {
		program
			.command('watch')
			.description('Watch and regenerate types')
			.action(this.watch)
	}
	private watch = async () => {
		process.stdin.on('keypress', this.handleKeypress)
		this.loadWatchers()

		this.watcher = chokidar.watch('**/*', {
			ignoreInitial: true,
		})

		this.watcher.on('change', _.debounce(this.handleFileChange, DEBOUNCE_MS))
		this.watcher.on('add', _.debounce(this.handleFileAdd, DEBOUNCE_MS))
		this.watcher.on('error', this.handleWatcherError)
		this.watcher.on('ready', this.handleReady)

		const finishedPromise = new Promise((resolve, reject) => {
			this.resolve = resolve
			this.reject = reject
		})
		await finishedPromise
	}
	private resetReadline = () => {
		readline.emitKeypressEvents(process.stdin)
		process.stdin.setRawMode(true)
		process.stdin.resume()
	}
	private showStatus = (
		lines?: string[],
		lineEffects?: IGraphicsTextEffect[]
	) => {
		this.resetReadline()
		this.term.clear()
		this.term.renderSection({
			headline: 'Spruce Watcher',
			lines: [
				'Use these commands:',
				'  l - list all watchers',
				'  a - create a new watcher',
				'  d - delete a watcher',
				'  e - edit a watcher',
				'  q - quit',
			],
		})

		if (lines) {
			this.term.renderLines(lines, lineEffects)
		}
	}
	/** Loads the watchers and starts watching anything new */
	private loadWatchers = () => {
		const watchers = this.watcherStore.getWatchers()
		this.watchers = watchers
	}
	private handleReady = () => {
		this.term.clear()
		this.showStatus()
	}
	private handleFileChange = async (path: string) => {
		log.trace(`${path} changed`)
		let commandsToExecute: string[] = []
		// Check if the path matches any of the glob patterns
		Object.keys(this.watchers).forEach((pattern) => {
			const isMatch = minimatch(path, pattern)

			if (isMatch) {
				// Execute the command
				const watcher = this.watchers[pattern]
				if (watcher.isEnabled) {
					commandsToExecute = commandsToExecute.concat(watcher.commands)
				} else {
					log.debug(`Pattern disabled: ${pattern}`)
				}
			}
		})

		if (commandsToExecute.length > 0) {
			await this.term.startLoading(
				`Executing ${commandsToExecute.length} watcher commands`
			)
			const commandService = this.CommandService()
			const promises = commandsToExecute.map((c) => commandService.execute(c))
			const results = await Promise.allSettled(promises)
			await this.term.stopLoading()
			const lines: string[] = []
			const lineEffects: IGraphicsTextEffect[] = []
			results.forEach((result) => {
				if (result.status === 'fulfilled') {
					lines.push(result.value.stdout)
				} else if (result.status === 'rejected') {
					lines.push('Error generating autoloader')
					lines.push(result.reason)
					lineEffects.push(IGraphicsTextEffect.Bold)
					lineEffects.push(IGraphicsTextEffect.Red)
				}
			})
			this.showStatus(lines, lineEffects)
		} else {
			log.trace('Nothing run. No matching glob patterns.')
		}
	}
	private handleFileAdd = (path: string) => {
		return this.handleFileChange(path)
	}
	private handleWatcherError = (e: Error) => {
		log.crit(e)
		this.reject(e)
	}
	private handleAddPatten = async () => {
		let pattern: string | undefined | null
		let commandStr: string | undefined | null
		let isPatternValid = false
		let isCmdValid = false
		while (!isPatternValid) {
			pattern = await this.term.prompt({
				type: FieldType.Text,
				label: 'What is the globby pattern to watch?',
				defaultValue: '',
			})

			if (pattern && pattern.length > 0) {
				isPatternValid = true
			}
		}

		while (!isCmdValid) {
			commandStr = await this.term.prompt({
				type: FieldType.Text,
				label: 'And what command should we run?',
				defaultValue: '',
			})
			if (commandStr && commandStr.length > 0) {
				isCmdValid = true
			}
		}

		this.watcherStore.addWatcher(pattern as string, commandStr as string)
		this.loadWatchers()
		this.showStatus()
	}

	private handleKeypress = async (str: string, key: readline.Key) => {
		try {
			if (key.ctrl && key.name === 'c') {
				this.resolve()
			} else if (key.name === 'escape') {
				// TODO: Figure out if there's a way to abort inquirer
				// this.showStatus()
			} else {
				if (this.term.isPromptActive) {
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

					case WatchAction.Edit:
					case WatchAction.Edit.toUpperCase():
						await this.handleEditWatchers()
						break

					case WatchAction.Delete:
					case WatchAction.Delete.toUpperCase():
						await this.handleDeleteWatcher()
						break

					default:
						break
				}
			}
		} catch (e) {
			log.debug('Nothing to do')
		}
	}
	private listWatchers = () => {
		const lines: string[] = []

		Object.keys(this.watchers).forEach((pattern) => {
			const watcher = this.watchers[pattern]
			const commands = watcher.commands
			lines.push(
				`Pattern: ${pattern} (${watcher.isEnabled ? 'ENABLED' : 'DISABLED'})`
			)
			lines.push(`Commands:`)
			commands.forEach((command) => {
				lines.push(`  ${command}`)
			})
			lines.push('\n')
		})

		this.term.renderSection({
			headline: 'Current watchers',
			lines,
		})
	}
	private handleEditWatchers = async () => {
		const defaultValue: string[] = []
		const choices = Object.keys(this.watchers).map((pattern) => {
			const watcher = this.watchers[pattern]
			if (watcher.isEnabled) {
				defaultValue.push(pattern)
			}
			return {
				label: `${pattern} (${watcher.commands.length})`,
				value: pattern,
			}
		})

		const result = await this.term.prompt({
			type: FieldType.Select,
			label: 'Enable or disable watchers',
			isRequired: true,
			isArray: true,
			defaultValue,
			options: {
				choices,
			},
		})

		const watchersToUpdate: {
			globbyPattern: string
			isEnabled: boolean
		}[] = Object.keys(this.watchers).map((pattern) => {
			const isEnabled = _.includes(result, pattern)

			return {
				globbyPattern: pattern,
				isEnabled,
			}
		})

		this.watcherStore.setWatchStatus(watchersToUpdate)
		await this.loadWatchers()
		this.showStatus()
		this.listWatchers()
	}
	private handleDeleteWatcher = async () => {
		const choices = Object.keys(this.watchers).map((pattern) => {
			const watcher = this.watchers[pattern]
			return {
				label: `${pattern} (${watcher.commands.length})`,
				value: pattern,
				checked: watcher.isEnabled,
			}
		})
		const result = await this.term.prompt({
			type: FieldType.Select,
			label: 'Select the watcher to delete',
			options: {
				choices,
			},
		})

		if (result) {
			this.watcherStore.deleteWatcher(result)
			await this.loadWatchers()
		}
		this.showStatus()
		this.listWatchers()
	}
	public constructor(options: IWatchCommandOptions) {
		super(options)
		this.watcherStore = options.stores.watch
	}
}
