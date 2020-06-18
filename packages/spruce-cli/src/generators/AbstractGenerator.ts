import { Templates } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import { IAutoloaded } from '#spruce/autoloaders'
import { IServices } from '#spruce/autoloaders/services'
import { IStores } from '#spruce/autoloaders/stores'
import { IUtilities } from '#spruce/autoloaders/utilities'
import Autoloadable from '../Autoloadable'

export interface IGeneratorOptions {
	templates: Templates
	cwd: string
}

export default abstract class AbstractGenerator extends Autoloadable {
	public utilities!: IUtilities
	public templates: Templates
	public services!: IServices
	public cwd: string
	public stores!: IStores

	public constructor(options: IGeneratorOptions) {
		super(options)
		const { templates, cwd } = options
		this.templates = templates
		this.cwd = cwd
	}

	public async afterAutoload(autoloaded: IAutoloaded) {
		this.utilities = autoloaded.utilities
		this.services = autoloaded.services
		this.stores = autoloaded.stores
	}

	/** Write a file to a place handling all directory creation (overwrites everything) */
	public writeFile(destination: string, contents: string) {
		fs.outputFileSync(destination, contents)
	}

	/** Read a file */
	public readFile(source: string) {
		if (!fs.existsSync(source)) {
			return ''
		}
		return fs.readFileSync(source).toString()
	}

	/** Delete a file */
	public deleteFile(destination: string) {
		if (fs.existsSync(destination)) {
			fs.removeSync(destination)
		}
	}

	/** Delete a directory and all it's contents */
	public deleteDir(destination: string) {
		if (fs.existsSync(destination)) {
			fs.removeSync(destination)
		}
	}

	/** Does this file exist */
	public doesFileExist(destination: string) {
		return fs.existsSync(destination)
	}
}
