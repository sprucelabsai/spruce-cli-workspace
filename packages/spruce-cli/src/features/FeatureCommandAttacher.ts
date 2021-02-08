import { Schema, SchemaEntityFactory } from '@sprucelabs/schema'
import { CommanderStatic } from 'commander'
import SpruceError from '../errors/SpruceError'
import { GraphicsInterface } from '../types/cli.types'
import commanderUtil from '../utilities/commander.utility'
import AbstractFeature from './AbstractFeature'
import featuresUtil from './feature.utilities'
import FeatureCommandExecuter from './FeatureCommandExecuter'
import FeatureInstaller from './FeatureInstaller'

export default class FeatureCommandAttacher {
	private program: CommanderStatic['program']
	private featureInstaller: FeatureInstaller
	private ui: GraphicsInterface

	public constructor(options: {
		program: CommanderStatic['program']
		featureInstaller: FeatureInstaller
		ui: GraphicsInterface
	}) {
		const { program, featureInstaller, ui: term } = options

		this.program = program
		this.featureInstaller = featureInstaller
		this.ui = term
	}

	public async attachFeature(feature: AbstractFeature) {
		const actionCodes = await feature.getAvailableActionCodes()

		for (const actionCode of actionCodes) {
			this.attachCode(actionCode, feature)
		}
	}

	private attachCode(code: string, feature: AbstractFeature) {
		let commandStr = featuresUtil.generateCommand(feature.code, code)
		const action = feature.Action(code)

		const aliases = action.commandAliases ? [...action.commandAliases] : []

		if (aliases.length > 0) {
			commandStr = aliases.shift() as string
		}

		const executer = new FeatureCommandExecuter({
			featureCode: feature.code,
			actionCode: code,
			featureInstaller: this.featureInstaller,
			term: this.ui,
		})

		let command = this.program.command(commandStr)

		if (aliases.length > 0) {
			command = command.aliases(aliases)
		}

		command = command.action(async (...args: any[]) => {
			const options = commanderUtil.mapIncomingToOptions(
				...args,
				feature.optionsSchema ?? action.optionsSchema
			)

			await executer.execute(options)
		})

		const description = action.optionsSchema?.description

		if (description) {
			command = command.description(description)
		}

		const schema = action.optionsSchema

		if (schema) {
			this.attachOptions(command, schema)
		}
	}

	private attachOptions(command: CommanderStatic['program'], schema: Schema) {
		const entity = SchemaEntityFactory.Entity(schema)

		let theProgram = command

		const fields = entity.getNamedFields()
		const aliases = featuresUtil.generateOptionAliases(schema)

		fields.forEach(({ field, name }) => {
			try {
				theProgram = theProgram.option(
					aliases[name],
					field.hint,
					field.definition.defaultValue
						? `${field.definition.defaultValue}`
						: undefined
				)
			} catch (err) {
				throw new SpruceError({
					//@ts-ignore
					code: 'FAILED_TO_ATTACH_COMMAND',
					fieldName: name,
					id: entity.schemaId,
					originalError: err,
					friendlyMessage: `Could not attach option ${aliases[name]} from ${entity.schemaId}.${name} to the command`,
				})
			}
		})
	}
}
