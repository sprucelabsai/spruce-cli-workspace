// AUTO-GENERATED. ALL CHANGES WILL BE OVERWRITTEN
import { HEALTH_DIVIDER, pluginUtil } from '@sprucelabs/spruce-skill-utils'
// @ts-ignore
import skill from '#spruce/skill'

const isHealthCheck = !!process.argv.find((arg) => arg === '--health')

async function run() {
	pluginUtil.import([skill], skill.hashSpruceDir)

	if (isHealthCheck) {
		const health = await skill.checkHealth()
		console.log(HEALTH_DIVIDER)
		console.log(JSON.stringify(health))
		console.log(HEALTH_DIVIDER)
	} else {
		await skill.execute()
	}
}

run()
	.then(() => {
		process.exit(0)
	})
	.catch((err) => {
		console.log(err.stack)
		process.exit(1)
	})
