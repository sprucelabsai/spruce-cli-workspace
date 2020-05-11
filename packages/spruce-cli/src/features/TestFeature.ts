import path from 'path'
import { SchemaDefinitionValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { Feature } from '#spruce/autoloaders/features'
import fs from 'fs-extra'
import log from '../lib/log'
import AbstractFeature, { IFeaturePackage } from './AbstractFeature'

type TestFeatureType = typeof SpruceSchemas.Local.TestFeature.definition

export default class TestFeature extends AbstractFeature<TestFeatureType> {
	public description = 'Test File: Create a test for one of your files'

	public featureDependencies = [Feature.Skill, Feature.Schema]

	public packages: IFeaturePackage[] = [
		{ name: '@sprucelabs/test', isDev: true },
		{ name: 'ts-node', isDev: true }
	]

	public optionsSchema = () => {
		const def = SpruceSchemas.Local.TestFeature.definition
		log.debug('get optionsSchema', def)
		// TODO
		// @ts-ignore
		def.fields.target.defaultValue.path = path.join(this.cwd, 'src/')

		return def
	}

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

		const target = path.join(
			options.answers.target.path ?? this.cwd,
			options.answers.target.name
		)

		const name = this.utilities.names.toFileNameWithoutExtension(target)

		const pascalName = this.utilities.names.toPascal(name)
		const destination = path.join(path.dirname(target), name) + '.test.ts'
		const contents = this.templates.test({ pascalName })

		fs.outputFileSync(destination, contents)

		this.term.info(`Test file created at: ${destination}`)
	}

	// TODO
	public async isInstalled() {
		return false
	}
}
