import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { assert } from '@sprucelabs/test'
import AbstractCliTest from './AbstractCliTest'

export default class AbstractTestTest extends AbstractCliTest {
	protected static async installTests(
		cacheKey: 'tests' | 'testsInNodeModule' = 'tests'
	) {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures(cacheKey, {
			graphicsInterface: this.ui,
		})
		return cli
	}

	protected static fixBadTest(file: string) {
		const contents = diskUtil.readFile(file)
		const passingContent = contents.replace(
			'assert.isTrue(false)',
			'assert.isTrue(true)'
		)

		diskUtil.writeFile(file, passingContent)
	}

	protected static selectOptionBasedOnLabel(label: string) {
		const last = this.ui.lastInvocation()
		assert.doesInclude(last.options.options.choices, {
			label,
		})

		const match = last.options.options.choices.find(
			(o: any) => o.label === label
		)

		void this.ui.sendInput(`${match.value}`)
	}
}
