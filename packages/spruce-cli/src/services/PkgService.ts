import AbstractService from './AbstractService'
import fs from 'fs-extra'
import pathUtil from 'path'
import { set } from 'lodash'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'
import { WriteMode } from '../types/cli'

export interface IAddOptions {
	dev?: boolean
}

export default class PkgService extends AbstractService {
	public get(path: string, dir = this.cwd) {
		const contents = this.readPackage(dir)

		return contents[path]
	}

	public set(options: {
		path: string
		value: string | Record<string, any>
		mode?: WriteMode
		dir?: string
	}) {
		const { path, value, mode = WriteMode.Skip, dir = this.cwd } = options
		log.trace('Setting package.json', { path, value, dir })
		const contents = this.readPackage(dir)
		const pathExists = typeof contents[path] !== 'undefined'

		if (pathExists && mode === WriteMode.Throw) {
			throw new SpruceError({
				code: ErrorCode.KeyExists,
				friendlyMessage: `${path} already exists in package.json`,
				key: path
			})
		}

		if (!pathExists || mode === WriteMode.Overwrite) {
			const updated = set(contents, path, value)
			const destination = pathUtil.join(dir, 'package.json')

			fs.outputFileSync(destination, JSON.stringify(updated, null, 2))
		}
	}

	/** Read a package.json */
	public readPackage(dir?: string): Record<string, any | undefined> {
		const source = dir ?? this.cwd
		const packagePath = pathUtil.join(source, 'package.json')
		log.trace('Reading package.json', { path: packagePath })
		const contents = fs.readFileSync(packagePath).toString()
		try {
			const parsed = JSON.parse(contents)
			return parsed
		} catch (err) {
			throw new SpruceError({
				code: ErrorCode.FailedToImport,
				file: packagePath,
				originalError: err,
				friendlyMessage: 'Bad JSON'
			})
		}
	}

	/** Check if a package is installed */
	public isInstalled(pkg: string, dir?: string) {
		try {
			const contents = this.readPackage(dir)
			return !!contents.dependencies?.[pkg] || !!contents.devDependencies?.[pkg]
		} catch (e) {
			return false
		}
	}

	/** Install a package */
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

			await this.services.child.executeCommand('yarn', {
				args
			})
		}
	}
}
