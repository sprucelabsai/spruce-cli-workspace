import { test } from '@sprucelabs/test'
import BaseCliTest from '../BaseCliTest'

export default class TestFeatureTest extends BaseCliTest {
	@test('Can install the test feature')
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
		// 			feature: Feature.Test,
		// 			options: {
		// 				target: {
		// 					name: './src/index'
		// 				}
		// 			}
		// 		}
		// 	]
		// })
		// const devDependencies = cli.services.pkg.get('devDependencies')
		// assert.hasAllKeys(devDependencies, [
		// 	'@sprucelabs/test',
		// 	'@types/node',
		// 	'jest',
		// 	'ts-jest',
		// 	'ts-node'
		// ])
	}
}
