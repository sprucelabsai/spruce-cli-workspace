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

	progressInterval =
		process.stdout.isTTY &&
		setInterval(async () => {
			term.clear()
			term.renderHeadline(`Found ${testKeys.length} skills to cache.`)

			for (const message of messages) {
				term.renderLine(message[0], message[1])
			}

			term.renderLine('')

			await term.startLoading(
				`${`Building ${remaining} skill${dropInS(
					remaining
				)}`}. ${durationUtil.msToFriendly(getTimeSpent())}`
			)
		}, 1000)

	function getTimeSpent() {
		const now = new Date().getTime()
		const delta = now - start
		return delta
	}

	function renderLine(message: any, effects?: any) {
		if (process.stdout.isTTY) {
			messages.push([message, effects])
		} else {
			console.log(message)
		}
	}

	function renderWarning(message: any, effects?: any) {
		if (process.stdout.isTTY) {
			messages.push([message, effects])
		} else {
			console.log(message)
		}
	}

	if (process.stdout.isTTY) {
		await term.startLoading(
			`Building ${remaining} remaining skill${dropInS(remaining)}...`
		)
	}

	const promises = testKeys.map(async (cacheKey) => {
		const { cacheTracker, cwd, fixture, options } = setup(cacheKey)

		if (cacheTracker[cacheKey] && diskUtil.doesDirExist(cwd)) {
			remaining--
			renderLine(`'${cacheKey}' already cached. Skipping...`, [
				GraphicsTextEffect.Italic,
			])
		} else {
			await cache(cwd, cacheKey, fixture, options)
			remaining--
		}
	})

	await Promise.all(promises)
	clearInterval(progressInterval)
	await term.stopLoading()
	term.renderLine(`Done! ${durationUtil.msToFriendly(getTimeSpent())}`)

	function setup(cacheKey: string) {
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
		return { cacheTracker, cwd, fixture, options }
	}

	async function cache(
		cwd: string,
		cacheKey: string,
		fixture: FeatureFixture,
		options: any
	) {
		if (diskUtil.doesDirExist(cwd)) {
			renderWarning(
				`Found cached '${cacheKey}', but deleted it since it was not in the cache tracker...`,
				[GraphicsTextEffect.Italic]
			)
			diskUtil.deleteDir(cwd)
		}

		renderLine(`Starting to build '${cacheKey}'...`, [GraphicsTextEffect.Green])

		await fixture.installFeatures(options, cacheKey)

		renderLine(`Done caching '${cacheKey}'. ${remaining - 1} remaining...`, [
			GraphicsTextEffect.Green,
			GraphicsTextEffect.Bold,
		])
	}
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
