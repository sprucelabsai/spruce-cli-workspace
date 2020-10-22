import { START_DIVIDER, END_DIVIDER } from '@sprucelabs/jest-json-reporter'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import JestJsonParser from '../../test/JestJsonParser'
export default class JestJsonParserTest extends AbstractSpruceTest {
	private static parser: JestJsonParser

	protected static async beforeEach() {
		await super.beforeEach()
		this.parser = new JestJsonParser()
	}

	@test()
	protected static canCreateJjp() {
		assert.isTruthy(this.parser.write)
	}

	@test()
	protected static canHandleSelfContainedWrite() {
		const data = this.generateTestResults(
			'testStart',
			'behavioral/errors/CreatingANewErrorBuilder.test.js'
		)
		this.parser.write(data)

		const testResults = this.parser.getResults()

		assert.isLength(testResults, 1)
		assert.isEqualDeep(testResults[0], {
			testFile: `behavioral/errors/CreatingANewErrorBuilder.test.ts`,
			status: 'running',
		})
	}

	private static generateTestResults(
		jestStatus: 'testStart' | 'testComplete',
		testFile: string
	) {
		return `${START_DIVIDER}{"status":"${jestStatus}","test":{"context":{"config":{"automock":false,"cache":true,"cacheDirectory":"/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/jest_dx","clearMocks":false,"coveragePathIgnorePatterns":["/node_modules/"],"cwd":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"extraGlobals":[],"forceCoverageMatch":[],"globals":{},"haste":{"computeSha1":false,"throwOnModuleCollision":false},"injectGlobals":true,"moduleDirectories":["node_modules"],"moduleFileExtensions":["js","json","jsx","ts","tsx","node"],"moduleNameMapper":[["^#spruce/schemas/fields/(.*)","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1"],["^#spruce/(.*)$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1"]],"modulePathIgnorePatterns":[],"name":"44406c6bd09f4805a9dd2ad1a17b150c","prettierPath":"prettier","resetMocks":false,"resetModules":false,"restoreMocks":false,"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","roots":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"],"runner":"jest-runner","setupFiles":[],"setupFilesAfterEnv":[],"skipFilter":false,"slowTestThreshold":5,"snapshotSerializers":[],"testEnvironment":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-environment-node/build/index.js","testEnvironmentOptions":{},"testLocationInResults":false,"testMatch":["**/__tests__/**/*.test.js?(x)"],"testPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/tmp/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/testDirsAndFiles/"],"testRegex":[],"testRunner":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-jasmine2/build/index.js","testURL":"http://localhost","timers":"real","transform":[[".[jt]sx?$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/babel-jest/build/index.js",{}]],"transformIgnorePatterns":["/node_modules/",".pnp.[^/]+$"],"watchPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/"]},"hasteFS":{"_rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","_files":{}},"moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"resolver":{"_options":{"extensions":[".js",".json",".jsx",".ts",".tsx",".node"],"hasCoreModules":true,"moduleDirectories":["node_modules"],"moduleNameMapper":[{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1","regex":{}},{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1","regex":{}}],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleIDCache":{},"_moduleNameCache":{},"_modulePathCache":{},"_supportsNativePlatform":false}},"duration":40472,"path":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/${testFile}"}}${END_DIVIDER}`
	}

	@test()
	protected static canHandleSelfContainedWriteWithTwoTests() {
		const data =
			this.generateTestResults(
				'testStart',
				'behavioral/errors/CreatingANewErrorBuilder.test.js'
			) +
			this.generateTestResults(
				'testStart',
				'behavioral/tests/RunningTests.test.js'
			)
		this.parser.write(data)

		const testResults = this.parser.getResults()

		assert.isLength(testResults, 2)
		assert.isEqualDeep(testResults, [
			{
				testFile: `behavioral/errors/CreatingANewErrorBuilder.test.ts`,
				status: 'running',
			},
			{
				testFile: `behavioral/tests/RunningTests.test.ts`,
				status: 'running',
			},
		])
	}

	@test()
	protected static multipleSelfContainedWritesWorks() {
		this.parser.write(
			this.generateTestResults(
				'testStart',
				`behavioral/errors/CreatingANewErrorBuilder.test.js`
			)
		)

		this.parser.write(
			this.generateTestResults(
				'testStart',
				`behavioral/tests/RunningTests.test.js`
			)
		)
		const testResults = this.parser.getResults()

		assert.isLength(testResults, 2)
		assert.isEqualDeep(testResults, [
			{
				testFile: `behavioral/errors/CreatingANewErrorBuilder.test.ts`,
				status: 'running',
			},
			{
				testFile: `behavioral/tests/RunningTests.test.ts`,
				status: 'running',
			},
		])
	}

	@test()
	protected static partialWriteReturnsNothing() {
		const data = this.generateTestResults(
			'testStart',
			'behavioral/errors/KeepingErrorsInSync.test.js'
		).substr(0, 100)

		this.parser.write(data)

		const testResults = this.parser.getResults()
		assert.isLength(testResults, 0)
	}

	@test()
	protected static canPartialWriteAcrossTwoWrites() {
		const data = this.generateTestResults(
			'testStart',
			'behavioral/errors/KeepingErrorsInSync.test.js'
		)

		const firstPart = data.substr(0, 100)
		const secondPart = data.substr(100)

		this.parser.write(firstPart)
		this.parser.write(secondPart)

		const testResults = this.parser.getResults()
		assert.isLength(testResults, 1)

		assert.isEqualDeep(testResults[0], {
			testFile: `behavioral/errors/KeepingErrorsInSync.test.ts`,
			status: 'running',
		})
	}

	@test()
	protected static canPartialWriteAndSelfContainedAcrossThreeWrites() {
		const data = this.generateTestResults(
			'testStart',
			'behavioral/errors/KeepingErrorsInSync.test.js'
		)

		const firstPart = data.substr(0, 100)
		const secondPart = data.substr(100)

		this.parser.write(firstPart)
		this.parser.write(secondPart)
		this.parser.write(
			this.generateTestResults(
				'testStart',
				'behavioral/tests/CreatingANewErrorBuilder.test.js'
			)
		)

		const testResults = this.parser.getResults()
		assert.isLength(testResults, 2)

		assert.isEqualDeep(testResults[0], {
			testFile: `behavioral/errors/KeepingErrorsInSync.test.ts`,
			status: 'running',
		})

		assert.isEqualDeep(testResults[1], {
			testFile: 'behavioral/tests/CreatingANewErrorBuilder.test.ts',
			status: 'running',
		})
	}

	@test()
	protected static canSelfContainedPlusPartial() {
		const firstSelfContained = this.generateTestResults(
			'testStart',
			`behavioral/errors/KeepingErrorsInSync.test.js`
		)
		const data =
			firstSelfContained +
			this.generateTestResults(
				'testStart',
				'behavioral/tests/CreatingANewErrorBuilder.test.js'
			)

		const splitIdx = firstSelfContained.length + 500
		const firstPart = data.substr(0, splitIdx)
		const secondPart = data.substr(splitIdx)

		this.parser.write(firstPart)
		this.parser.write(secondPart)

		const testResults = this.parser.getResults()
		assert.isLength(testResults, 2)

		assert.isEqualDeep(testResults[0], {
			testFile: `behavioral/errors/KeepingErrorsInSync.test.ts`,
			status: 'running',
		})

		assert.isEqualDeep(testResults[1], {
			testFile: 'behavioral/tests/CreatingANewErrorBuilder.test.ts',
			status: 'running',
		})
	}

	@test()
	protected static canHandleGarbageAtFrontOfData() {
		const data =
			'yarn test run\nother garbage' +
			this.generateTestResults(
				'testStart',
				'behavioral/errors/CreatingANewErrorBuilder.test.js'
			)
		this.parser.write(data)

		const testResults = this.parser.getResults()

		assert.isLength(testResults, 1)
		assert.isEqualDeep(testResults[0], {
			testFile: `behavioral/errors/CreatingANewErrorBuilder.test.ts`,
			status: 'running',
		})
	}

	@test()
	protected static canHandlesActualTestRests() {
		this.parser.write(
			'yarn run go team ***************************START_JSON_DIVIDER***************************'
		)
		this.parser.write(
			'{"status":"testStart","test":{"context":{"config":{"automock":false,"cache":true,"cacheDirectory":"/private/tmp/jest_dx","clearMocks":false,"coveragePathIgnorePatterns":["/node_modules/"],"cwd":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"extraGlobals":[],"forceCoverageMatch":[],"globals":{},"haste":{"computeSha1":false,"throwOnModuleCollision":false},"injectGlobals":true,"moduleDirectories":["node_modules"],"moduleFileExtensions":["js","json","jsx","ts","tsx","node"],"moduleNameMapper":[["^#spruce/schemas/fields/(.*)","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1"],["^#spruce/(.*)$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1"]],"modulePathIgnorePatterns":[],"name":"44406c6bd09f4805a9dd2ad1a17b150c","prettierPath":"prettier","resetMocks":false,"resetModules":false,"restoreMocks":false,"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","roots":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"],"runner":"jest-runner","setupFiles":[],"setupFilesAfterEnv":[],"skipFilter":false,"slowTestThreshold":5,"snapshotSerializers":[],"testEnvironment":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-environment-node/build/index.js","testEnvironmentOptions":{},"testLocationInResults":false,"testMatch":["**/__tests__/**/*.test.js?(x)"],"testPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/tmp/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/testDirsAndFiles/"],"testRegex":[],"testRunner":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-jasmine2/build/index.js","testURL":"http://localhost","timers":"real","transform":[[".[jt]sx?$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/babel-jest/build/index.js",{}]],"transformIgnorePatterns":["/node_modules/",".pnp.[^/]+$"],"watchPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/"]},"hasteFS":{"_rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","_files":{}},"moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"resolver":{"_options":{"extensions":[".js",".json",".jsx",".ts",".tsx",".node"],"hasCoreModules":true,"moduleDirectories":["node_modules"],"moduleNameMapper":[{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1","regex":{}},{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1","regex":{}}],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleIDCache":{},"_moduleNameCache":{},"_modulePathCache":{},"_supportsNativePlatform":false}},"duration":50540,"path":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/behavioral/tests/RunningTests.test.js"}}'
		)

		this.parser
			.write(`***************************END_JSON_DIVIDER***************************
			***************************START_JSON_DIVIDER***************************
			{"status":"testStart","test":{"context":{"config":{"automock":false,"cache":true,"cacheDirectory":"/private/tmp/jest_dx","clearMocks":false,"coveragePathIgnorePatterns":["/node_modules/"],"cwd":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"extraGlobals":[],"forceCoverageMatch":[],"globals":{},"haste":{"computeSha1":false,"throwOnModuleCollision":false},"injectGlobals":true,"moduleDirectories":["node_modules"],"moduleFileExtensions":["js","json","jsx","ts","tsx","node"],"moduleNameMapper":[["^#spruce/schemas/fields/(.*)","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1"],["^#spruce/(.*)$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1"]],"modulePathIgnorePatterns":[],"name":"44406c6bd09f4805a9dd2ad1a17b150c","prettierPath":"prettier","resetMocks":false,"resetModules":false,"restoreMocks":false,"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","roots":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"],"runner":"jest-runner","setupFiles":[],"setupFilesAfterEnv":[],"skipFilter":false,"slowTestThreshold":5,"snapshotSerializers":[],"testEnvironment":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-environment-node/build/index.js","testEnvironmentOptions":{},"testLocationInResults":false,"testMatch":["**/__tests__/**/*.test.js?(x)"],"testPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/tmp/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/testDirsAndFiles/"],"testRegex":[],"testRunner":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-jasmine2/build/index.js","testURL":"http://localhost","timers":"real","transform":[["\.[jt]sx?$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/babel-jest/build/index.js",{}]],"transformIgnorePatterns":["/node_modules/","\.pnp\.[^\/]+$"],"watchPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/"]},"hasteFS":{"_rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","_files":{}},"moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"resolver":{"_options":{"extensions":[".js",".json",".jsx",".ts",".tsx",".node"],"hasCoreModules":true,"moduleDirectories":["node_modules"],"moduleNameMapper":[{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1","regex":{}},{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1","regex":{}}],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleIDCache":{},"_moduleNameCache":{},"_modulePathCache":{},"_supportsNativePlatform":false}},"duration":48733,"path":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/behavioral/errors/CreatingANewErrorBuilder.test.js"}}
			***************************END_JSON_DIVIDER***************************
			***************************START_JSON_DIVIDER***************************
			{"status":"testStart","test":{"context":{"config":{"automock":false,"cache":true,"cacheDirectory":"/private/tmp/jest_dx","clearMocks":false,"coveragePathIgnorePatterns":["/node_modules/"],"cwd":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","detectLeaks":false,"detectOpenHandles":false,"errorOnDeprecated":false,"extraGlobals":[],"forceCoverageMatch":[],"globals":{},"haste":{"computeSha1":false,"throwOnModuleCollision":false},"injectGlobals":true,"moduleDirectories":["node_modules"],"moduleFileExtensions":["js","json","jsx","ts","tsx","node"],"moduleNameMapper":[["^#spruce/schemas/fields/(.*)","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1"],["^#spruce/(.*)$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1"]],"modulePathIgnorePatterns":[],"name":"44406c6bd09f4805a9dd2ad1a17b150c","prettierPath":"prettier","resetMocks":false,"resetModules":false,"restoreMocks":false,"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","roots":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"],"runner":"jest-runner","setupFiles":[],"setupFilesAfterEnv":[],"skipFilter":false,"slowTestThreshold":5,"snapshotSerializers":[],"testEnvironment":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-environment-node/build/index.js","testEnvironmentOptions":{},"testLocationInResults":false,"testMatch":["**/__tests__/**/*.test.js?(x)"],"testPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/tmp/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/testDirsAndFiles/"],"testRegex":[],"testRunner":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/jest-jasmine2/build/index.js","testURL":"http://localhost","timers":"real","transform":[["\.[jt]sx?$","/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/babel-jest/build/index.js",{}]],"transformIgnorePatterns":["/node_modules/","\.pnp\.[^\/]+$"],"watchPathIgnorePatterns":["/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/"]},"hasteFS":{"_rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli","_files":{}},"moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"resolver":{"_options":{"extensions":[".js",".json",".jsx",".ts",".tsx",".node"],"hasCoreModules":true,"moduleDirectories":["node_modules"],"moduleNameMapper":[{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/@sprucelabs/schema/build/.spruce/schemas/fields/$1","regex":{}},{"moduleName":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/.spruce/$1","regex":{}}],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleMap":{"duplicates":[],"map":[["@sprucelabs/spruce-cli",{"g":["package.json",1]}]],"mocks":[],"rootDir":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli"},"_moduleIDCache":{},"_moduleNameCache":{},"_modulePathCache":{},"_supportsNativePlatform":false}},"duration":17443,"path":"/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/__tests__/behavioral/watchers/WatchingForChanges.test.js"}}`)

		const testResults = this.parser.getResults()
		assert.isLength(testResults, 2)
	}
}
