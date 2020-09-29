import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import SpruceError from '../../errors/SpruceError'
import TerminalInterface from '../../interfaces/TerminalInterface'

export default class SyncingBadSchemasProvidesHelpfulErrorMessagesTest extends AbstractSchemaTest {
	@test()
	protected static async syncingBadSchemasProvidesHelpfulErrorMessages() {
		const cli = await this.syncSchemas('syncing-bad-schemas')

		const schemasDir = this.resolvePath('src', 'schemas')
		await diskUtil.copyDir(
			this.resolveTestPath('test_builders_one_bad'),
			schemasDir
		)

		const results = await cli.getFeature('schema').Action('sync').execute({})
		assert.isArray(results.errors)
		assert.isEqual(
			results.errors[0].friendlyMessage(),
			`Oh shoot! 🤔

Failed to load related schema for schemaTwov2020_06_23.relatedToBad

Original error: Could not find schema -> '{"id":"badSchema","version":"v2020_06_23"}'.

Make sure you are pointing to the correct version.`
		)

		const oldLog = console.log
		let log = ''
		console.log = function (message: string) {
			log += message + '\n'
		}
		const terminalInterface = new TerminalInterface(this.cwd, true)
		terminalInterface.renderError(results.errors[0])
		console.log = oldLog
		assert.doesNotInclude(log, 'Error:')
	}

	@test()
	protected static throwingUnknownErrorDoesNotDoubleUpMessage() {
		const err = new SpruceError({
			//@ts-ignore
			code: 'GO_TEAM',
			friendlyMessage: 'This is a great error',
		})
		const message = err.friendlyMessage()
		assert.isEqual(message, 'This is a great error')
	}
}
