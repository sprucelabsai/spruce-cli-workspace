import { test, assert } from '@sprucelabs/test'
import { CommanderStatic } from 'commander'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureCommandAttacher from '../../features/FeatureCommandAttacher'

type MockProgram = CommanderStatic['program'] & {
	descriptionInvocations: { command: string; description: string }[]
	optionInvocations: {
		command: string
		option: string
		hint: string
		defaultValue: string
	}[]
	commandInvocations: string[]
	actionInvocations: string[]
}

export default class FeatureCommandAttacherTest extends AbstractCliTest {
	private static attacher: FeatureCommandAttacher
	private static program: MockProgram

	protected static async beforeEach() {
		super.beforeEach()

		this.program = this.MockCommanderProgram()
		const installer = this.FeatureInstaller()
		const term = this.term

		this.attacher = new FeatureCommandAttacher(this.program, installer, term)
	}

	@test()
	protected static canInstantiateAttacher() {
		assert.isOk(this.attacher)
	}

	@test()
	protected static hasAttachMethod() {
		assert.isFunction(this.attacher.attachFeature)
	}

	@test()
	protected static async attachFeatureSetsUpCommands() {
		await this.attachSchemaFeature()

		assert.doesInclude(this.program.commandInvocations, 'schema.create')
		assert.doesInclude(this.program.commandInvocations, 'schema.sync')

		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'schema.create',
		})
		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'schema.sync',
		})

		assert.doesInclude(this.program.actionInvocations, 'schema.create')
		assert.doesInclude(this.program.actionInvocations, 'schema.sync')
	}

	private static async attachSchemaFeature() {
		const cli = await this.Cli()
		const schemaFeature = cli.getFeature('schema')

		await this.attacher.attachFeature(schemaFeature)
	}

	@test()
	protected static async setsUpOptions() {
		await this.attachSchemaFeature()

		assert.doesInclude(this.program.optionInvocations, {
			command: 'schema.create',
			option:
				'--sbdd, --schemaBuilderDestinationDir <schemaBuilderDestinationDir>',
			defaultValue: 'src/schemas',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'schema.create',
			option: '-d, --description <description>',
		})
	}

	@test()
	protected static async ignoresPrivateFields() {
		await this.attachSchemaFeature()

		assert.doesNotInclude(this.program.optionInvocations, {
			command: 'schema.create',
			option: '--ev, --enableVersioning <enableVersioning>',
		})
	}

	@test()
	protected static async testBooleanArg() {
		const cli = await this.Cli()
		const vscodeFeature = cli.getFeature('vscode')

		await this.attacher.attachFeature(vscodeFeature)

		assert.doesInclude(this.program.optionInvocations, {
			command: 'vscode.setup',
			option: '-a, --all',
		})
	}

	private static MockCommanderProgram(): MockProgram {
		// @ts-ignore
		return {
			_lastCommand: '',
			commandInvocations: [],
			descriptionInvocations: [],
			actionInvocations: [],
			optionInvocations: [],
			command(str: string) {
				this.commandInvocations.push(str)
				this._lastCommand = str

				return this
			},
			//@ts-ignore
			description(str: string) {
				this.descriptionInvocations.push({
					command: this._lastCommand,
					description: str,
				})
				return this
			},
			action(_: any) {
				this.actionInvocations.push(this._lastCommand)

				return this
			},
			//@ts-ignore
			option(option: string, hint: string, defaultValue: string) {
				this.optionInvocations.push({
					command: this._lastCommand,
					option,
					hint,
					defaultValue,
				})
				return this
			},
		}
	}
}
