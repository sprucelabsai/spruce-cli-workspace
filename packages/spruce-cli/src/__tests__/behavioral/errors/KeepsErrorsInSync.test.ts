import { assert, test } from '@sprucelabs/test'
import AbstractCliTest from '../../../AbstractCliTest'

export default class KeepsErrorsInSyncTest extends AbstractCliTest {
	@test()
	protected static async hasSyncErrorAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('error').Action('sync').execute)
	}

	@test()
	protected static async syncErrorsUpdatesErrorClassFile() {}
}
