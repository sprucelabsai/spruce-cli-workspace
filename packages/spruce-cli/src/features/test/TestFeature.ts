import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { INpmPackage } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

type TestFeatureType = SpruceSchemas.Local.v2020_07_22.ITestFeatureSchema

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public nameReadable = 'Test'
	public description = 'Test first. Test everything! 💪'
	public dependencies: FeatureCode[] = ['skill']
	public code: FeatureCode = 'test'
	public packageDependencies: INpmPackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'jest', isDev: true },
	]
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall() {
		const jestConfig = {
			maxWorkers: 4,
			testTimeout: 120000,
			testEnvironment: 'node',
			testPathIgnorePatterns: [
				'<rootDir>/tmp/',
				'<rootDir>/src/',
				'<rootDir>/node_modules/',
				'<rootDir>/build/__tests__/testDirsAndFiles/',
			],
			testMatch: ['**/__tests__/**/*.test.js?(x)'],
			moduleNameMapper: {
				'^#spruce/(.*)$': '<rootDir>/build/.spruce/$1',
			},
		}

		const service = this.Service('pkg')

		service.set({ path: 'jest', value: jestConfig })

		const scripts = service.get('scripts') as Record<string, any>
		scripts.test = 'jest'
		scripts['test.watch'] = 'jest --watch'
		service.set({ path: 'scripts', value: scripts })
	}

	public async isInstalled() {
		try {
			const service = this.Service('pkg')
			return !!service.get('jest')
		} catch {
			return false
		}
	}
}
