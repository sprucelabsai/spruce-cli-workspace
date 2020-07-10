import { CommanderStatic } from 'commander'
import namesUtil from '../utilities/names.utility'
import AbstractFeature from './AbstractFeature'

export default class FeatureCommandAttacher {
	private program: CommanderStatic['program']

	public constructor(program: CommanderStatic['program']) {
		this.program = program
	}

	public async attachFeature(feature: AbstractFeature) {
		const actionCodes = await feature.getAvailableActionCodes()

		for (const actionCode of actionCodes) {
			this.attachCode(actionCode, feature)
		}
	}

	private attachCode(code: string, feature: AbstractFeature) {
		const prefix = namesUtil.toCamel(feature.code)
		const command = `${prefix}.${code}`
		const action = feature.Action(code)

		this.program.command(command).action(() => {})

		const description = action.optionsDefinition?.description
		if (description) {
			this.program.description(description)
		}
	}
}
