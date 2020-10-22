import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../test/AbstractSchemaTest'

export default class ImportingSchemaImportsTest extends AbstractSchemaTest {
	@test()
	protected static async schemaImportsLocalImports() {
		const cli = await this.installSchemaFeature('importing-schema-imports')
		const source = this.resolveTestPath('schemas_with_imports')
		const destination = this.resolvePath('src', 'schemas')

		await diskUtil.copyDir(source, destination)

		diskUtil.writeFile(
			this.resolvePath('src', 'widgets', 'widgets.types.ts'),
			'export type BaseWidget = {}'
		)

		const results = await cli.getFeature('schema').Action('sync').execute({})
		assert.isFalsy(results.errors)
		assert.isTruthy(results.files)

		const checker = this.Service('typeChecker')

		const all = results.files.map((f) => checker.check(f.path))
		await Promise.all(all)
	}
}
