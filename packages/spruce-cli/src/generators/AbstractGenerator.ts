import fs from 'fs'
import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { DirectoryTemplateCode, Templates } from '@sprucelabs/spruce-templates'
import {
	FileDescription,
	GeneratedFile,
	GraphicsInterface,
	UpgradeMode,
} from '../types/cli.types'

export type GenerationResults = GeneratedFile[]

export interface GeneratorOptions {
	templates: Templates
	term: GraphicsInterface
	askBeforeUpdating?: boolean
	upgradeMode?: UpgradeMode
	fileDescriptions: FileDescription[]
}

export default abstract class AbstractGenerator {
	protected templates: Templates
	private ui: GraphicsInterface
	private upgradeMode: UpgradeMode
	private fileDescriptions: FileDescription[] = []

	public constructor(options: GeneratorOptions) {
		this.templates = options.templates
		this.ui = options.term
		this.upgradeMode = options.upgradeMode
		this.fileDescriptions = options.fileDescriptions
	}

	protected async writeDirectoryTemplate(options: {
		destinationDir: string
		code: DirectoryTemplateCode
		filesToWrite?: string[]
		context: any
	}) {
		const { context, destinationDir, filesToWrite } = options

		const files = await this.templates.directoryTemplate({
			kind: options.code,
			context: context ?? {},
		})

		let results: GenerationResults = []

		for (const generated of files) {
			if (!filesToWrite || filesToWrite.indexOf(generated.filename) > -1) {
				results = await this.writeFileIfChangedMixinResults(
					pathUtil.join(destinationDir, generated.relativePath),
					generated.contents,
					'',
					results
				)
			}
		}

		return results
	}

	protected async writeFileIfChangedMixinResults(
		destination: string,
		contents: string,
		description: string,
		results?: GenerationResults
	): Promise<GenerationResults> {
		const myResults: GenerationResults = results ?? []
		let desc: string | undefined = description

		const name = pathUtil.basename(destination)
		let action: GeneratedFile['action'] = 'skipped'

		if (diskUtil.isDir(destination)) {
			throw new Error(`Can't write to a directory ${destination}.`)
		}

		if (!diskUtil.doesFileExist(destination)) {
			diskUtil.writeFile(destination, contents)
			action = 'generated'
		} else if (
			diskUtil.isFileDifferent(destination, contents) &&
			this.shouldOverwriteIfChanged(destination)
		) {
			let write = true

			if (this.shouldAskForOverwrite()) {
				write = await this.ui.confirm(`Overwrite ${destination}?`)
			}

			if (write) {
				diskUtil.writeFile(destination, contents)
				action = 'updated'
			}
		}

		if (!desc) {
			desc = this.getFileDescription(destination)?.description
		}

		if (!desc) {
			throw new Error(
				`No FileDescription provided for ${destination}. Check your feature's fileDescriptions property.`
			)
		}

		myResults.push({ name, description: desc, path: destination, action })

		return myResults
	}

	private shouldOverwriteIfChanged(destination: string): boolean {
		if (!this.upgradeMode) {
			return true
		}

		if (this.upgradeMode === 'forceEverything') {
			return true
		}

		let description: FileDescription | undefined = this.getFileDescription(
			destination
		)

		return description?.shouldOverwriteWhenChanged ?? false
	}

	private getFileDescription(destination: string): FileDescription | undefined {
		const lower = destination.toLowerCase()
		for (const d of this.fileDescriptions ?? []) {
			if (lower.search(d.path.toLowerCase()) > -1) {
				return d
			}
		}

		return undefined
	}

	private shouldAskForOverwrite() {
		if (this.upgradeMode === 'askEverything') {
			return true
		}

		return false
	}

	protected resolveFilenameWithFallback(
		dirOrFile: string,
		fallbackFileName: string
	) {
		const isDir =
			diskUtil.doesDirExist(dirOrFile) &&
			fs.lstatSync(dirOrFile).isDirectory() &&
			pathUtil.extname(dirOrFile).length === 0
		return isDir ? diskUtil.resolvePath(dirOrFile, fallbackFileName) : dirOrFile
	}
}
