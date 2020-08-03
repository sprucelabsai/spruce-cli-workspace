import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureFixture from '../../fixtures/FeatureFixture'

export default class BuildServiceTest extends AbstractCliTest {
	@test()
	protected static buildServiceExists() {
		const service = this.Service('build')
		assert.isOk(service)
	}

	@test()
	protected static async canBuildSkill() {
		await this.installSkill('can-build')

		const testFile = "const test: string = 'hello world'"
		const destination = this.resolvePath('src/test.ts')
		diskUtil.writeFile(destination, testFile)

		const service = this.Service('build')
		await service.build()

		const builtFilePath = this.resolvePath('build/test.js')
		const contents = diskUtil.readFile(builtFilePath)

		assert.doesInclude(contents, "var test = 'hello world';")
	}

	@test()
	protected static async canWatchAndBuild() {
		await this.installSkill('can-build')

		const service = this.Service('build')
		service.watchStart()

		const testFile = "const test: string = 'hello world'"
		const destination = this.resolvePath('src/test-watch.ts')
		diskUtil.writeFile(destination, testFile)

		// give a second for build to complete
		await this.wait(5000)

		const builtFilePath = this.resolvePath('build/test-watch.js')
		const contents = diskUtil.readFile(builtFilePath)

		assert.doesInclude(contents, "var test = 'hello world';")

		await service.watchStop()
	}

	private static async installSkill(cacheKey?: string) {
		const fixture = new FeatureFixture(this.cwd)
		await fixture.installFeatures(
			[
				{
					code: 'skill',
					options: {
						name: 'builder-skill',
						description: 'Used for building tests',
					},
				},
			],
			cacheKey
		)
	}
}
