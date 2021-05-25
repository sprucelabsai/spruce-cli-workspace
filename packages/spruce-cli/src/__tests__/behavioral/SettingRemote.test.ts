import { test, assert } from '@sprucelabs/test'
import {
	REMOTE_DEV,
	REMOTE_LOCAL,
	REMOTE_PROD,
	REMOTE_SANDBOX,
} from '../../features/event/constants'
import AbstractSkillTest from '../../tests/AbstractSkillTest'

export default class SettingRemoteTest extends AbstractSkillTest {
	protected static skillCacheKey = 'events'

	@test()
	protected static async hasSetRemoteAction() {
		assert.isFunction(this.cli.getFeature('event').Action('setRemote').execute)
	}

	@test(`saves local as ${REMOTE_LOCAL}`, `local`, `${REMOTE_LOCAL}`)
	@test(`saves dev as ${REMOTE_DEV}`, `dev`, `${REMOTE_DEV}`)
	@test(`saves sandbox as ${REMOTE_SANDBOX}`, `sandbox`, `${REMOTE_SANDBOX}`)
	@test(`saves prod as ${REMOTE_PROD}`, `prod`, `${REMOTE_PROD}`)
	protected static async savesRemote(remote: string, expected: string) {
		await this.cli.getFeature('event').Action('setRemote').execute({ remote })

		const env = this.Service('env')
		const host = env.get('HOST')

		assert.isEqual(host, expected)
	}
}
