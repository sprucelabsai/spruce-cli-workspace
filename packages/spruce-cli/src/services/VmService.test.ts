import BaseTest, { test, assert } from '@sprucelabs/test'
import { Command } from 'commander'
import { setup } from '../index'
import { IServices } from '#spruce/autoloaders/services'

let program: Command
let services: IServices

export default class VmServiceTest extends BaseTest {
	protected static async beforeAll() {
		program = new Command()
		const result = await setup(program)
		services = result.services
	}

	@test('Can import a definition')
	protected static async importDefinition() {
		// Spruce.
		assert.isOk(services)
	}
}
