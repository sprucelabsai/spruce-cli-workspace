import path from 'path'
import uuid from 'uuid'
import fs from 'fs-extra'
import BaseTest from '@sprucelabs/test'
import { IServices } from '#spruce/autoloaders/services'
import log from './lib/log'
import { setup } from './index'

export default class BaseCliTest extends BaseTest {
	protected static services: IServices
	protected static cwd: string

	protected static async beforeAll() {
		try {
			this.cwd = this.getTempDirectory()
			const result = await setup({
				cwd: this.cwd
			})
			this.services = result.services
		} catch (e) {
			log.crit(e)
		}
	}

	/** Get a clean, temporary directory for testing */
	protected static getTempDirectory() {
		const tmpDirectory = path.join(__dirname, '..', 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}
}
