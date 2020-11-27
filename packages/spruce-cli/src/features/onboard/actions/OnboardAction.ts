import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import onboardActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/onboardAction.schema'
import { GraphicsTextEffect } from '../../../types/cli.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { FeatureActionResponse } from '../../features.types'

type Script = (string | (() => Promise<void>))[]

export default class ListenAction extends AbstractFeatureAction<SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema> {
	public name = 'onboard'
	public optionsSchema: SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema = onboardActionSchema

	public async execute(
		_options: SpruceSchemas.SpruceCli.v2020_07_22.OnboardAction
	): Promise<FeatureActionResponse> {
		const script: Script = [
			'Hey there! 👋',
			"I'm Sprucebot. 🌲🤖",
			"I'll be your narrator on this journey to creating your first experience.",
			async () => {
				await this.ui.waitForEnter('Lets get started...')
			},
			async () => {
				this.ui.clear()
			},
			async () => {
				await this.renderDoors()
			},
			'You are strolling through the forest when you stumble onto a clearing.',
			'In the clearing there are two heavy, thick, doors.',
			'They are free standing. You walk around them a few times before...',
			'You see words scribed onto each.',
			'The door to the left says, "Quick start. 30 minutes."',
			'The door to the right says, "Immersive. 4-6 weeks."',
			'"Four to six week onboarding!?" You say out loud. "What the actual sh**!?"',
			"You don't have 4-6 weeks to do onboarding. But, you take pride in your work and doing things the right way.",
		]

		await this.playScript(script)

		let done = false

		do {
			const answer = await this.ui.prompt({
				type: 'select',
				label: 'Which door do you choose?',
				isRequired: true,
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

			switch (answer) {
				case 'immersive':
					await this.playScript(this.immersiveScript())
					break
				case 'short':
					await this.playScript(this.shortScript())
					done = true
					break
			}
		} while (!done)

		return {
			headline: `Lets rock!`,
			summaryLines: [
				'Next step: `spruce error.create`',
				'If stuck: `spruce onboard`',
			],
		}
	}

	private async renderDoors() {
		await this.ui.renderImage(
			diskUtil.resolvePath(__dirname, '../../../../docs/images/doors.jpg'),
			{
				width: 100,
				height: 35,
			}
		)
	}

	private async renderInside() {
		await this.ui.renderImage(
			diskUtil.resolvePath(__dirname, '../../../../docs/images/inside.jpg'),
			{
				width: 100,
				height: 35,
			}
		)
	}

	public shortScript(): Script {
		return [
			async () => {
				this.ui.clear()
				await this.renderInside()
			},
			"You push the door open and enter into the largest room you've ever seen.",
			"So big, in fact, that you can't see any of the walls.",
			'A familiar voice echos...',
			'"Hey! It\'s Sprucebot again! 🌲🤖"',
			async () => {
				const line = `This is so much fun! I love playing both the narrator and a character!`
				this.ui.renderLine(line, [GraphicsTextEffect.Italic])
				this.ui.renderLine('')
			},
			'Anyway... "Since all good software starts with a test, lets start there!"',
			'"Go ahead and create a new directory anywhere on your computer, enter the directory, then run:"',
			async () => {
				this.renderCommand('spruce error.create')
			},

			'Tip! If you ever got lost, just run',
			async () => {
				this.renderCommand(`spruce onboard`)
			},
			"and I'll get you back on track.",
			async () => {
				await this.ui.waitForEnter('"Ok, lets do it! See you there!"')
			},
		]
	}

	private renderCommand(command: string) {
		this.ui.renderLine(command, [GraphicsTextEffect.BgMagenta])
		this.ui.renderLine('')
	}

	private immersiveScript(): Script {
		return [
			async () => {
				this.ui.clear()
				await this.renderListening()
			},
			'You approach the "Immersive" door and grab the handle...',
			"It won't budge no matter how hard you try.",
			'You hear a sound, so you put your ear to the door.',
			'From the other side, someone yells, "Work in progress. Try the door on the left! Thaaaaaanks!!"',
			'You back away...',
			async () => {
				await this.ui.waitForEnter()
				this.ui.clear()
				await this.renderDoors()
			},
		]
	}

	private renderListening() {
		return this.ui.renderImage(
			diskUtil.resolvePath(__dirname, '../../../../docs/images/listen.jpg'),
			{
				width: 100,
				height: 23,
			}
		)
	}

	private async playScript(messages: (string | (() => Promise<void>))[]) {
		for (const message of messages) {
			if (typeof message === 'string') {
				this.ui.renderLine(message)
				this.ui.renderLine('')
			} else {
				await message()
			}
		}
	}
}
