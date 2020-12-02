#!/usr/bin/env node
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import FeatureFixture from '../fixtures/FeatureFixture'
import MercuryFixture from '../fixtures/MercuryFixture'
import TerminalInterface from '../interfaces/TerminalInterface'
import ServiceFactory from '../services/ServiceFactory'
import { GraphicsTextEffect } from '../types/cli.types'
import durationUtil from '../utilities/duration.utility'
import testUtil from '../utilities/test.utility'

const packageJsonContents = diskUtil.readFile(
	diskUtil.resolvePath(__dirname, '..', '..', 'package.json')
)

const packageJson = JSON.parse(packageJsonContents)
const { testSkillCache } = packageJson
const testKeys = Object.keys(testSkillCache)

let remaining = testKeys.length
const term = new TerminalInterface(__dirname)
const start = new Date().getTime()

async function run() {
	term.clear()
	term.renderHeadline(`Found ${testKeys.length} skills to cache.`)

	const promises = testKeys.map(async (cacheKey: string) => {
		const options = testSkillCache[cacheKey]

		const importCacheDir = testUtil.resolveCacheDir('spruce-cli-import-cache')

		const serviceFactory = new ServiceFactory({ importCacheDir })
		const cwd = testUtil.resolveCacheDir(cacheKey)

		const mercuryFixture = new MercuryFixture()
		const fixture = new FeatureFixture({
			cwd,
			serviceFactory,
			ui: new TerminalInterface(cwd),
			shouldGenerateCacheIfMissing: true,
			apiClientFactory: mercuryFixture.getApiClientFactory()
		})

		const cacheTracker = fixture.loadCacheTracker()

		if (cacheTracker[cacheKey] && diskUtil.doesDirExist(cwd)) {
			remaining--
			term.renderLine(`'${cacheKey}' already cached. Skipping...`, [
				GraphicsTextEffect.Italic,
			])
			return
		}

		if (diskUtil.doesDirExist(cwd)) {
			term.renderWarning(
				`Found cached '${cacheKey}', but deleted it since it was not in the cache tracker (may take a minute)....`
			)
			diskUtil.deleteDir(cwd)
		}

		term.renderLine(`Starting to build '${cacheKey}'...`, [
			GraphicsTextEffect.Bold,
			GraphicsTextEffect.Green,
		])

		term.renderLine('')

		await fixture.installFeatures(options, cacheKey)

		remaining--

		await term.startLoading(
			`Done caching '${cacheKey}'. ${remaining} remaining...`
		)
	})

	const interval = setInterval(async () => {
		const now = new Date().getTime()
		const delta = now - start

		await term.startLoading(
			`Building ${remaining} skill${dropInS(
				remaining
			)} (${durationUtil.msToFriendly(delta)})...`
		)
	}, 1000)

	await term.startLoading(
		`Building ${remaining} remaining skill${dropInS(remaining)}...`
	)
	await Promise.all(promises)
	await term.stopLoading()
	term.clear()
	clearInterval(interval)
}

function dropInS(remaining: number) {
	return remaining === 1 ? '' : 's'
}

void run().catch((err) => {
	term.renderError(err)
})
