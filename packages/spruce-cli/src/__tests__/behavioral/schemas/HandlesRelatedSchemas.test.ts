import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import testUtil from '../../../utilities/test.utility'

export default class HandlesRelatedSchemasTest extends AbstractSchemaTest {
	@test()
	protected static async relatedSchemasGeneratesValidFiles() {
		const cli = await this.installSchemaFeature('related-schemas')
		const source = this.resolveTestPath('related_schemas')
		const destination = this.resolvePath('src/schemas')

		await diskUtil.copyDir(source, destination)

		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isEqual(results.errors?.length, 0)

		const personSchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/testPerson\.schema/,
			results.files ?? []
		)

		const petSchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/pet\.schema/,
			results.files ?? []
		)

		const nestedSchemaMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/nested-schema\.schema/,
			results.files ?? []
		)

		const checker = this.Service('typeChecker')

		await checker.check(personSchemaMatch)
		await checker.check(petSchemaMatch)
		await checker.check(nestedSchemaMatch)
	}
}
