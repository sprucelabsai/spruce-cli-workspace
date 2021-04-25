import { Script } from '../../ScriptPlayer'

const script: Script = [
	'Look at us go! 😄',
	"I'm about to setup testing.",
	'Real testing.',
	'Remember the whole 3 Laws of Test Driven Development thing? You are def gonna wanna watch this before continuing -> https://bit.ly/3ls9phs',
	'Ok, getting down off my robot soapbox.',
	'First thing I gotta do is install some more dependencies.',
	'You read to go?',
	async (player) => {
		await player.ui.waitForEnter('')
	},
]

export default script
