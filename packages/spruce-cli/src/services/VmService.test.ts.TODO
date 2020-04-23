import BaseTest, { test, assert } from '@sprucelabs/test'
import { Command } from 'commander'
import { setup } from '../index'
import { IServices } from '#spruce/autoloaders/services'

let program: Command
let services: IServices

export default class VmServiceTest extends BaseTest {
	// TODO: This is failing on a schema error
	protected static async beforeAll() {
		program = new Command()
		try {
			const result = await setup(program)
			services = result.services
		} catch (e) {
			console.log(e)
		}
	}

	@test('Can import a definition')
	protected static async importDefinition() {
		assert.isOk(services)
	}
}
