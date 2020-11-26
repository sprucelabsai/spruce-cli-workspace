import { Schema, SchemaEntityFactory } from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { CommanderStatic } from 'commander'
import SpruceError from '../errors/SpruceError'
import { GraphicsInterface } from '../types/cli.types'
import AbstractFeature from './AbstractFeature'
import featuresUtil from './feature.utilities'
import FeatureCommandExecuter from './FeatureCommandExecuter'
import FeatureInstaller from './FeatureInstaller'

export default class FeatureCommandAttacher {
	private program: CommanderStatic['program']
	private featureInstaller: FeatureInstaller
	private term: GraphicsInterface

	public constructor(
		program: CommanderStatic['program'],
		featureInstaller: FeatureInstaller,
		term: GraphicsInterface
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
		const commandStr = prefix === code ? code : `${prefix}.${code}`
		const action = feature.Action(code)

		const executer = new FeatureCommandExecuter({
			featureCode: feature.code,
			actionCode: code,
			featureInstaller: this.featureInstaller,
			term: this.term,
		})

		let command = this.program.command(commandStr).action(async (command) => {
			await executer.execute(command.opts())
		})

		const description = action.optionsSchema?.description
		if (description) {
			command = command.description(description)
		}

		const definition = action.optionsSchema

		if (definition) {
			this.attachOptions(command, definition)
		}
	}

	private attachOptions(
		command: CommanderStatic['program'],
		definition: Schema
	) {
		const schema = SchemaEntityFactory.Entity(definition)

		let theProgram = command

		const fields = schema.getNamedFields()
		const aliases = featuresUtil.generateCommandAliases(definition)

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
					id: schema.schemaId,
					originalError: err,
					friendlyMessage: `Could not attach option ${aliases[name]} from ${schema.schemaId}.${name} to the command`,
				})
			}
		})
	}
}
