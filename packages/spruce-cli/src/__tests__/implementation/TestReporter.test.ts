import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'
import TestReporter from '../../tests/TestReporter'

export default class TestReporterTest extends AbstractCliTest {
	private static reporter: TestReporter

	protected static async beforeEach() {
		await super.beforeEach()
		this.reporter = new TestReporter()
	}

	@test()
	protected static async canCreateReporter() {
		assert.isTrue(this.reporter instanceof TestReporter)
	}

	@test()
	protected static async hasRenderMethod() {
		assert.isFunction(this.reporter.render)
	}

	@test()
	protected static async cantFeedInResultsIfNotStarted() {
		assert.doesThrow(
			() => this.reporter.updateResults({ totalTestFiles: 0 }),
			/call start/
		)
	}
}
