import { IUtilities } from '#spruce/autoloaders/utilities'
import fs from 'fs-extra'
import { Templates } from '@sprucelabs/spruce-templates'
import { Log } from '@sprucelabs/log'
import { IServices } from '#spruce/autoloaders/services'
import { IStores } from '../../.spruce/autoloaders/stores'

export interface IGeneratorOptions {
	utilities: IUtilities
	services: IServices
	templates: Templates
	stores: IStores
	log: Log
	cwd: string
}

export default abstract class AbstractGenerator {
	public utilities: IUtilities
	public templates: Templates
	public services: IServices
	public cwd: string
	public stores: IStores

	public constructor(options: IGeneratorOptions) {
		const { utilities, templates, cwd, services, stores } = options
		this.utilities = utilities
		this.templates = templates
		this.cwd = cwd
		this.services = services
		this.stores = stores
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
