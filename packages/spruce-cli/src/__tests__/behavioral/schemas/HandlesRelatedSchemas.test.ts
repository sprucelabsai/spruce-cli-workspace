import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../../AbstractSchemaTest'
import { Service } from '../../../factories/ServiceFactory'
import diskUtil from '../../../utilities/disk.utility'
import testUtil from '../../../utilities/test.utility'

export default class HandlesRelatedSchemasTest extends AbstractSchemaTest {
	@test()
	protected static async relatedSchemasGeneratesValidFiles() {
		const cli = await this.installSchemaFeature('related-schemas')
		const source = this.resolveTestPath('related_schemas')
		const destination = this.resolvePath('src/schemas')

		diskUtil.copyDir(source, destination)

		const results = await cli.getFeature('schema').Action('sync').execute({})

		assert.isEqual(results.errors?.length, 0)

		const personDefinitionMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/testPerson\.definition/,
			results.files ?? []
		)
		const petDefinitionMatch = testUtil.assertsFileByNameInGeneratedFiles(
			/pet\.definition/,
			results.files ?? []
		)

		const checker = this.Service(Service.TypeChecker)

		await checker.check(personDefinitionMatch)
		await checker.check(petDefinitionMatch)
	}
}
