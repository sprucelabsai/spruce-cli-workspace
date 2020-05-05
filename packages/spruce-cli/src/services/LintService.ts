import { CLIEngine } from 'eslint'
import AbstractService from './AbstractService'

export interface IAddOptions {
	dev?: boolean
}

export default class LintService extends AbstractService {
	/** Lint fix */
	public async fix(
		/** The file or pattern to run eslint --fix on */
		pattern: string
	) {
		const cli = new CLIEngine({
			fix: true,
			cwd: this.cwd
		})

		// https://eslint.org/docs/developer-guide/nodejs-api#cliengineexecuteonfiles
		// TODO: Make this async or wait for eslint to support it https://github.com/eslint/rfcs/pull/4
		const result = cli.executeOnFiles([pattern])

		return result
	}
}
