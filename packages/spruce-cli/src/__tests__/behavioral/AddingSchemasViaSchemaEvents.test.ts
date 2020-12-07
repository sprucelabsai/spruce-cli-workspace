import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../test/AbstractSchemaTest'

export default class AddingSchemasViaSchemaEventsTest extends AbstractSchemaTest {
	@test()
	protected static async emitsWillGenerateSchemasEvent() {
		const cli = await this.installSchemaFeature('schemas')
	}
}
