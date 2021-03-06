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

		assert.isEqual(
			contents,
			`"use strict";
const testVar = 'hello world';
console.log(testVar);
//# sourceMappingURL=test.js.map`
		)
	}

	@test()
	protected static async canWatchAndBuild() {
		await this.installSkill('skills')

		const service = this.Service('build')
		void service.watchStart()

		const testFile = "const test: string = 'hello world'"
		const destination = this.resolvePath('src/test-watch.ts')

		diskUtil.writeFile(destination, testFile)

		const builtFilePath = this.resolvePath('build/test-watch.js')
		do {
			await this.wait(1000)
		} while (!diskUtil.doesFileExist(builtFilePath))

		const contents = diskUtil.readFile(builtFilePath)

		assert.isEqual(
			contents,
			`"use strict";
const test = 'hello world';
//# sourceMappingURL=test-watch.js.map`
		)

		await service.watchStop()
	}

	private static async installSkill(cacheKey?: string) {
		await this.FeatureFixture().installCachedFeatures(cacheKey ?? 'skills')
	}
}
