import { Feature } from '#spruce/autoloaders/features'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import log from '../singletons/log'
import AbstractFeature, { INpmPackage } from './AbstractFeature'

type TestFeatureType = SpruceSchemas.Local.TestFeature.IDefinition

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public description = 'Test File: Create a test for one of your files'
	public featureDependencies = [Feature.Skill, Feature.Schema]
	public packages: INpmPackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'jest', isDev: true },
		{ name: 'ts-jest', isDev: true }
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
							node: 'current'
						}
					}
				],
				'@babel/preset-typescript'
			]
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
					'<rootDir>/node_modules/@sprucelabs/schema/build/$1'
			}
		}

		// TODO: Set the "test" package here
		this.services.pkg.set({ path: 'babel', value: babelConfig })
		this.services.pkg.set({ path: 'jest', value: jestConfig })
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
