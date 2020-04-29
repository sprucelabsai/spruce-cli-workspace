import BaseTest, { test, assert } from '@sprucelabs/test'
import { setup } from '../index'
import { IServices } from '#spruce/autoloaders/services'
import { Feature } from '#spruce/autoloaders/features'

let services: IServices | undefined

export default class FeatureServiceTest extends BaseTest {
	protected static async beforeAll() {
		try {
			const result = await setup()
			services = result.services
			console.log(result)
		} catch (e) {
			console.log(e)
		}
	}

	@test('Can get feature dependencies')
	protected static async getFeatureDependencies() {
		const dependencies = services?.feature.getFeatureDependencies(Feature.Test)
		assert.isArray(dependencies)
		// Verify order
		assert.equal(dependencies?.[0], Feature.Skill)
		assert.equal(dependencies?.[1], Feature.Schema)
		assert.equal(dependencies?.[2], Feature.Test)
	}
}
