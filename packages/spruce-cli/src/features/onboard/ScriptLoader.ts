import pathUtil from 'path'
import globby from 'globby'
import OnboardingStore from '../../stores/OnboardingStore'
import { GraphicsInterface } from '../../types/cli.types'
import ScriptPlayer from './ScriptPlayer'

export default class ScriptLoader {
	public static async LoadScripts(options: {
		dir: string
		ui: GraphicsInterface
		onboardingStore: OnboardingStore
	}) {
		const player = new ScriptPlayer(options.ui, options.onboardingStore)
		const scripts = await globby(options.dir + '/**/*.script.js')

		for (const file of scripts) {
			const name = pathUtil.basename(file)
			const search = '.script' + pathUtil.extname(name)
			const key = name.replace(search, '')
			const script = require(file).default

			player.loadScript(key, script)
		}

		return player
	}
}
