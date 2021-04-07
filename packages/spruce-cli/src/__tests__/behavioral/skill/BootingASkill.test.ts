import { test, assert } from '@sprucelabs/test'
import findProcess from 'find-process'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class BootingASkillTest extends AbstractCliTest {
	@test()
	protected static async bootingWithoutBuildingThrowsGoodError() {
		const cli = await this.install()

		await assert.doesThrowAsync(
			async () => cli.getFeature('skill').Action('boot').execute({}),
			/You must build/gis
		)
	}

	@test()
	protected static async aSkillCanBeBootedAndKilled() {
		const cli = await this.install()

		await this.Service('build').build()

		const response = await cli.getFeature('skill').Action('boot').execute({})

		const pid = response.meta?.pid
		assert.isAbove(pid, 0)

		const psResults = await findProcess('pid', pid)
		assert.isAbove(psResults.length, 0)

		response.meta?.kill()

		await this.wait(1000)

		const psResultsEmpty = await findProcess('pid', pid)
		assert.isLength(psResultsEmpty, 0)

		await response.meta?.promise
	}

	private static async install() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures('skills')
		return cli
	}
}
