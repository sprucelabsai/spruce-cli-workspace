import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboardAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'
let term = require('terminal-kit').terminal

export default class ListenAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema> {
	public name = 'onboard'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema = onboardActionSchema

	public async execute(
		_options: SpruceSchemas.SpruceCli.v2020_07_22.OnboardAction
	): Promise<FeatureActionResponse> {
		await term.drawImage(
			'/Users/taylorromero/Desktop/pixel-art-seamless-background-location-forest-night-landscape-game-application-pixel-art-seamless-background-100597510.jpg',
			{}
		)

		const messages = [
			'Hey there! 👋',
			"I'm Sprucebot. 🌲🤖",
			"I'll be the narrator on your journey to creating your first experience.",
			'Lets get started...',
			'You are strolling through the forest when you stumble onto a clearing.',
			'In the clearing there are two heavy, thick, ornamented doors.',
			'They are free standing. You walk around them a few times before...',
			'You see words scribed onto each.',
			'The door to the left says, "Quick start. 30 minutes."',
			'The door to the right says, "Immersive onboarding. 4-6 weeks."',
			'"Four to six week onboarding!?" you say aloud. What the sh**?',
			"You don't have 4-6 weeks right now. But, you take pride in your work and want to do things right.",
		]

		for (const message of messages) {
			this.ui.renderLine(message)
			await this.breath(this.generateDurationForLine(message))
		}

		const answer = await this.ui.prompt({
			type: 'select',
			label: 'Which do you choose?',
			options: {
				choices: [
					{
						label: 'Left door (30 minutes)',
						value: 'short',
					} as const,
					{
						label: 'Right door (4-6 weeks)',
						value: 'immersive',
					} as const,
				],
			},
		})

		this.ui.renderLine(answer)

		await this.ui.waitForEnter()
		return {}
	}

	private generateDurationForLine(message: string): number {
		return 1000 + message.length * 50
	}

	private async breath(duration = 1000) {
		return new Promise((resolve) => setTimeout(resolve, duration))
	}
}
