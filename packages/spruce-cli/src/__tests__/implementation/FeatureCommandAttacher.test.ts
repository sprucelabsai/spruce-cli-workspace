import { test, assert } from '@sprucelabs/test'
import { CommanderStatic } from 'commander'
import FeatureCommandAttacher from '../../features/FeatureCommandAttacher'
import AbstractCliTest from '../../tests/AbstractCliTest'

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
	aliasesInvocations: string[]
}

export default class FeatureCommandAttacherTest extends AbstractCliTest {
	private static attacher: FeatureCommandAttacher
	private static program: MockProgram

	protected static async beforeEach() {
		await super.beforeEach()

		this.program = this.MockCommanderProgram()
		const installer = this.FeatureInstaller()
		const term = this.ui

		this.attacher = new FeatureCommandAttacher({
			program: this.program,
			featureInstaller: installer,
			ui: term,
			emitter: this.Emitter(),
		})
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

		assert.doesInclude(this.program.commandInvocations, 'create.schema')
		assert.doesInclude(this.program.commandInvocations, 'sync.schemas')
		assert.doesInclude(this.program.commandInvocations, 'sync.fields')

		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'create.schema',
		})
		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'sync.schemas',
		})
		assert.doesInclude(this.program.descriptionInvocations, {
			command: 'sync.fields',
		})

		assert.doesInclude(this.program.actionInvocations, 'create.schema')
		assert.doesInclude(this.program.actionInvocations, 'sync.schemas')
		assert.doesInclude(this.program.actionInvocations, 'sync.fields')
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
			command: 'create.schema',
			option: '--schemaBuilderDestinationDir <schemaBuilderDestinationDir>',
			defaultValue: 'src/schemas',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'create.schema',
			option: '--description <description>',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'sync.fields',
			option: '--addonsLookupDir <addonsLookupDir>',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'sync.schemas',
			option: '--fetchRemoteSchemas [true|false]',
		})

		assert.doesInclude(this.program.optionInvocations, {
			command: 'sync.schemas',
			option: '--generateCoreSchemaTypes [true|false]',
		})
	}

	@test.skip('enable when private fields can be optionally shown in help.')
	protected static async ignoresPrivateFields() {
		await this.attachSchemaFeature()

		assert.doesNotInclude(this.program.optionInvocations, {
			command: 'create.schema',
			option: '--enableVersioning [true|false]',
		})
	}

	@test()
	protected static async testBooleanArg() {
		const cli = await this.Cli()
		const vscodeFeature = cli.getFeature('vscode')

		await this.attacher.attachFeature(vscodeFeature)

		assert.doesInclude(this.program.optionInvocations, {
			command: 'setup.vscode',
			option: '--all [true|false]',
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
			aliasesInvocations: [],
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
			//@ts-ignore
			aliases(aliases: string[]) {
				this.aliasesInvocations.push(...aliases)
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
