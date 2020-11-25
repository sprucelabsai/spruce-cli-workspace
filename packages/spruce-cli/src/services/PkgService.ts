import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import fs from 'fs-extra'
import { set } from 'lodash'
import SpruceError from '../errors/SpruceError'
import CommandService from './CommandService'

export interface AddOptions {
	dev?: boolean
}

export default class PkgService extends CommandService {
	public get(path: string) {
		const contents = this.readPackage()
		return contents[path]
	}

	public set(options: {
		path: string
		value: string | Record<string, any> | undefined
	}) {
		const { path, value } = options
		const contents = this.readPackage()
		const updated = set(contents, path, value)
		const destination = pathUtil.join(this.cwd, 'package.json')

		fs.outputFileSync(destination, JSON.stringify(updated, null, 2))
	}

	public unset(path: string) {
		this.set({ path, value: undefined })
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

	public async install(pkg: string[] | string, options?: AddOptions) {
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

			args.push('--cache-folder', diskUtil.createRandomTempDir())

			await this.execute('yarn', {
				args,
			})
		}
	}

	public async uninstall(pkg: string[] | string) {
		const packages = Array.isArray(pkg) ? pkg : [pkg]
		const args: string[] = ['remove', ...packages]
		await this.execute('yarn', {
			args,
		})
	}
}
