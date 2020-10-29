import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../test/AbstractCliTest'
import TestReporter from '../../test/TestReporter'

export default class TestReporterTest extends AbstractCliTest {
	private static reporter: TestReporter
	private static paddingTop = 2

	protected static async beforeEach() {
		await super.beforeEach()
		this.reporter = new TestReporter({
			ui: this.ui,
			paddingTop: this.paddingTop,
		})
	}

	@test()
	protected static async canCreateReporter() {
		assert.isTrue(this.reporter instanceof TestReporter)
	}

	@test()
	protected static async startRendersProgress() {
		await this.reporter.start()
		assert.doesInclude(this.ui.invocations, { command: 'renderProgressBar' })
	}

	@test()
	protected static async hasRenderMethod() {
		assert.isFunction(this.reporter.render)
	}

	@test()
	protected static async startCapturesStartingYWithPadding() {
		this.ui.setCursorPosition({ x: 0, y: 10 })

		await this.reporter.start()

		const startY = this.reporter.getCurrentY()
		assert.isEqual(startY, 10 + this.paddingTop)
	}

	@test()
	protected static async cantFeedInResultsIfNotStarted() {
		assert.doesThrow(
			() => this.reporter.updateResults({ totalTestFiles: 0 }),
			/call start/
		)
	}
}
