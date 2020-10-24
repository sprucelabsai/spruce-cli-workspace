#!/usr/bin/env node
import os from 'os'
import { Mercury } from '@sprucelabs/mercury'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import FeatureFixture from '../fixtures/FeatureFixture'
import TerminalInterface from '../interfaces/TerminalInterface'
import ServiceFactory from '../services/ServiceFactory'
import { GraphicsTextEffect } from '../types/cli.types'

const packageJsonContents = diskUtil.readFile(
	diskUtil.resolvePath(__dirname, '..', '..', 'package.json')
)

const packageJson = JSON.parse(packageJsonContents)
const { testSkillCache } = packageJson
const testKeys = Object.keys(testSkillCache)

let remaining = testKeys.length
const term = new TerminalInterface(__dirname)

async function run() {
	term.clear()
	term.renderHeadline(`Found ${testKeys.length} skills to cache.`)

	const promises = testKeys.map(async (cacheKey: string) => {
		const options = testSkillCache[cacheKey]

		const importCacheDir = diskUtil.resolvePath(
			os.tmpdir(),
			'spruce-cli-import-cache'
		)

		const mercury = new Mercury()
		const serviceFactory = new ServiceFactory({ mercury, importCacheDir })
		const cwd = diskUtil.resolvePath(os.tmpdir(), 'spruce-cli', cacheKey)

		const fixture = new FeatureFixture(
			cwd,
			serviceFactory,
			new TerminalInterface(cwd)
		)

		const cacheTrackerPath = fixture.getTestCacheTrackerFilePath()
		const cacheTrackerContents = diskUtil.doesFileExist(cacheTrackerPath)
			? diskUtil.readFile(cacheTrackerPath)
			: '{}'
		const cacheTracker = JSON.parse(cacheTrackerContents)

		if (cacheTracker[cacheKey] && diskUtil.doesDirExist(cwd)) {
			remaining--
			term.renderLine(`Skipping '${cacheKey}'.`, [GraphicsTextEffect.Italic])
			return
		}

		if (diskUtil.doesDirExist(cwd)) {
			term.renderWarning(
				`Found cached '${cacheKey}', but deleted it since it was not in the cache tracker....`
			)
			diskUtil.deleteDir(cwd)
		}

		cacheTracker[cacheKey] = cwd

		term.renderLine(`Adding to cache tracker.`, [GraphicsTextEffect.Yellow])
		diskUtil.writeFile(cacheTrackerPath, JSON.stringify(cacheTracker, null, 2))

		term.renderLine(`Starting to build '${cacheKey}'...`, [
			GraphicsTextEffect.Bold,
			GraphicsTextEffect.Green,
		])

		term.renderLine('')

		await fixture.installFeatures(options)

		remaining--

		await term.startLoading(
			`Done caching '${cacheKey}'. ${remaining} remaining.`
		)
	})

	await term.startLoading(`Building ${testKeys.length} skills...`)
	await Promise.all(promises)
	await term.stopLoading()
	term.clear()
}

void run().catch((err) => {
	term.renderError(err)
})
