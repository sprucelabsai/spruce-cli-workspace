import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../tests/AbstractCliTest'

export default class DeployingASkillTest extends AbstractCliTest {
	@test()
	protected static async hasDeployAction() {
		const cli = await this.Cli()
		assert.isFunction(cli.getFeature('deploy').Action('heroku').execute)
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
