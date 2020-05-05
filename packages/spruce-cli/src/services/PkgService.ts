import AbstractService from './AbstractService'
import fs from 'fs-extra'
import pathUtil from 'path'
import { set } from 'lodash'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'

export interface IAddOptions {
	dev?: boolean
}

export default class PkgService extends AbstractService {
	public get(path: string, dir = this.cwd) {
		const contents = this.readPackage(dir)

		return contents[path]
	}

	public set(
		path: string,
		value: string | Record<string, any>,
		dir = this.cwd
	) {
		log.trace('Setting package.json', { path, value, dir })
		const contents = this.readPackage(dir)
		const updated = set(contents, path, value)
		const destination = pathUtil.join(dir, 'package.json')

		fs.outputFileSync(destination, JSON.stringify(updated, null, 2))
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
		const contents = this.readPackage(dir)
		return !!contents.dependencies?.[pkg] || !!contents.devDependencies?.[pkg]
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

	/** Lint everything */
	// public async lintFix() {
	// 	await this.services.child.executeCommand('yarn', {
	// 		args: ['lint:fix']
	// 	})
	// }

	// public async setupSkill() {
	// 	await this.install(['@sprucelabs/path-resolver'])
	// 	await this.install(['ts-node'], { dev: true })
	// }

	// public async setupForSchemas() {
	// 	await this.setupSkill()
	// 	await this.install(['@sprucelabs/schema'])
	// }

	// /** Set all the things needed for testing */
	// public async setupForTesting() {
	// 	await this.setupSkill()
	// 	await this.setupForSchemas()

	// 	await this.install(['@sprucelabs/test', 'ava', 'ts-node'], {
	// 		dev: true
	// 	})

	// 	// Update package.json appropriately
	// 	this.set('scripts.test', 'ava **/*.test.ts')
	// 	this.set('scripts.test:watch', 'ava  **/*.test.ts --watch')
	// 	this.set('ava', {
	// 		extensions: ['ts'],
	// 		require: ['ts-node/register']
	// 	})
	// }

	// /** Everything needed for errors */
	// public async setupForErrors() {
	// 	await this.install('@sprucelabs/error')
	// }
}
