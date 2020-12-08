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
const term = new TerminalInterface(__dirname, true)
const start = new Date().getTime()

let progressInterval: any

async function run() {
	term.clear()
	term.renderHeadline(`Found ${testKeys.length} skills to cache.`)
	let messages: [string, any][] = []

	progressInterval = setInterval(async () => {
		term.clear()
		term.renderHeadline(`Found ${testKeys.length} skills to cache.`)

		for (const message of messages) {
			term.renderLine(message[0], message[1])
		}

		term.renderLine('\n')

		const now = new Date().getTime()
		const delta = now - start

		await term.startLoading(
			`Building ${remaining} skill${dropInS(
				remaining
			)} (${durationUtil.msToFriendly(delta)})...`
		)
	}, 1000)

	function renderLine(message: any, effects?: any) {
		messages.push([message, effects])
	}

	function renderWarning(message: any, effects?: any) {
		messages.push([message, effects])
	}

	await term.startLoading(
		`Building ${remaining} remaining skill${dropInS(remaining)}...`
	)

	for (const cacheKey of testKeys) {
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
			apiClientFactory: mercuryFixture.getApiClientFactory(),
		})

		const cacheTracker = fixture.loadCacheTracker()

		if (cacheTracker[cacheKey] && diskUtil.doesDirExist(cwd)) {
			remaining--
			renderLine(`'${cacheKey}' already cached. Skipping...`, [
				GraphicsTextEffect.Italic,
			])
			return
		}

		if (diskUtil.doesDirExist(cwd)) {
			renderWarning(
				`Found cached '${cacheKey}', but deleted it since it was not in the cache tracker (may take a minute)....`
			)
			diskUtil.deleteDir(cwd)
		}

		renderLine(`Starting to build '${cacheKey}'...`, [
			GraphicsTextEffect.Bold,
			GraphicsTextEffect.Green,
		])

		renderLine('')

		await fixture.installFeatures(options, cacheKey)

		remaining--

		await term.startLoading(
			`Done caching '${cacheKey}'. ${remaining} remaining...`
		)
	}

	// await Promise.all(promises)
	await term.stopLoading()
	term.clear()
	clearInterval(progressInterval)
}

function dropInS(remaining: number) {
	return remaining === 1 ? '' : 's'
}

void run().catch((err) => {
	term.renderError(err)
	if (progressInterval) {
		clearInterval(progressInterval)
	}
})
