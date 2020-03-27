import { Command } from 'commander'
import inquirer from 'inquirer'
import fs from 'fs'
import config from '../../utilities/Config'
import Skill from './Skill'
import slug from 'slug'
import skillState from '../../stores/Skill'
import userState from '../../stores/User'
import { SpruceEvents } from '../../types/events-generated'
import { FieldType } from '@sprucelabs/schema'

export default class CreateSkill extends Skill {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('skill:create [name]')
			.option(
				'-r, --reset',
				'Resets the current saved state for skill creation'
			)
			.description('Create a new skill')
			.action(this.createSkill.bind(this))
	}

	/**
	 * Create a new skill
	 *
	 * 1. name
	 * 2. slug
	 * 3. organization / location to install at
	 * 4. current directory or new directory
	 * 5.
	 */
	public async createSkill(name: string | null, cmd: Command) {
		// if (cmd.reset) {
		// 	this.resetState()
		// }

		// if (!this.isValidDirectory()) {
		// 	this.fatal(
		// 		'This directory is invalid. A skill already exists here. Log in with "spruce skill:auth"'
		// 	)
		// 	throw new Error('INVALID_DIRECTORY')
		// }

		const state = {}

		const formBuilder = this.formBuilder(
			{
				id: 'skill',
				name: 'Skill',
				fields: {
					name: {
						type: FieldType.Text,
						label: 'Name',
						isRequired: true,
						hint: 'Make it something catchy!'
					},
					slug: {
						type: FieldType.Text,
						label: 'Slug',
						isRequired: true
					},
					description: {
						type: FieldType.Text,
						label: 'Description'
					}
				}
			},
			state
		)
		const values = await formBuilder.present({
			headline: 'Create your skill!',
			showOverview: true
		})

		state.name = values.name
		state.slug = values.slug
		state.description = values.description
	}

	// private resetState() {
	// 	config.save({
	// 		[this.lastStateKey]: null
	// 	})
	// }

	// private printState() {
	// 	this.clear()
	// 	const state = config.get(this.lastStateKey) || {}
	// 	this.section({ headline: 'Create a new Skill', object: state })
	// }

	// private setName(name: string) {
	// 	const state = config.get(this.lastStateKey) || {}
	// 	state.name = name

	// 	if (!state.slug) {
	// 		state.slug = this.slugify(name)
	// 	}

	// 	config.save({
	// 		[this.lastStateKey]: state
	// 	})
	// }

	// private async handleChoice(choice: Choice, withError?: string) {
	// 	this.clear()
	// 	if (withError) {
	// 		this.crit(withError)
	// 	}
	// 	switch (choice) {
	// 		case Choice.Name:
	// 			await this.handleNameChange()
	// 			break
	// 		case Choice.Slug:
	// 			await this.handleSlugChange()
	// 			break
	// 		case Choice.Description:
	// 			await this.handleDescriptionChange()
	// 			break
	// 		case Choice.Done:
	// 			await this.saveNewSkill()
	// 			break
	// 		default:
	// 			this.warn(`No option available for choice: ${choice}`)
	// 			break
	// 	}
	// }

	// private async handleNameChange() {
	// 	const state = config.get(this.lastStateKey) || {}

	// 	const result = await this.prompt({
	// 		type: FieldType.Text,
	// 		isRequired: true,
	// 		message: 'Set the name of your skill',
	// 		default: state.name
	// 	})

	// 	this.setName(result)

	// 	await this.presentSelections()
	// }

	// private async handleSlugChange() {
	// 	const state = config.get(this.lastStateKey) || {}

	// 	const result = await inquirer.prompt({
	// 		type: 'input',
	// 		name: 'answer',
	// 		message: 'Set the slug for your skill',
	// 		default: this.slugify(state.name)
	// 	})

	// 	state.slug = result.answer
	// 	config.save({
	// 		[this.lastStateKey]: state
	// 	})

	// 	await this.presentSelections()
	// }

	// private async handleDescriptionChange() {
	// 	const state = config.get(this.lastStateKey) || {}

	// 	const result = await inquirer.prompt({
	// 		type: 'input',
	// 		name: 'answer',
	// 		message: 'Set the description for your skill',
	// 		default: state.description
	// 	})

	// 	state.description = result.answer
	// 	config.save({
	// 		[this.lastStateKey]: state
	// 	})

	// 	await this.presentSelections()
	// }

	// private async presentSelections(withError?: string) {
	// 	this.printState()
	// 	if (withError) {
	// 		this.crit(withError)
	// 	}
	// 	// First make sure that all required fields are filled out
	// 	let state = config.get(this.lastStateKey) || {}
	// 	if (!state.name) {
	// 		await this.handleNameChange()
	// 		state = config.get(this.lastStateKey)
	// 		return
	// 	}
	// 	if (!state.slug) {
	// 		await this.handleSlugChange()
	// 		state = config.get(this.lastStateKey)
	// 		return
	// 	}
	// 	if (!state.description) {
	// 		await this.handleDescriptionChange()
	// 		state = config.get(this.lastStateKey)
	// 		return
	// 	}

	// 	const choices = [
	// 		{ name: 'NAME - Set the name of your skill', value: Choice.Name },
	// 		{ name: 'SLUG - Set your skill slug', value: Choice.Slug },
	// 		{
	// 			name: 'DESCRIPTION - Set your skill description',
	// 			value: Choice.Description
	// 		},
	// 		new inquirer.Separator(),
	// 		{ name: '🎉 All done! Create the skill!', value: Choice.Done }
	// 	]

	// 	const result = await inquirer.prompt({
	// 		type: 'list',
	// 		name: 'answer',
	// 		message: 'Would you like to change anything?',
	// 		choices
	// 	})

	// 	await this.handleChoice(result.answer)
	// }

	// private isValidDirectory() {
	// 	const spruceDirectory = `${process.cwd()}/.spruce`
	// 	try {
	// 		fs.readdirSync(spruceDirectory)
	// 	} catch (e) {
	// 		// No spruce directry exists
	// 		return true
	// 	}

	// 	return false
	// }

	// private async saveNewSkill() {
	// 	const state = config.get(this.lastStateKey) || {}

	// 	if (!userState.currentUser) {
	// 		this.fatal(
	// 			'You need be be logged in to create a new skill. Try "spruce user:login"'
	// 		)
	// 		return
	// 	}

	// 	const directory = `${process.cwd()}/${state.slug}`

	// 	const useNewDirectoryResult = await inquirer.prompt({
	// 		type: 'list',
	// 		name: 'answer',
	// 		message: 'Where should I create this skill?',
	// 		choices: [
	// 			{
	// 				name: `This directory: ${process.cwd()}`,
	// 				value: 'thisDirectory'
	// 			},
	// 			{
	// 				name: `New directory: ${directory}`,
	// 				value: 'newDirectory'
	// 			}
	// 		]
	// 	})

	// 	const originalDirectory = process.cwd()

	// 	if (useNewDirectoryResult.answer === 'newDirectory') {
	// 		// Create the new directory and change to it
	// 		if (!fs.existsSync(directory)) {
	// 			fs.mkdirSync(directory)
	// 		} else {
	// 			// Directory exists...should we warn?
	// 			this.log.debug(`${directory} already exists. Not creating it.`)
	// 		}
	// 		process.chdir(directory)
	// 	}

	// 	// const response = await userState.currentUser.mercury.emit<SpruceEvents.core.RegisterSkill.IPayload>
	// 	let result
	// 	try {
	// 		result = await userState.currentUser.mercury.emit<
	// 			SpruceEvents.core.RegisterSkill.IPayload,
	// 			SpruceEvents.core.RegisterSkill.IResponseBody
	// 		>({
	// 			eventName: SpruceEvents.core.RegisterSkill.name,
	// 			payload: {
	// 				name: state.name,
	// 				slug: state.slug,
	// 				description: state.description
	// 			}
	// 		})
	// 	} catch (e) {
	// 		process.chdir(originalDirectory)
	// 		if (e.message === 'SLUG_TAKEN') {
	// 			await this.handleChoice(
	// 				Choice.Slug,
	// 				`The slug "${state.slug}" is already taken. Try a different slug. Or, if you meant to connect to an existing skill run "spruce skill:set"`
	// 			)
	// 		} else if (e.message === 'NAME_TAKEN') {
	// 			await this.handleChoice(
	// 				Choice.Name,
	// 				`The name "${state.name}" is already taken. Try a different name. Or, if you meant to connect to an existing skill run "spruce skill:set"`
	// 			)
	// 		} else {
	// 			this.log.debug(e)
	// 		}
	// 		return
	// 	}

	// 	if (result?.responses[0]?.payload.slug) {
	// 		skillState.id = result.responses[0].payload.id
	// 		skillState.apiKey = result.responses[0].payload.apiKey
	// 		skillState.name = result.responses[0].payload.name
	// 		skillState.description = result.responses[0].payload.description
	// 		skillState.slug = result.responses[0].payload.slug
	// 		skillState.remote = config.remote
	// 		skillState.save()
	// 	} else {
	// 		this.crit('Unable to create skill')
	// 	}

	// 	this.copyBaseFiles()
	// }

	// private slugify(name: string) {
	// 	return slug(name, {
	// 		lower: true,
	// 		replacement: '_',
	// 		remove: /[-]/g
	// 	})
	// }
}
