import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class DeployingASkillTest extends AbstractCliTest {
	@test()
	protected static async hasDeployAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('deploy').Action('heroku').execute)
	}

	@test()
	protected static async deployHaltedWithBadBuild() {
		const cli = await this.FeatureFixture().installCachedFeatures('deploy')

		diskUtil.writeFile(this.resolvePath('src/index.ts'), 'aoeustahoesuntao')

		const results = await cli
			.getFeature('deploy')
			.Action('heroku')

			.execute({
				teamName: process.env.HEROKU_TEAM_NAME ?? '',
			})

		assert.isTruthy(results.errors)
		assert.isArray(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'DEPLOY_FAILED', {
			stage: 'buliding',
		})
	}

	@test()
	protected static async healthCheckReportsNotDeployed() {
		const cli = await this.FeatureFixture().installCachedFeatures('deploy')
		const health = (await cli.checkHealth()) as any

		assert.isFalsy(health.errors)
		assert.isTruthy(health.deploy)
		assert.isEqual(health.deploy.status, 'passed')
		assert.isLength(health.deploy.deploys, 0)
	}

	@test()
	protected static async deployHaltedWithBadTest() {
		const cli = await this.FeatureFixture().installCachedFeatures('deploy')
		await cli.getFeature('test').Action('create').execute({
			nameReadable: 'Test failed',
			nameCamel: 'testFailed',
		})

		const results = await cli
			.getFeature('deploy')
			.Action('heroku')
			.execute({
				teamName: process.env.HEROKU_TEAM_NAME ?? '',
			})

		assert.isTruthy(results.errors)
		assert.isArray(results.errors)
		errorAssertUtil.assertError(results.errors[0], 'DEPLOY_FAILED', {
			stage: 'testing',
		})
	}

	@test()
	protected static async canDeploySkill() {
		const cli = await this.FeatureFixture().installCachedFeatures('deploy')
		const results = await cli
			.getFeature('deploy')
			.Action('heroku')
			.execute({
				teamName: process.env.HEROKU_TEAM_NAME ?? '',
			})

		assert.isFalsy(results.errors)

		const health = (await cli.checkHealth()) as any

		assert.isFalsy(health.errors)
		assert.isTruthy(health.deploy)
		assert.isLength(health.deploy.deploys, 1)
		assert.isLength(health.deploy.deploys, 1)
	}
}
