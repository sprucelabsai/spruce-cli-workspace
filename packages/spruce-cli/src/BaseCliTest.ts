import os from 'os'
import pathUtil from 'path'
import readline, { Interface } from 'readline'
import { Mercury } from '@sprucelabs/mercury'
import BaseSpruceTest from '@sprucelabs/test'
import fs from 'fs-extra'
import uuid from 'uuid'
import { boot } from './cli'
import ServiceFactory, { Service, IServices } from './factories/ServiceFactory'
import TerminalInterface from './interfaces/TerminalInterface'

export default class BaseCliTest extends BaseSpruceTest {
	private static rl: Interface

	protected static ensureTmpDirectory() {
		const tmpDirectory = pathUtil.join(os.tmpdir(), '..', 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}

	protected static resolveTestPath(...pathAfterTestDirsAndFiles: string[]) {
		return pathUtil.join(
			__dirname,
			'__tests__',
			'testDirsAndFiles',
			...pathAfterTestDirsAndFiles
		)
	}

	protected static async beforeAll() {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout
		})
	}

	protected static async beforeEach() {
		this.cwd = this.ensureTmpDirectory()
	}

	protected static async afterAll() {
		this.rl.close()
	}

	protected static async Cli() {
		const cli = await boot({
			cwd: this.cwd
		})
		return cli
	}

	protected static Term() {
		return new TerminalInterface(this.cwd)
	}

	protected static Service<S extends Service>(type: S): IServices[S] {
		const sf = new ServiceFactory(new Mercury())
		return sf.Service(this.cwd, type)
	}

	protected static async sendInput(input: string) {
		// because there is a delay between sending output to the terminal and it actually rendering and being ready for input, we delay before sending input
		await new Promise(resolve => setTimeout(resolve, 50))

		for (let i = 0; i < input.length; i++) {
			// @ts-ignore
			this.rl.input.emit('keypress', input[i])
		}
		// @ts-ignore
		this.rl.input.emit('keypress', null, { name: 'enter' })

		await new Promise(resolve => setTimeout(resolve, 50))
	}
}
