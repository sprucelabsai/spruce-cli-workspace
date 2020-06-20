import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { Feature } from '../FeatureManager'
import PkgService from '../services/PkgService'
import log from '../singletons/log'
import { INpmPackage } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'

type TestFeatureType = SpruceSchemas.Local.TestFeature.IDefinition

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public description = 'Test File: Create a test for one of your files'
	public featureDependencies = [Feature.Skill, Feature.Schema]
	public packageDependencies: INpmPackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true },
		{ name: 'jest', isDev: true },
		{ name: 'ts-jest', isDev: true }
	]

	private pkgService: PkgService

	public constructor(cwd: string, pkgService: PkgService) {
		super(cwd)
		this.pkgService = pkgService
	}

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
		this.pkgService.set({ path: 'babel', value: babelConfig })
		this.pkgService.set({ path: 'jest', value: jestConfig })
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
