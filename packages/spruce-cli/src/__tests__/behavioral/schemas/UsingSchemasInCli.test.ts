import Schema from '@sprucelabs/schema'
import BaseSpruceTest, { test, assert } from '@sprucelabs/test'
import cliUserDefinition from '#spruce/schemas/local/cliUser.definition'

export default class UsingSchemasInCli extends BaseSpruceTest {
	@test()
	protected static async instantiateSchema() {
		const user = new Schema(cliUserDefinition, {
			casualName: 'Amigo',
		})
		assert.isEqual(user.get('casualName'), 'Amigo')
	}
}
