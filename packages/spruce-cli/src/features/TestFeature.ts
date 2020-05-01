import path from 'path'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { Feature } from '#spruce/autoloaders/features'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

type TestFeatureType = typeof SpruceSchemas.local.TestFeature.definition

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public optionsSchema = SpruceSchemas.local.TestFeature.definition
	public featureDependencies = [Feature.Skill, Feature.Schema]

	public packages: IFeaturePackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public async afterPackageInstall(options: {
		answers: SchemaDefinitionValues<TestFeatureType>
	}) {
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

		const target = path.join(
			options.answers.target.path ?? this.cwd,
			options.answers.target.name
		)

		const name = this.utilities.names.toFileNameWithoutExtension(target)

		const pascalName = this.utilities.names.toPascal(name)
		const destination = path.join(path.dirname(target), name) + '.test.ts'
		const contents = this.templates.test({ pascalName })

		// TODO: write file
		// command.writeFile(destination, contents)
		log.debug({
			target,
			destination,
			contents
		})
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
