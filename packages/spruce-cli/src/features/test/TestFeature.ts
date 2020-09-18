import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import PkgService from '../../services/PkgService'
import { NpmPackage } from '../../types/cli.types'
import tsConfigUtil from '../../utilities/tsConfig.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../features.types'

export default class TestFeature extends AbstractFeature {
	public nameReadable = 'Test'
	public description = 'Test first. Test everything! 💪'
	public dependencies: FeatureCode[] = []
	public code: FeatureCode = 'test'
	public packageDependencies: NpmPackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'jest', isDev: true },
	]
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async afterPackageInstall() {
		const service = this.Service('pkg')

		this.configureJest(service)
		this.configureScripts(service)
		this.configureTsConfig()

		return {}
	}

	private configureTsConfig() {
		try {
			const tsConfig = tsConfigUtil.readConfig(this.cwd)
			if (!tsConfig.compilerOptions.experimentalDecorators) {
				tsConfig.compilerOptions.experimentalDecorators = true
				tsConfigUtil.setCompilerOption(this.cwd, 'experimentalDecorators', true)
			}
		} catch (err) {
			//@ts-ignore
		}
	}

	private configureScripts(service: PkgService) {
		let scripts = service.get('scripts') as Record<string, any> | undefined

		if (!scripts) {
			scripts = {}
		}

		if (!scripts.test) {
			scripts.test = 'jest'
			scripts['test.watch'] = 'jest --watch'
			service.set({ path: 'scripts', value: scripts })
		}
	}

	private configureJest(service: PkgService) {
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
		const existingJest = service.get('jest') as Record<string, any>
		if (!existingJest) {
			service.set({ path: 'jest', value: jestConfig })
		}
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
