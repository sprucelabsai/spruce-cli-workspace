// import { CLIEngine } from 'eslint'
import fs from 'fs-extra'
import log from '../lib/log'
import AbstractService from './AbstractService'

export interface IAddOptions {
	dev?: boolean
}

export default class LintService extends AbstractService {
	/** Lint fix based on a glob. Returns an array of filepaths that were fixed. */
	public async fix(
		/** The file or pattern to run eslint --fix on */
		pattern: string
	): Promise<string[]> {
		const { stdout } = await this.services.child.executeCommand('node', {
			args: [
				'-e',
				`"try { const ESLint = require('eslint');const cli = new ESLint.CLIEngine({fix: true,cwd: '${this.cwd}'});const result=cli.executeOnFiles(['${pattern}']);console.log(JSON.stringify(result)); } catch(err) { console.log(err.toString()); }"`
			]
		})

		const fixedPaths: string[] = []

		const fixedFiles = JSON.parse(stdout)

		if (fixedFiles.results) {
			for (let i = 0; i < fixedFiles.results.length; i += 1) {
				const fixedFile = fixedFiles.results[i]
				if (fixedFile && fixedFile.output) {
					await fs.writeFile(fixedFile.filePath, fixedFile.output)
					log.trace(`Fixed file: ${fixedFile.filePath}`)
					fixedPaths.push(fixedFile.filePath)
				}
			}
		}

		return fixedPaths
	}
}
