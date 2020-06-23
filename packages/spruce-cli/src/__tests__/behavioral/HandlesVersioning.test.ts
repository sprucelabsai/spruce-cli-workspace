import { assert, test } from '@sprucelabs/test'
import BaseCliTest from '../../BaseCliTest'
import versionUtil from '../../utilities/version.utility'

export default class HandlesVersioningTest extends BaseCliTest {
	@test()
	protected static async hasResolvePathFunction() {
		assert.isFunction(versionUtil.resolvePath)
	}

	
}
