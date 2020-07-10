import { test, assert } from '@sprucelabs/test'
import { CommanderStatic } from 'commander'
import AbstractCliTest from '../../AbstractCliTest'
import FeatureCommandAttacher from '../../features/FeatureCommandAttacher'

type MockProgram = CommanderStatic['program'] & {
	descriptionInvocations: { command: string; description: string }[]
	commandInvocations: string[]
	actionInvocations: string[]
}

export default class FeatureCommandAttacherTest extends AbstractCliTest {
	private static attacher: FeatureCommandAttacher
	private static program: MockProgram

	protected static async beforeEach() {
		super.beforeEach()

		this.program = this.MockCommanderProgram()
		this.attacher = new FeatureCommandAttacher(this.program)
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
		const cli = await this.Cli()
		const schemaFeature = cli.getFeature('schema')

		await this.attacher.attachFeature(schemaFeature)

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

	private static MockCommanderProgram(): MockProgram {
		// @ts-ignore
		return {
			_lastCommand: '',
			commandInvocations: [],
			descriptionInvocations: [],
			actionInvocations: [],
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
		}
	}
}
