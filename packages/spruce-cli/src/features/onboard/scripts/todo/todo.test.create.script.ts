import { Script } from '../../ScriptPlayer'

const script: Script = [
	'Great work!',
	"For this first skill, I'm thinking a little todo app? How about you?",
	"Because we follow the 3 Laws of Test Driven Development (https://bit.ly/3ls9phs), we're going to write our first test!",
	"This first test will be an Implementation test, lets name it 'Todo tracker'!",
	"It'll be the class that does the work on our Todo items (which don't exist yet).",
	async (player) => {
		await player.ui.waitForEnter('')
		player.ui.renderLine(
			'Ok, last thing, this is the end of the onboarding for now. More to come, 2021. Turning of onboarding. Please check out developer.spruce.ai and play around. Thanks! 💪'
		)
		player.ui.renderLine('')
		await player.ui.waitForEnter('')

		player.onboardingStore.reset()
	},
]

export default script
