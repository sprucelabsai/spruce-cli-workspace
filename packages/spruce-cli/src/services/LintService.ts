// import { CLIEngine } from 'eslint'
import fs from 'fs-extra'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import CommandService from './CommandService'

export interface IAddOptions {
	dev?: boolean
}

export default class LintService extends CommandService {
	/** Lint fix based on a glob. Returns an array of filepaths that were fixed. */
	public fix = async (
		/** The file or pattern to run eslint --fix on */
		pattern: string
	): Promise<string[]> => {
		if (!pattern) {
			throw new SpruceError({
				code: ErrorCode.LintFailed,
				pattern: '***missing***',
				stdout: '***never run***',
			})
		}

		const { stdout } = await this.execute('node', {
			args: [
				'-e',
				`"try { const ESLint = require('eslint');const cli = new ESLint.CLIEngine({fix: true,cwd: '${this.cwd}'});const result=cli.executeOnFiles(['${pattern}']);console.log(JSON.stringify(result)); } catch(err) { console.log(err.toString()); }"`,
			],
		})

		const fixedPaths: string[] = []
		let fixedFiles: any = {}
		try {
			fixedFiles = JSON.parse(stdout)
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.LintFailed,
				pattern,
				stdout,
			})
		}

		if (fixedFiles.results) {
			for (let i = 0; i < fixedFiles.results.length; i += 1) {
				const fixedFile = fixedFiles.results[i]
				if (fixedFile && fixedFile.output) {
					await fs.writeFile(fixedFile.filePath, fixedFile.output)
					fixedPaths.push(fixedFile.filePath)
				}
			}
		}

		return fixedPaths
	}
}
