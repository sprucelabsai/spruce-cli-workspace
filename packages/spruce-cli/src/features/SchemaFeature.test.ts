import { test } from '@sprucelabs/test'
// import uuid from 'uuid'
// import { Feature } from '#spruce/autoloaders/features'
import BaseCliTest from '../BaseCliTest'

export default class SchemaFeatureTest extends BaseCliTest {
	@test('Properly detects when feature is not installed')
	protected static async notInstalled() {
		// const cli = await this.cli()
		// const isInstalled = await cli.services.feature.isInstalled({
		// 	features: [Feature.Schema]
		// })
		// assert.isFalse(isInstalled)
	}

	@test('Can install the schema feature')
	protected static async installFeature() {
		// const cli = await this.cli()
		// await cli.services.feature.install({
		// 	features: [
		// 		{
		// 			feature: Feature.Skill,
		// 			options: {
		// 				name: uuid.v4(),
		// 				description: uuid.v4()
		// 			}
		// 		},
		// 		{
		// 			feature: Feature.Schema
		// 		}
		// 	]
		// })
		// assert.isTrue(cli.services.pkg.isInstalled('@sprucelabs/schema'))
	}
}
