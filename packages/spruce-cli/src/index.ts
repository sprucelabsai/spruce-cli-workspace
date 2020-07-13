#!/usr/bin/env node

import { run } from './cli'
import TerminalInterface from './interfaces/TerminalInterface'

run(
	process.argv,
	typeof global.v8debug === 'object' ||
		/--debug|--inspect/.test(process.execArgv.join(' '))
)
	.then(() => {
		process.exit(0)
	})
	.catch((e) => {
		const term = new TerminalInterface(process.cwd())
		term.handleError(e)
		process.exit(1)
	})
