import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class SettingUpViewsTest extends AbstractCliTest {
	@test()
	protected static async canGetViewFeature() {
		const cli = await this.Cli()
		const feature = cli.getFeature('view')
		assert.isTruthy(feature)
	}
}
