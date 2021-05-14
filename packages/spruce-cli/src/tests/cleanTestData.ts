import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import MercuryFixture from '../fixtures/MercuryFixture'
import PersonFixture from '../fixtures/PersonFixture'
import TerminalInterface from '../interfaces/TerminalInterface'
import ServiceFactory from '../services/ServiceFactory'

require('dotenv').config()

const DEMO_NUMBER = process.env.DEMO_NUMBER
const DEMO_NUMBER_LOGIN_AS_SKILL = process.env.DEMO_NUMBER_LOGIN_AS_SKILL
const DEMO_NUMBER_INSTALL_SKILL = process.env.DEMO_NUMBER_INSTALL_SKILL
const SANDBOX_DEMO_NUMBER = process.env.SANDBOX_DEMO_NUMBER

const demoNumbers = [
	DEMO_NUMBER,
	DEMO_NUMBER_LOGIN_AS_SKILL,
	DEMO_NUMBER_INSTALL_SKILL,
	SANDBOX_DEMO_NUMBER,
]

const cwd = process.cwd()
const term = new TerminalInterface(cwd, true)

async function run() {
	term.renderHeadline(
		`Starting cleanup for ${demoNumbers.length} demo numbers.`
	)

	const serviceFactory = new ServiceFactory()
	const mercuryFixture = new MercuryFixture(cwd, serviceFactory)
	const personFixture = new PersonFixture(mercuryFixture.getApiClientFactory())
	const client = await mercuryFixture.connectToApi()

	for (const number of demoNumbers) {
		term.renderLine(`Starting cleanup for ${number}`)
		term.renderLine(`Logging in...`)
		await personFixture.loginAsDemoPerson(number)
		term.renderLine(`Success`)

		term.renderLine(`Loading organizations`)
		const orgResults = await client.emit('list-organizations::v2020_12_25', {
			payload: {
				showMineOnly: true,
			},
		})

		const { organizations } =
			eventResponseUtil.getFirstResponseOrThrow(orgResults)
		term.renderLine(`Found ${organizations.length} organizations`)

		for (const org of organizations) {
			const deleteResults = await client.emit(
				'delete-organization::v2020_12_25',
				{
					target: {
						organizationId: org.id,
					},
				}
			)

			eventResponseUtil.getFirstResponseOrThrow(deleteResults)
			term.renderLine(`Deleting org ${org.slug}.`)
		}

		const skillResults = await client.emit(`list-skills::v2020_12_25`, {
			payload: {
				showMineOnly: true,
			},
		})

		const { skills } = eventResponseUtil.getFirstResponseOrThrow(skillResults)

		term.renderLine(`Found ${skills.length} skills`)

		for (const skill of skills) {
			const deleteResults = await client.emit('unregister-skill::v2020_12_25', {
				target: {
					skillId: skill.id,
				},
			})

			eventResponseUtil.getFirstResponseOrThrow(deleteResults)
			term.renderLine(`Unregistering skill ${skill.slug}.`)
		}
	}

	await mercuryFixture.disconnectAll()
}

void run()
	.then(() => {
		term.renderLine('Done cleaning up!')
	})
	.catch((err) => {
		term.renderError(err)
	})
