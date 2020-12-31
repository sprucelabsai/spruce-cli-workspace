import {
	eventContractUtil,
	eventNameUtil,
} from '@sprucelabs/spruce-event-utils'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractEventTest from '../../tests/AbstractEventTest'

const EVENT_NAME_READABLE = 'On boot check'
const EVENT_NAME = 'on-boot-check'
const EVENT_CAMEL = 'onBootCheck'

export default class RegisteringEventsOnBootTest extends AbstractEventTest {
	@test()
	protected static async registeringEventsOnBoot() {
		const {
			cli,
			skill2,
			currentSkill,
		} = await this.seedDummySkillRegisterCurrentSkillAndInstallToOrg()

		await cli.getFeature('event').Action('create').execute({
			nameReadable: EVENT_NAME_READABLE,
			nameKebab: EVENT_NAME,
			nameCamel: EVENT_CAMEL,
		})

		const boot = await cli
			.getFeature('skill')
			.Action('boot')
			.execute({ local: true })

		//give the skill time to boot
		await this.wait(10000)
		boot.meta?.kill()

		const client = await this.connectToApi({
			skillId: skill2.id,
			apiKey: skill2.apiKey,
		})

		const { contracts } = await this.Store('event', {
			apiClientFactory: async () => client,
		}).fetchEventContracts()

		debugger

		const name = eventNameUtil.join({
			eventNamespace: currentSkill.slug,
			eventName: EVENT_NAME,
			version: versionUtil.generateVersion().constValue,
		})

		debugger

		debugger

		assert.isLength(contracts, 2)
		assert.isEqualDeep(contracts[1].eventSignatures[name], {})
	}
}
