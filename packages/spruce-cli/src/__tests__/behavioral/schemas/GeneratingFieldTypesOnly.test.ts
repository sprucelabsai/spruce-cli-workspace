import { test, assert } from '@sprucelabs/test'
import globby from 'globby'
import AbstractSchemaTest from '../../../test/AbstractSchemaTest'
import testUtil from '../../../utilities/test.utility'

export default class GeneratingFieldTypesOnlyTest extends AbstractSchemaTest {
	@test()
	protected static async syncFieldsActionExists() {
		const cli = await this.Cli()
		const action = cli.getFeature('schema').Action('fields.sync')
		assert.isTruthy(action)
	}

	@test()
	protected static async generatesOnlyFieldTypes() {
		const cli = await this.installSchemaFeature('schemas')
		const results = await cli
			.getFeature('schema')
			.Action('fields.sync')
			.execute({})

		assert.isFalsy(results.errors)

		const matches = globby.sync(this.resolveHashSprucePath('schemas'))
		assert.isLength(matches, 2)

		const expectedFields = ['fields.types.ts', 'fieldClassMap.ts']

		const typeChecker = this.Service('typeChecker')
		for (const file of expectedFields) {
			const match = testUtil.assertsFileByNameInGeneratedFiles(
				file,
				results.files ?? []
			)
			await typeChecker.check(match)
		}
	}
}
