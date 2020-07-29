import Schema from '@sprucelabs/schema'
import BaseSpruceTest, { test, assert } from '@sprucelabs/test'
import cliUserSchema from '#spruce/schemas/local/v2020_07_22/cliUser.schema'

export default class UsingSchemasInCli extends BaseSpruceTest {
	@test()
	protected static async instantiateSchema() {
		const user = new Schema(cliUserSchema, {
			casualName: 'Amigo',
		})
		assert.isEqual(user.get('casualName'), 'Amigo')
	}
}
