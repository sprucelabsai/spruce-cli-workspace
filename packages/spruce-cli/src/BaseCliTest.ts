import path from 'path'
import readline from 'readline'
import BaseSpruceTest from '@sprucelabs/test'
import fs from 'fs-extra'
import uuid from 'uuid'
import { setup } from './index'
import TerminalUtility from './utilities/TerminalUtility'

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

export default class BaseCliTest extends BaseSpruceTest {
	protected static async beforeEach() {
		this.cwd = this.ensureTmpDirectory()
	}

	protected static async cli() {
		const cli = await setup({
			cwd: this.cwd
		})
		return cli
	}

	protected static term() {
		return new TerminalUtility({ cwd: this.cwd })
	}

	protected static ensureTmpDirectory() {
		const tmpDirectory = path.join(__dirname, '..', 'tmp', uuid.v4())
		fs.ensureDirSync(tmpDirectory)

		return tmpDirectory
	}

	protected static async sendInput(input: string) {
		// because there is a delay between sending output to the terminal and it actually rendering and being ready for input, we delay before sending input
		await new Promise(resolve => setTimeout(resolve, 50))

		for (let i = 0; i < input.length; i++) {
			// @ts-ignore
			rl.input.emit('keypress', input[i])
		}
		// @ts-ignore
		rl.input.emit('keypress', null, { name: 'enter' })

		await new Promise(resolve => setTimeout(resolve, 50))
	}
}
