import { Command } from 'commander'
import BaseCommand from '../Base'
// import config from '../../utilities/Config'
// import skillState from '../../stores/Skill'
// import userState from '../../stores/User'
// import { SpruceEvents } from '../../types/events-generated'
// // import { RemoteConfig } from '../../utilities/Config'
// import { IFieldSelectDefinitionChoice } from '@sprucelabs/schema'
// import { FieldType } from '@sprucelabs/schema'

export default class CreateSkill extends BaseCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('skill:set [skillId]')
			.description('Set the credentials locally for an existing skill')
			.action(this.setSkill.bind(this))
	}

	public async setSkill() {
		// this.log.debug(process.cwd())
		// if (!skillState.isSet()) {
		// 	this.info('No skill is currently set.')
		// } else {
		// 	const confirm = await this.confirm(
		// 		`A skill is already configured in this directory:\nName: ${skillState.name}\nRemote: ${skillState.remote}\n\nWould you like to overwrite these settings?`
		// 	)
		// 	if (!confirm) {
		// 		return
		// 	}
		// }
		// const result = await userState.currentUser?.mercury.emit<
		// 	SpruceEvents.core.GetDeveloperSkills.IPayload,
		// 	SpruceEvents.core.GetDeveloperSkills.IResponseBody
		// >({
		// 	eventName: SpruceEvents.core.GetDeveloperSkills.name
		// })
		// const skills = result?.responses[0]
		// 	? result?.responses[0].payload.skills
		// 	: []
		// if (skills.length === 0) {
		// 	this.warn(
		// 		'You are not a developer on any skills yet. You can register a new one with "spruce skill:register"'
		// 	)
		// }
		// skills.sort(function(a, b) {
		// 	const nameA = a.name.toUpperCase()
		// 	const nameB = b.name.toUpperCase()
		// 	if (nameA < nameB) {
		// 		return -1
		// 	}
		// 	if (nameA > nameB) {
		// 		return 1
		// 	}
		// 	// names must be equal
		// 	return 0
		// })
		// const choices: IFieldSelectDefinitionChoice[] = [
		// 	...skills.map(s => ({
		// 		label: `${s.name} (${s.slug})`,
		// 		value: s.id
		// 	}))
		// ]
		// const skillId = await this.prompt({
		// 	type: FieldType.Select,
		// 	isRequired: true,
		// 	label: 'Which skill should it be set to?',
		// 	options: {
		// 		choices
		// 	}
		// })
		// const selectedSkill = skills.find(s => s.id === skillId)
		// if (selectedSkill) {
		// 	skillState.set({
		// 		...selectedSkill,
		// 		remote: config.remote,
		// 		host: RemoteConfig[config.remote].remote
		// 	})
		// }
	}
}
