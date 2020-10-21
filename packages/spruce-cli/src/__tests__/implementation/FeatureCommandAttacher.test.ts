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
		await super.beforeEach()

		this.program = this.MockCommanderProgram()
		const installer = this.FeatureInstaller()
		const term = this.ui

		this.attacher = new FeatureCommandAttacher(this.program, installer, term)
	}

	@test()
	protected static canInstantiateAttacher() {
		assert.isTruthy(this.attacher)
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
		assert.doesInclude(this.program.commandInvocations, 'schema.fields.sync')

		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'schema.create',
		})
		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'schema.sync',
		})
		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'schema.fields.sync',
		})

		assert.doesInclude(this.program.actionInvocations, 'schema.create')
		assert.doesInclude(this.program.actionInvocations, 'schema.sync')
		assert.doesInclude(this.program.actionInvocations, 'schema.fields.sync')
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

		assert.doesInclude(this.program.optionInvocations, {
			command: 'schema.fields.sync',
			option: '--ald, --addonsLookupDir <addonsLookupDir>',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'schema.sync',
			option: '--frs, --fetchRemoteSchemas [true|false]',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'schema.sync',
			option: '--gcst, --generateCoreSchemaTypes [true|false]',
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
			option: '-a, --all [true|false]',
		})
	}

	@test()
	protected static async testActionWithSameNameAsFeature() {
		const cli = await this.Cli()
		const vscodeFeature = cli.getFeature('test')

		await this.attacher.attachFeature(vscodeFeature)

		const match = this.program.commandInvocations.find((i) => i === 'test')
		assert.isTruthy(match)
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
