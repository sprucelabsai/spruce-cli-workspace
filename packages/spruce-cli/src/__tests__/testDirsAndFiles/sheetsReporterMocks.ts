export function generateTestMock() {
	return {
		context: {
			config: {
				automock: false,
				cache: false,
				cacheDirectory:
					'/private/var/folders/qw/v2bfr0c94bn37vclwvcltsj40000gn/T/jest_dx',
				clearMocks: false,
				coveragePathIgnorePatterns: ['/node_modules/'],
				cwd:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				detectLeaks: false,
				detectOpenHandles: true,
				errorOnDeprecated: false,
				extraGlobals: [],
				forceCoverageMatch: [],
				globals: {},
				haste: { computeSha1: false, throwOnModuleCollision: false },
				moduleDirectories: ['node_modules'],
				moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
				moduleNameMapper: [
					[
						'^#spruce/(.*)$',
						'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/.spruce/$1',
					],
					[
						'^#spruce:schema/(.*)',
						'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/@sprucelabs/schema/build/$1',
					],
				],
				modulePathIgnorePatterns: [],
				name: '44406c6bd09f4805a9dd2ad1a17b150c',
				prettierPath: 'prettier',
				resetMocks: false,
				resetModules: false,
				restoreMocks: false,
				rootDir:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				roots: [
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				],
				runner: 'jest-runner',
				setupFiles: [],
				setupFilesAfterEnv: [],
				skipFilter: false,
				snapshotSerializers: [],
				testEnvironment:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/jest-environment-node/build/index.js',
				testEnvironmentOptions: {},
				testLocationInResults: false,
				testMatch: [
					'**/__tests__/**/*.[jt]s?(x)',
					'**/?(*.)+(spec|test).[tj]s?(x)',
				],
				testPathIgnorePatterns: [
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/tmp/',
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/build/',
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/',
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/__tests__/testDirsAndFiles',
				],
				testRegex: [],
				testRunner:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/jest-jasmine2/build/index.js',
				testURL: 'http://localhost',
				timers: 'real',
				transform: [
					[
						'^.+\\.tsx?$',
						'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/node_modules/ts-jest/dist/index.js',
						{},
					],
				],
				transformIgnorePatterns: ['/node_modules/'],
				watchPathIgnorePatterns: [],
			},
			hasteFS: {
				_rootDir:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				_files: {},
			},
			moduleMap: {
				duplicates: [],
				map: [['@sprucelabs/spruce-cli', { g: ['package.json', 1] }]],
				mocks: [],
				rootDir:
					'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
			},
			resolver: {
				_options: {
					extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.node'],
					hasCoreModules: true,
					moduleDirectories: ['node_modules'],
					moduleNameMapper: [
						{
							moduleName:
								'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/.spruce/$1',
							regex: {},
						},
						{
							moduleName:
								'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/node_modules/@sprucelabs/schema/build/$1',
							regex: {},
						},
					],
					rootDir:
						'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				},
				_moduleMap: {
					duplicates: [],
					map: [['@sprucelabs/spruce-cli', { g: ['package.json', 1] }]],
					mocks: [],
					rootDir:
						'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli',
				},
				_moduleIDCache: {},
				_moduleNameCache: {},
				_modulePathCache: {},
				_supportsNativePlatform: false,
			},
		},
		path:
			'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/__tests__/behavioral/HandlesVersioning.test.ts',
	}
}

export function generateTestResultsMock() {
	return {
		leaks: false,
		numFailingTests: 0,
		numPassingTests: 5,
		numPendingTests: 0,
		numTodoTests: 0,
		openHandles: [],
		perfStats: { end: 1593373401130, start: 1593373391292 },
		skipped: false,
		snapshot: {
			added: 0,
			fileDeleted: false,
			matched: 0,
			unchecked: 0,
			unmatched: 0,
			updated: 0,
			uncheckedKeys: [],
		},
		testFilePath:
			'/Users/taylorromero/Development/SpruceLabs/spruce-cli-workspace/packages/spruce-cli/src/__tests__/behavioral/HandlesVersioning.test.ts',
		testResults: [
			{
				ancestorTitles: [],
				duration: 6,
				failureMessages: [],
				fullName: 'hasResolvePathFunction',
				location: null,
				numPassingAsserts: 0,
				status: 'passed',
				title: 'hasResolvePathFunction',
			},
			{
				ancestorTitles: [],
				duration: 4,
				failureMessages: [],
				fullName: 'canResolveLatest',
				location: null,
				numPassingAsserts: 0,
				status: 'passed',
				title: 'canResolveLatest',
			},
			{
				ancestorTitles: [],
				duration: 3,
				failureMessages: [],
				fullName: 'canResolveLatestOnDifferentDirectory',
				location: null,
				numPassingAsserts: 0,
				status: 'passed',
				title: 'canResolveLatestOnDifferentDirectory',
			},
			{
				ancestorTitles: [],
				duration: 3,
				failureMessages: [],
				fullName: 'canGenerateLatestPath',
				location: null,
				numPassingAsserts: 0,
				status: 'passed',
				title: 'canGenerateLatestPath',
			},
			{
				ancestorTitles: [],
				duration: 3,
				failureMessages: [],
				fullName: 'canGetLatestVersionBasedOnDir',
				location: null,
				numPassingAsserts: 0,
				status: 'passed',
				title: 'canGetLatestVersionBasedOnDir',
			},
		],
		failureMessage: null,
	}
}
