import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureCommandExecuter from '../../features/FeatureCommandExecuter'

export default class FeatureCommandExecuterTest extends AbstractCliTest {
	@test()
	protected static async canInstantiateExecuter() {
		const cli = await this.Cli()
		const feature = cli.getFeature('schema')
		const action = feature.Action('create')

		const executer = new FeatureCommandExecuter(feature, action)

		assert.isOk(executer)
	}
}
