import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import featuresUtil from '../../features/feature.utilities'

export default class CommandGeneratorTest extends AbstractCliTest {
	@test()
	protected static async hasAliasGenerated() {
		assert.isFunction(featuresUtil.generateCommandAliases)
	}
}
