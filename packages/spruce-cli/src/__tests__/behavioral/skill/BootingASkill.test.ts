import { test, assert } from '@sprucelabs/test'
import findProcess from 'find-process'
import AbstractCliTest from '../../../tests/AbstractCliTest'

export default class BootingASkillTest extends AbstractCliTest {
	@test()
	protected static async bootingWithoutBuildingThrowsGoodError() {
		const cli = await this.install()

		await assert.doesThrowAsync(async () => {
			const response = await cli.getFeature('skill').Action('boot').execute({})
			await response.meta?.promise
		}, /You must build/gis)
	}

	private static async install() {
		const fixture = this.FeatureFixture()
		const cli = await fixture.installCachedFeatures('skills')
		return cli
	}

	@test()
	protected static async aSkillCanBeBootedAndKilled() {
		const cli = await this.install()

		await this.Service('build').build()

		const response = await cli.getFeature('skill').Action('boot').execute({})
		const pid = response.meta?.pid

		assert.isAbove(pid, 0)

		// make sure it's running
		const psResults = await findProcess('pid', pid)
		assert.isAbove(psResults.length, 0)

		// kill the skill
		response.meta?.kill()

		const psResultsEmpty = await findProcess('pid', pid)
		assert.isLength(psResultsEmpty, 0)
	}
}
