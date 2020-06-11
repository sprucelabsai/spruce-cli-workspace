#!/usr/bin/env node
require('ts-node').register({
	dir: __dirname,
	transpileOnly: true
})

const register = require('@sprucelabs/path-resolver')
register({
	cwd: __dirname,
	extensions: ['.js', '.ts']
})
require('./src/index.ts')
