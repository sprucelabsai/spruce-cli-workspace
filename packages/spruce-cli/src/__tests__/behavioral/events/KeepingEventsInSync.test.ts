import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../../test/AbstractEventTest'

export default class KeepingEventsInSyncTest extends AbstractEventTest {
	@test()
	protected static async hasSyncEventsAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('event').Action('sync').execute)
	}
}
