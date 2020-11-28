import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { GraphicsInterface, GraphicsTextEffect } from '../../../types/cli.types'
import { CallbackPlayer, Script } from '../ScriptPlayer'

const script: Script = [
	async (player) => {
		player.ui.clear()
		await renderEnter(player)
	},
	"You push the door open and enter into the largest room you've ever seen.",
	"So big, in fact, you can't see where the floors end and the walls begin.",
	'A familiar voice echos...',
	'"Hey! It\'s Sprucebot again! 🌲🤖"',
	async (player) => {
		const line = `This is so much fun! I love playng both the narrator and a charactor!`
		player.ui.renderLine(line, [GraphicsTextEffect.Italic])
		player.ui.renderLine('')
	},
	'Anyway... "Since all good software starts with a test, lets start there!"',
	'"Go ahead and create a new directory anywhere on your computer and run"',
	async (player) => {
		renderCommand(player.ui, 'spruce error.create')
	},

	'"Tip! If you ever got lost, just run"',
	async (player) => {
		renderCommand(player.ui, `spruce onboard`)
	},
	'"and I\'ll get you back on track."',
	async (player) => {
		await player.ui.waitForEnter('"Ok, lets do it! See you there!"')

		player.onboardingStore.setMode('short')
		player.onboardingStore.setStage('test.create')
	},
]

export function renderEnter(player: CallbackPlayer) {
	return player.ui.renderImage(
		diskUtil.resolvePath(__dirname, '../../../../docs/images/inside.jpg'),
		{
			width: 100,
			height: 35,
		}
	)
}

export function renderCommand(ui: GraphicsInterface, command: string) {
	ui.renderLine(command, [
		GraphicsTextEffect.BgMagenta,
		GraphicsTextEffect.White,
	])
	ui.renderLine('')
}

export default script
