import { Feature } from '#spruce/autoloaders/features'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

type TestFeatureType = typeof SpruceSchemas.Local.TestFeature.definition

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public description = 'Test File: Create a test for one of your files'
	public featureDependencies = [Feature.Skill, Feature.Schema]
	public packages: IFeaturePackage[] = [
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
