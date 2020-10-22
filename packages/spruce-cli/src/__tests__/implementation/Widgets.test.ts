import { Readable, Writable } from 'stream'
import { test, assert } from '@sprucelabs/test'
import SpruceError from '../../errors/SpruceError'
import AbstractCliTest from '../../test/AbstractCliTest'
import WidgetFactory from '../../widgets/WidgetFactory'

class MockInput extends Writable {}
class MockOutput extends Readable {}

export default class WidgetsTest extends AbstractCliTest {
	private static factory: WidgetFactory

	protected static async beforeEach() {
		this.factory = new WidgetFactory({
			debug: true,
			input: new MockInput(),
			output: new MockOutput(),
		})
	}

	@test()
	protected static async canCreateFactory() {
		assert.isTruthy(this.factory)
	}

	@test()
	protected static async canCreateLogWidget() {
		const log = this.buildLog()
		assert.isTruthy(log)
	}

	@test()
	protected static async createsLogWhereExpected() {
		const log = this.buildLog()
		const frame = log.getFrame()
		assert.isEqualDeep(frame, { left: 0, top: 0, width: 4, height: 4 })
	}

	@test()
	protected static async canSetStartingPaddingTop() {
		this.factory.setPaddingTop(0.9)
		const log = this.buildLog()
		assert.isEqualDeep(log.getFrame(), {
			left: 0,
			top: 0.9,
			width: 4,
			height: 4,
		})
	}

	@test()
	protected static async canRenderTwoWidgetsSideBySide() {
		const firstLog = this.buildLog()
		const secondLog = this.factory.Widget('table', { width: 6, height: 6 })

		assert.isEqualDeep(firstLog.getFrame(), {
			left: 0,
			top: 0,
			width: 4,
			height: 4,
		})

		assert.isEqualDeep(secondLog.getFrame(), {
			left: 4,
			top: 0,
			width: 6,
			height: 6,
		})
	}

	@test()
	protected static async canRenderWithoutAutoLayout() {
		const box1 = this.factory.Widget('box', {
			width: 4,
			height: 4,
			useAutoLayout: false,
		})
		const box2 = this.factory.Widget('box', {
			width: 4,
			height: 4,
			useAutoLayout: false,
		})

		assert.isEqualDeep(box1.getFrame(), {
			left: 0,
			top: 0,
			width: 4,
			height: 4,
		})

		assert.isEqualDeep(box2.getFrame(), {
			left: 0,
			top: 0,
			width: 4,
			height: 4,
		})
	}

	@test()
	protected static async cantUsePercentageWidthOrHeightWithAutoLayoutEnabled() {
		const err = assert.doesThrow(
			() =>
				this.factory.Widget('box', {
					width: '100%',
					height: '100%',
				}),
			/can't use percentage sizes/
		) as SpruceError

		if (err.options.code === 'INVALID_PARAMETERS') {
			assert.isEqualDeep(err.options.parameters, ['width', 'height'])
		} else {
			assert.fail('Bad error returned')
		}
	}

	private static buildLog() {
		return this.factory.Widget('log', { width: 4, height: 4 })
	}
}
