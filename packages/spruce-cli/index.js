#!/usr/bin/env node

require('ts-node').register({
	project: `${__dirname}/tsconfig.json`
})
require('./src/index.ts')
