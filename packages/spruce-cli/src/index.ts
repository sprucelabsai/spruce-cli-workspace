#!/usr/bin/env node

import { run } from './cli'
import TerminalInterface from './interfaces/TerminalInterface'

require('dotenv').config()

run(process.argv)
	.then(() => {
		process.exit(0)
	})
	.catch((err) => {
		const term = new TerminalInterface(
			process.cwd(),
			process.env.CLI_RENDER_STACK_TRACES !== 'false'
		)
		term.renderError(err)
		process.exit(1)
	})
