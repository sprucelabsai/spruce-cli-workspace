import { Script } from '../../ScriptPlayer'

const script: Script = [
	'Great work!',
	"I'm going to walk you through creating a skill.",
	"Because we follow the 3 Laws of Test Driven Development (https://bit.ly/3ls9phs), we're going to get all the way to our first test.",
	"Don't worry, I'll walk you through it.",
	"You can give your skill a name like 'Todos'.",
	'The description is up to you!',
	async (player) => {
		await player.ui.waitForEnter('')
		player.onboardingStore.reset()
	},
]

export default script
