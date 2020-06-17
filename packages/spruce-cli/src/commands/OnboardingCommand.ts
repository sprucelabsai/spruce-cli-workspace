import { Command } from 'commander'
import FieldType from '#spruce/schemas/fields/fieldType'
import AbstractCommand from './AbstractCommand'

export default class OnboardingCommand extends AbstractCommand {
	public attachCommands(program: Command) {
		program
			.command('onboarding')
			.option('-r, --reset', 'Start count over')
			.description('Start onboarding')
			.action(this.onboarding)
	}

	public onboarding = async (cmd: Command) => {
		if (cmd.reset) {
			this.stores.onboarding.setRunCount(0)
		}

		const runCount = this.stores.onboarding.getRunCount()

		// Enable onboarding and increment count
		this.stores.onboarding.setIsEnabled(true)
		this.stores.onboarding.incrementRunCount()

		this.term.clear()
		this.term.hero(runCount == 0 ? 'You made it!' : 'Onboarding')

		if (runCount === 0) {
			await this.term.wait(
				`It's Sprucebot again. It's a lot more cozy in here than online, but that won't slow us down!`
			)
		} else {
			await this.term.wait('You ready to get this party started?')
		}

		this.term.writeLn(
			`Ok, before we get started you should understand the Pillars of a Skill. Since humans hate writing documentation, take a sec and review ${
				runCount === 0 ? 'the rest of ' : ''
			}the information here: http://developer.spruce.ai/#/getting-started?id=pillars-of-a-skill`
		)

		await this.term.wait()

		const confirm = await this.term.confirm(
			`Wow, you read that fast! You read everything?`
		)

		await this.term.wait(
			confirm
				? 'Great, so lets prove it!'
				: '**ERROR INVALID ANSWER** Great, so lets prove it!'
		)

		const quiz = this.quizBuilder({
			questions: {
				events: {
					type: FieldType.Select,
					question: 'The event engine is driven by',
					answers: ['Mercury', 'Jupiter', 'EventEmitter', 'Apollo']
				},
				definitions: {
					type: FieldType.Select,
					question: 'How do you model data to work over the wire in Spruce?',
					answers: [
						'Using schemas definitions {{name}}.definitions.ts',
						'Using data models {{name}}.dataModel.ts',
						'Using the ORM',
						'Using json file {{name}}.json'
					]
				},
				builders: {
					type: FieldType.Select,
					question: 'How do you render front end components?',
					answers: [
						'builders',
						'React',
						'Nextjs',
						'Front ends are not possible'
					]
				}
			}
		})

		const results = await quiz.present({ headline: 'Spruce POP QUIZ!' })

		this.term.clear()
		this.term.writeLn('All done! Lets see how you did!')

		await this.term.wait()
		await quiz.scorecard()

		if (results.percentCorrect < 1) {
			this.term.wait('Hmmmmm...')
		}

		this.term.writeLn(
			"Ok, that's all for now. When you're ready to start your skill, run `spruce skill:create`."
		)

		this.term.wait(`I'll see you there!`)
	}
}
