import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'
import { Feature } from '../../.spruce/autoloaders/features'

export default class TestFeature extends AbstractFeature {
	public featureDependencies = [Feature.Schema]

	public packages: IFeaturePackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async afterPackageInstall(_options?: Record<string, any>) {
		log.trace('TestFeature.afterPackageInstall()')

		// package.json updates
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
			testEnvironment: 'node',
			testPathIgnorePatterns: ['<rootDir>/build/', '<rootDir>/node_modules/'],
			moduleNameMapper: {
				'^#spruce/(.*)$': '<rootDir>/.spruce/$1'
			}
		}

		// TODO: Set the "test" package here
		this.services.pkg.set('babel', babelConfig)
		this.services.pkg.set('jest', jestConfig)
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
