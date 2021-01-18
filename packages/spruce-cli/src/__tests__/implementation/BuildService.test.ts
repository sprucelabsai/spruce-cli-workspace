import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class BuildServiceTest extends AbstractCliTest {
	@test()
	protected static buildServiceExists() {
		const service = this.Service('build')
		assert.isTruthy(service)
	}

	@test()
	protected static async canBuildSkill() {
		await this.installSkill('skills')

		const testFile = "const testVar = 'hello world'\nconsole.log(testVar)\n"
		const destination = this.resolvePath('src/test.ts')
		diskUtil.writeFile(destination, testFile)

		const service = this.Service('build')
		await service.build()

		const builtFilePath = this.resolvePath('build/test.js')
		const contents = diskUtil.readFile(builtFilePath)

		assert.doesInclude(contents, "var testVar = 'hello world';")
	}

	@test()
	protected static async canWatchAndBuild() {
		await this.installSkill('skills')

		const service = this.Service('build')
		void service.watchStart()

		const testFile = "const test: string = 'hello world'"
		const destination = this.resolvePath('src/test-watch.ts')

		diskUtil.writeFile(destination, testFile)

		await this.wait(10000)

		const builtFilePath = this.resolvePath('build/test-watch.js')
		const contents = diskUtil.readFile(builtFilePath)

		assert.doesInclude(contents, "var test = 'hello world';")

		await service.watchStop()
	}

	private static async installSkill(cacheKey?: string) {
		await this.FeatureFixture().installCachedFeatures(cacheKey ?? 'skills')
	}
}
