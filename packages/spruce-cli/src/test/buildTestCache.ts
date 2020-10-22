#!/usr/bin/env node
import os from 'os'
import { Mercury } from '@sprucelabs/mercury'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import FeatureFixture from '../fixtures/FeatureFixture'
import TerminalInterface from '../interfaces/TerminalInterface'
import ServiceFactory from '../services/ServiceFactory'

const packageJsonContents = diskUtil.readFile(
	diskUtil.resolvePath(__dirname, '..', '..', 'package.json')
)

const packageJson = JSON.parse(packageJsonContents)
const { testSkillCache } = packageJson
const testKeys = Object.keys(testSkillCache)

let remaining = testKeys.length

console.log(`Found ${testKeys.length} skills to cache.`)
testKeys.forEach(async (cacheKey: string) => {
	const options = testSkillCache[cacheKey]

	const cwd = diskUtil.resolvePath(os.tmpdir(), 'spruce-cli', cacheKey)
	const importCacheDir = diskUtil.resolvePath(
		os.tmpdir(),
		'spruce-cli-import-cache'
	)

	const mercury = new Mercury()
	const serviceFactory = new ServiceFactory({ mercury, importCacheDir })
	const term = new TerminalInterface(cwd)

	const fixture = new FeatureFixture(cwd, serviceFactory, term)

	const cacheTrackerPath = fixture.getTestCacheTrackerFilePath()
	const cacheTrackerContents = diskUtil.doesFileExist(cacheTrackerPath)
		? diskUtil.readFile(cacheTrackerPath)
		: '{}'
	const cacheTracker = JSON.parse(cacheTrackerContents)

	if (cacheTracker[cacheKey] && diskUtil.doesDirExist(cwd)) {
		remaining--
		console.log(
			`Skipping ${cacheKey} to ${cwd}. Already exists in cache tracker. ${remaining} caches remaining`
		)
		return
	}

	if (diskUtil.doesDirExist(cwd)) {
		console.log(
			'Found cached skill, but deleted it since it was not in the cache tracker.'
		)
		diskUtil.deleteDir(cwd)
	}

	cacheTracker[cacheKey] = cwd

	console.log(`Adding to cache tracker at ${cacheTrackerPath}`)
	diskUtil.writeFile(cacheTrackerPath, JSON.stringify(cacheTracker, null, 2))

	console.log(`Starting to cache ${cacheKey} to ${cwd}.`)

	await fixture.installFeatures(options)

	remaining--

	console.log(`Done installing ${cacheKey}. ${remaining} caches remaining.`)
})
