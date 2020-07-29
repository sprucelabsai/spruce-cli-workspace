import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { Service } from '../factories/ServiceFactory'
import log from '../singletons/log'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import { FeatureCode } from './features.types'

type TestFeatureType = SpruceSchemas.Local.v2020_07_22.ITestFeatureSchema

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public nameReadable = 'Test'
	public description = 'Test first.'
	public dependencies: FeatureCode[] = ['skill']
	public code: FeatureCode = 'test'
	public packageDependencies: INpmPackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'jest', isDev: true },
		{ name: 'ts-jest', isDev: true },
	]

	public async afterPackageInstall() {
		log.trace('TestFeature.afterPackageInstall()')

		// Package.json updates
		const babelConfig = {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							node: 'current',
						},
					},
				],
				'@babel/preset-typescript',
			],
		}

		const jestConfig = {
			preset: 'ts-jest',
			cache: false,
			maxWorkers: 4,
			testTimeout: 30000,
			testEnvironment: 'node',
			testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
			moduleNameMapper: {
				'^#spruce/(.*)$': '<rootDir>/.spruce/$1',
				'^#spruce:schema/(.*)':
					'<rootDir>/node_modules/@sprucelabs/schema/build/$1',
			},
		}

		// TODO: Set the "test" package here
		const service = this.Service(Service.Pkg)

		service.set({ path: 'babel', value: babelConfig })
		service.set({ path: 'jest', value: jestConfig })
	}

	public getActions() {
		return []
	}

	public async isInstalled() {
		// eslint-disable-next-line no-debugger
		debugger
		return false
	}
}
