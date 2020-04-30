import path from 'path'
import uuid from 'uuid'
import fs from 'fs-extra'
import BaseTest from '@sprucelabs/test'

export default class BaseCliTest extends BaseTest {
	/** Get a clean, temporary directory for testing */
	protected static getTempDirectory() {
		const tmpDirectory = path.join(__dirname, '..', 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}
}
