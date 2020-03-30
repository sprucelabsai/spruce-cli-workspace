import BaseCommand from '../Base'
import { Command } from 'commander'
import {
	IFieldSelectDefinitionChoice,
	ISchemaFieldsDefinition,
	FieldType
} from '@sprucelabs/schema'
import { shuffle } from 'lodash'

export default class OnboardingCommand extends BaseCommand {
	public attachCommands(program: Command) {
		program
			.command('onboarding')
			.option('-r, --reset', 'Start count over')
			.description('Start onboarding')
			.action(this.onboarding.bind(this))
	}

	public async onboarding(cmd: Command) {
		if (cmd.reset) {
			this.stores.onboarding.setRunCount(0)
		}

		const runCount = this.stores.onboarding.getRunCount()

		// enable onboarding and increment count
		this.stores.onboarding.setIsEnabled(true)
		this.stores.onboarding.incrementRunCount()

		this.clear()
		this.hero(runCount == 0 ? 'You made it!' : 'Onboarding')

		if (runCount === 0) {
			this.writeLn(
				`It's Sprucebot again. It's a lot more cozy in here than online, but that won't slow us down!`
			)
		} else {
			this.writeLn('You ready to get this party started?')
		}

		// wait
		await this.wait()

		this.writeLn(
			`Ok, before we get started you should understand the Pillars of a Skill. Since humans hate writing documentation, take a sec and review ${
				runCount === 0 ? 'the rest of ' : ''
			}the information here: http://developer.spruce.ai/#/getting-started?id=pillars-of-a-skill`
		)

		await this.wait()

		const confirm = await this.confirm(
			`Wow, you read that fast! You read everything?`
		)

		this.writeLn('')
		this.writeLn(
			confirm
				? 'Great, so lets prove it!'
				: '**ERROR INVALID ANSWER** Great, so lets prove it!'
		)

		await this.wait()

		const questions: {
			key: string
			question: string
			choices: IFieldSelectDefinitionChoice[]
		}[] = [
			{
				key: 'events',
				question: 'The event engine is driven by',
				choices: [
					{
						value: 'mercury',
						label: 'Mercury'
					},
					{
						value: 'jupiter',
						label: 'Jupiter'
					},
					{
						value: 'eventEmitter',
						label: 'EventEmitter'
					},
					{
						value: 'apollo',
						label: 'Apollo'
					}
				]
			},
			{
				key: 'definitions',
				question: 'How do you model data to work across the wire in Spruce?',
				choices: [
					{
						value: 'definitions',
						label: 'Using schemas definitions {{name}}.definitions.ts'
					},
					{
						value: 'dataModels',
						label: 'Using data models {{name}}.dataModel.ts'
					},
					{
						value: 'orm',
						label: 'Using the ORM'
					},
					{
						value: 'json',
						label: 'using json file {{name}}.json'
					}
				]
			},
			{
				key: 'builders',
				question: 'How do you render front end components?',
				choices: [
					{
						value: 'builders',
						label: 'Builders'
					},
					{
						value: 'react',
						label: 'Writing TSX files'
					},
					{
						value: 'nextjs',
						label: 'Nextjs'
					},
					{
						value: 'na',
						label: 'Front ends are not possible in skills'
					}
				]
			}
		]

		const fields: ISchemaFieldsDefinition = {}
		shuffle(questions).forEach(q => {
			fields[q.key] = {
				type: FieldType.Select,
				label: q.question,
				isRequired: true,
				options: {
					choices: shuffle(q.choices)
				}
			}
		})

		const form = this.formBuilder({
			id: 'quiz',
			name: 'onboarding quiz',
			fields
		})

		const values = await form.present({ headline: 'Spruce POP QUIZ!' })
		console.log(values)

		this.clear()
		this.writeLn('All done! Lets see how you did!')
		await this.wait()

		this.clear()
	}
}
