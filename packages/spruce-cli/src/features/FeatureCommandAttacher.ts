import Schema, { ISchemaDefinition } from '@sprucelabs/schema'
import { CommanderStatic } from 'commander'
import { IGraphicsInterface } from '../types/cli.types'
import namesUtil from '../utilities/names.utility'
import AbstractFeature from './AbstractFeature'
import featuresUtil from './feature.utilities'
import FeatureCommandExecuter from './FeatureCommandExecuter'
import FeatureInstaller from './FeatureInstaller'

export default class FeatureCommandAttacher {
	private program: CommanderStatic['program']
	private featureInstaller: FeatureInstaller
	private term: IGraphicsInterface

	public constructor(
		program: CommanderStatic['program'],
		featureInstaller: FeatureInstaller,
		term: IGraphicsInterface
	) {
		this.program = program
		this.featureInstaller = featureInstaller
		this.term = term
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

		const executer = new FeatureCommandExecuter({
			featureCode: feature.code,
			actionCode: code,
			featureInstaller: this.featureInstaller,
			term: this.term,
		})

		let command = this.program.command(commandStr).action(async (options) => {
			await executer.execute(options)
		})

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
		const aliases = featuresUtil.generateCommandAliases(definition)

		fields.forEach(({ field, name }) => {
			theProgram = theProgram.option(
				aliases[name],
				field.hint,
				field.definition.defaultValue
					? `${field.definition.defaultValue}`
					: undefined
			)
		})
	}
}
