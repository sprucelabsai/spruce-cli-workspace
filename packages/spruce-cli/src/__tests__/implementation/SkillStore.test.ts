import { eventResponseUtil } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class SkillStoreTest extends AbstractCliTest {
	@test()
	protected static async canInstantiateSkillStore() {
		assert.isTruthy(this.Store('skill'))
	}

	@test()
	protected static async hasRegisterMethod() {
		assert.isFunction(this.Store('skill').register)
	}

	@test()
	protected static async cantRegisterIfNotInSkill() {
		const err = await assert.doesThrowAsync(() =>
			this.Store('skill').register({
				name: 'awesome skill',
				slug: 'awesome-skill',
			})
		)
		errorAssertUtil.assertError(err, 'DIRECTORY_NOT_SKILL')
	}

	@test()
	protected static async canRegister() {
		await this.FeatureFixture().installCachedFeatures('skills')

		const skill = await this.Store('skill').register({
			name: 'awesome skill',
			slug: 'awesome-skill',
		})

		assert.isTruthy(skill)
		assert.isEqual(skill.name, 'awesome skill')
		assert.isEqual(skill.slug, 'awesome-skill')
		assert.isString(skill.apiKey)
		assert.isString(skill.id)

		const client = await this.connectToApi()
		const results = await client.emit('authenticate', {
			payload: {
				skillId: skill.id,
				apiKey: skill.apiKey,
			},
		})

		const response = eventResponseUtil.getFirstResponseOrThrow(results)
		assert.isEqual(response.auth, 'skill')
	}
}
