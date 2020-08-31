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
}
