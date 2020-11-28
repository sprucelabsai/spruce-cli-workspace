import {
	CORE_NAMESPACE,
	CORE_SCHEMA_VERSION,
	diskUtil,
} from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../test/AbstractSchemaTest'
import testUtil from '../../../utilities/test.utility'

export default class HandlesRelatedSchemasTest extends AbstractSchemaTest {
	@test()
	protected static async relatedSchemasGeneratesValidFiles() {
		const { syncResults: results } = await this.installCopyAndSync()

		assert.isUndefined(results.errors)
		testUtil.assertsFileByNameInGeneratedFiles(
			/testPerson\.schema/,
			results.files ?? []
		)

		testUtil.assertsFileByNameInGeneratedFiles(
			/pet\.schema/,
			results.files ?? []
		)

		testUtil.assertsFileByNameInGeneratedFiles(
			/nested-schema\.schema/,
			results.files ?? []
		)

		const checker = this.Service('typeChecker')

		const all =
			results.files?.map((file) => {
				return checker.check(file.path)
			}) ?? []

		await Promise.all(all)
	}

	private static async installCopyAndSync(testDir = 'related_schemas') {
		const cli = await this.installSchemaFeature('schemas')
		const source = this.resolveTestPath(testDir)
		const destination = this.resolvePath('src/schemas')

		await diskUtil.copyDir(source, destination)

		const syncResults = await cli
			.getFeature('schema')
			.Action('sync')
			.execute({})

		return { cli, syncResults }
	}

	@test()
	protected static async nestedSchemasInDynamicFields() {
		const cli = await this.installSchemaFeature('schemas')
		const schemasDir = this.resolvePath('src', 'schemas')

		await diskUtil.copyDir(
			this.resolveTestPath('dynamic_key_schemas'),
			schemasDir
		)

		const results = await cli.getFeature('schema').Action('sync').execute({})

		const typesPath = this.resolveHashSprucePath('schemas', 'schemas.types.ts')
		const typesContent = diskUtil.readFile(typesPath)

		assert.doesInclude(
			typesContent,
			"[eventNameWithOptionalNamespace:string]: { schemaId: 'eventSignature', version: 'v2020_07_22', values: SpruceSchemas.TestingSchemas.v2020_07_22.EventSignature } | { schemaId: 'eventSignature2', version: 'v2020_07_22', values: SpruceSchemas.TestingSchemas.v2020_07_22.EventSignature2 }"
		)

		await this.Service('typeChecker').check(typesPath)

		const schemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			'mercuryContract.schema.ts',
			results.files ?? []
		)
		await this.Service('typeChecker').check(schemaMatch)
	}

	@test()
	protected static async generatesCoreSchemasFirstSoSchemasCanRelateToThem() {
		const { syncResults } = await this.installCopyAndSync()

		assert.isFalsy(syncResults.errors)
		assert.isTruthy(syncResults.files)

		testUtil.assertCountsByAction(syncResults.files, {
			generated: syncResults.files.length,
			updated: 0,
			skipped: 0,
		})
	}

	@test()
	protected static async makesSureMixinSchemaFieldsDontCopySchemaToLocal() {
		const { syncResults } = await this.installCopyAndSync()

		assert.isFalsy(syncResults.errors)
		assert.isTruthy(syncResults.files)

		const matches = syncResults.files.filter(
			(f) => f.name === 'skillCreator.schema.ts'
		)

		assert.isLength(matches, 1)
		assert.doesInclude(matches[0].path, CORE_SCHEMA_VERSION.dirValue)
		assert.doesInclude(matches[0].path, CORE_NAMESPACE.toLowerCase())
		assert.doesNotInclude(matches[0].path, 'testing')
	}
}
