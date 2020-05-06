import { assert, test } from '@sprucelabs/test'
import uuid from 'uuid'
import BaseTest from '../BaseTest'
import { Feature } from '#spruce/autoloaders/features'

export default class SchemaFeatureTest extends BaseTest {
	@test('Can install the schema feature')
	protected static async installFeature() {
		await this.services.feature.install({
			features: [
				{
					feature: Feature.Skill,
					options: {
						name: uuid.v4(),
						description: uuid.v4()
					}
				},
				{
					feature: Feature.Schema
				}
			]
		})

		assert.isTrue(this.services.pkg.isInstalled('@sprucelabs/schema'))
	}
}
