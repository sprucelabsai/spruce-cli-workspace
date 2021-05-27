import { test, assert } from '@sprucelabs/test'
import globby from 'globby'
import AbstractSchemaTest from '../../../tests/AbstractSchemaTest'
import testUtil from '../../../tests/utilities/test.utility'

export default class GeneratingFieldTypesOnlyTest extends AbstractSchemaTest {
	@test()
	protected static async syncFieldsActionExists() {
		const action = this.Executer('schema', 'syncFields')
		assert.isTruthy(action)
	}

	@test()
	protected static async generatesOnlyFieldTypes() {
		await this.installSchemaFeature('schemas')
		const results = await this.Executer('schema', 'syncFields').execute({})

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
