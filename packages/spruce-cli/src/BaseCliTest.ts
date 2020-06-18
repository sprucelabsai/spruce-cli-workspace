import path from 'path'
import BaseTest from '@sprucelabs/test'
import fs from 'fs-extra'
import uuid from 'uuid'
import { IServices } from '#spruce/autoloaders/services'
import { setup } from './index'
import log from './singletons/log'

export default class BaseCliTest extends BaseTest {
	protected static services: IServices

	protected static async beforeAll() {
		try {
			this.cwd = this.ensureTmpDirectory()
			const result = await setup({
				cwd: this.cwd
			})
			this.services = result.services
		} catch (e) {
			log.crit(e)
		}
	}

	/** Get a clean, temporary directory for testing */
	protected static ensureTmpDirectory() {
		const tmpDirectory = path.join(__dirname, '..', 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}
}
