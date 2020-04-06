import { IUtilities } from '../utilities'
import fs from 'fs-extra'
import { Templates } from '@sprucelabs/spruce-templates'
import { Log } from '@sprucelabs/log'
import { IServices } from '../services'

export interface IGeneratorOptions {
	utilities: IUtilities
	services: IServices
	templates: Templates
	log: Log
	cwd: string
}

export default class AbstractGenerator {
	public utilities: IUtilities
	public templates: Templates
	public services: IServices
	public log: Log
	public cwd: string

	public constructor(options: IGeneratorOptions) {
		const { utilities, templates, log, cwd, services } = options
		this.utilities = utilities
		this.templates = templates
		this.log = log
		this.cwd = cwd
		this.services = services
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

	/** Does this file exist */
	public doesFileExist(destination: string) {
		return fs.existsSync(destination)
	}
}
