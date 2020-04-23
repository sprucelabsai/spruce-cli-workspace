#!/usr/bin/env node

require('ts-node').register({
	dir: __dirname
	// TranspileOnly: true
})
require('./src/index.ts')
