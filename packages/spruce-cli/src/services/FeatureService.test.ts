import { assert } from '@sprucelabs/test'
// import fs from 'fs-extra'
// import uuid from 'uuid'
import log from '../lib/log'
import { setup } from '../index'
import BaseTest from '../BaseTest'
import { Feature } from '#spruce/autoloaders/features'
import { IServices } from '#spruce/autoloaders/services'

// let services: IServices | undefined

export default class FeatureServiceTest extends BaseTest {
	private static services: IServices | undefined

	protected static async beforeAll() {
		try {
			const tmpDirectory = this.getTempDirectory()
			const result = await setup({
				cwd: tmpDirectory
			})
			this.services = result.services
		} catch (e) {
			log.crit(e)
		}
	}

	@test('Can get feature dependencies')
	protected static async getFeatureDependencies() {
		const dependencies = this.services?.feature.getFeatureDependencies({
			feature: Feature.Test
		})
		assert.isArray(dependencies)
		// Verify order
		assert.equal(dependencies?.[0].feature, Feature.Skill)
		assert.equal(dependencies?.[1].feature, Feature.Schema)
		assert.equal(dependencies?.[2].feature, Feature.Test)
	}

	// @test('Can get circular feature dependencies')
	// protected async getCircularFeatureDependencies() {
	// 	const dependencies = services?.feature.getFeatureDependencies({
	// 		feature: Feature.Skill
	// 	})
	// 	assert.isArray(dependencies)
	// 	// Verify order
	// 	assert.equal(dependencies?.[0].feature, Feature.Skill)
	// 	assert.equal(dependencies?.[1].feature, Feature.Schema)
	// 	assert.equal(dependencies?.[2].feature, Feature.Test)
	// }

	// @test('Can install a feature')
	// protected async installFeature() {
	// 	await services?.feature.install({
	// 		features: [
	// 			{
	// 				feature: Feature.Skill,
	// 				options: {
	// 					name: uuid.v4(),
	// 					description: uuid.v4()
	// 				}
	// 			}
	// 		]
	// 	})
	// 	console.log({ services })
	// 	assert.isTrue(fs.existsSync(services?.feature.cwd as string))
	// }
}
