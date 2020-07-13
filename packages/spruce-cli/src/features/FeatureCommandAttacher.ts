import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
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
		const commandStr = `${prefix}.${code}`
		const action = feature.Action(code)

		let command = this.program.command(commandStr).action(() => {})

		const description = action.optionsDefinition?.description
		if (description) {
			command = command.description(description)
		}

		const definition = action.optionsDefinition

		if (definition) {
			this.attachOptions(command, definition)
		}
	}

	private attachOptions(
		command: CommanderStatic['program'],
		definition: ISchemaDefinition
	) {
		const schema = new Schema(definition)
		let theProgram = command

		const fields = schema.getNamedFields()

		fields.forEach(({ field, name }) => {
			theProgram = theProgram.option(
				`--${name} <${name}>`,
				field.hint,
				`${field.definition.defaultValue}`
			)
		})
	}
}
