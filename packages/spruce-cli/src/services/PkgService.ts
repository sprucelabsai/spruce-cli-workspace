import pathUtil from 'path'
import fs from 'fs-extra'
import { set } from 'lodash'
import SpruceError from '../errors/SpruceError'
import CommandService from './CommandService'

export interface IAddOptions {
	dev?: boolean
}

export default class PkgService extends CommandService {
	public get(path: string) {
		const contents = this.readPackage()
		return contents[path]
	}

	public set(options: { path: string; value: string | Record<string, any> }) {
		const { path, value } = options
		const contents = this.readPackage()
		const updated = set(contents, path, value)
		const destination = pathUtil.join(this.cwd, 'package.json')

		fs.outputFileSync(destination, JSON.stringify(updated, null, 2))
	}

	public readPackage(): Record<string, any | undefined> {
		const packagePath = pathUtil.join(this.cwd, 'package.json')

		try {
			const contents = fs.readFileSync(packagePath).toString()
			const parsed = JSON.parse(contents)

			return parsed
		} catch (err) {
			throw new SpruceError({
				code: 'FAILED_TO_IMPORT',
				file: packagePath,
				originalError: err,
			})
		}
	}

	public isInstalled(pkg: string) {
		try {
			const contents = this.readPackage()

			return !!contents.dependencies?.[pkg] || !!contents.devDependencies?.[pkg]
		} catch (e) {
			return false
		}
	}

	public async install(pkg: string[] | string, options?: IAddOptions) {
		const packages = Array.isArray(pkg) ? pkg : [pkg]
		let install = false
		for (const thisPackage of packages) {
			if (!this.isInstalled(thisPackage)) {
				install = true
				break
			}
		}
		if (install) {
			const args: string[] = ['add', ...packages]
			if (options?.dev) {
				args.push('--dev')
			}

			await this.execute('yarn', {
				args,
			})
		}
	}
}
