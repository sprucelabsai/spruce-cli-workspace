#!/usr/bin/env node

import { run } from './cli'
import TerminalInterface from './interfaces/TerminalInterface'

require('dotenv').config()

run(
	process.argv,
	typeof global.v8debug === 'object' ||
		/--debug|--inspect/.test(process.execArgv.join(' '))
)
	.then(() => {
		process.exit(0)
	})
	.catch((err) => {
		const term = new TerminalInterface(
			process.cwd(),
			process.env.RENDER_STACKTRACES === 'true'
		)
		term.renderError(err)
		process.exit(1)
	})
