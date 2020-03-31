import { IUtilities } from '../utilities'
import fs from 'fs-extra'
import { Templates } from '@sprucelabs/spruce-templates'

export interface IGeneratorOptions {
	utilities: IUtilities
	templates: Templates
}

export default abstract class AbstractGenerator {
	public utilities: IUtilities
	public templates: Templates

	public constructor(options: IGeneratorOptions) {
		const { utilities, templates } = options
		this.utilities = utilities
		this.templates = templates
	}
	/** write a file to a place handling all directory creation (overwrites everything) */
	public writeFile(destination: string, contents: string) {
		fs.outputFileSync(destination, contents)
	}

	/** read a file */
	public readFile(destination: string) {
		if (!fs.existsSync(destination)) {
			return ''
		}

		return fs.readFileSync(destination).toString()
	}

	/** delete a file */
	public deleteFile(destination: string) {
		if (fs.existsSync(destination)) {
			fs.removeSync(destination)
		}
	}

	/** does this file exist */
	public doesFileExist(destination: string) {
		return fs.existsSync(destination)
	}
}
