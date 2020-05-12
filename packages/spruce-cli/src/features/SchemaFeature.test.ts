import { assert, test } from '@sprucelabs/test'
import uuid from 'uuid'
import { Feature } from '#spruce/autoloaders/features'
import BaseCliTest from '../BaseCliTest'

export default class SchemaFeatureTest extends BaseCliTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.Schema]
		})

		assert.isFalse(isInstalled)
	}

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
