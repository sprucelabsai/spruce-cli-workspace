import { Command } from 'commander'
import path from 'path'
import log from '../lib/log'
import AbstractCommand from './AbstractCommand'
import { ISelectFieldDefinitionChoice, FieldType } from '@sprucelabs/schema'
import { StoreAuth } from '../stores/AbstractStore'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'
import { Feature } from '../../.spruce/autoloaders/features'
// Import globby from 'globby'
// import fs from 'fs-extra'
// import handlebars from 'handlebars'
// import skillState from '../../stores/Skill'

export default class SkillCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('skill:setup')
			.description('Sets up a skill in the current directory')
			.option(
				'-s --silent',
				'Suppress terminal output if a skill is already set up'
			)
			.action(this.setup.bind(this))
		program
			.command('skill:login [skillId] [skillApiKey]')
			.description('Authenticate as a skill')
			.action(this.login.bind(this))
		program
			.command('skill:switch')
			.description('Switch to a different skill')
			.action(this.switch.bind(this))
	}

	public async setup(cmd: Command) {
		const isInstalled = await this.services.feature.isInstalled({
			features: [Feature.Skill]
		})

		if (isInstalled && !cmd.silent) {
			this.utilities.terminal.info(
				'Nothing to do. A skill is already installed here.'
			)
			return
		}

		// Is it installed in directories further up?
		let parentInstallDirectory: string | undefined
		let done = false
		let dirToCheck = path.resolve(this.cwd, '..')
		while (!done) {
			const installedInParent = await this.services.feature.isInstalled({
				features: [Feature.Skill],
				cwd: dirToCheck
			})

			if (installedInParent) {
				parentInstallDirectory = dirToCheck
				done = true
			}

			const nextDirToCheck = path.resolve(dirToCheck, '..')

			if (nextDirToCheck === dirToCheck) {
				done = true
			} else {
				dirToCheck = nextDirToCheck
			}
		}

		let createSkill = true

		if (parentInstallDirectory) {
			createSkill = await this.prompt({
				type: FieldType.Boolean,
				label: `A Skill is already installed in ${parentInstallDirectory}. Are you sure you want to create a skill here?`,
				isRequired: true
			})
		}

		log.debug({ createSkill })

		if (createSkill) {
			await this.services.feature.install([
				{
					feature: Feature.Skill
				}
			])
		}
	}

	public async login(skillId?: string, skillApiKey?: string): Promise<void> {
		const loggedInUser = this.stores.user.loggedInUser()
		const loggedInSkill = this.stores.skill.loggedInSkill()
		const authType = this.stores.user.authType

		if (skillId) {
			throw new SpruceError({
				code: ErrorCode.NotImplemented,
				command: 'skill:login with skill id',
				args: [skillId, skillApiKey || '**no api key**']
			})
		}

		// If they passed nothing and we're in a skill dir, lets ask if they want to use that
		if (this.isInSkillDirectory() && (!skillId || !skillApiKey)) {
			const skillFromDir = this.stores.skill.skillFromDir(this.cwd)

			// Are we in a different directory that the logged in one?
			if (
				skillFromDir &&
				(loggedInSkill?.id !== skillFromDir.id || authType !== StoreAuth.Skill)
			) {
				const confirm = await this.confirm(
					`You are in the ${skillFromDir.slug} directory, want to login as that?`
				)

				if (confirm) {
					this.stores.skill.setLoggedInSkill(skillFromDir)
					this.writeLn(`You are now authenticated as ${skillFromDir.slug}`)
					return
				}
			}
		}

		if (!loggedInUser && (!skillId || !skillApiKey)) {
			this.error(
				'You must first login as a user to get access to skills (unless you know the id and api key)'
			)

			this.hint('Try user:login or skill:login SKILL_ID API_KEY')
			return
		}

		// If we are authing as a user, lets confirm we want to login as a user going forward
		if (loggedInUser && authType === StoreAuth.User) {
			const pass = await this.confirm(
				`You are currently logged as ${loggedInUser.casualName}, are you sure you want to log out as a user and in as a skill?`
			)
			if (!pass) {
				this.info('OK, bailing out...')
				return
			}
		}

		//Lets find all skills by this user
		if (loggedInUser && (!skillId || !skillApiKey)) {
			const skills = await this.stores.skill.skills(loggedInUser.token)
			if (skills.length === 0) {
				this.warn(`You don't have any skills tied to you as a developer.`)
				this.hint('Try spruce skill:create to get started')
				return
			}

			//Select a skill
			const skillChoices: ISelectFieldDefinitionChoice[] = skills.map(
				(skill, idx) => ({
					value: String(idx),
					label: skill.name
				})
			)

			const selectedIdx = await this.prompt({
				type: FieldType.Select,
				label: 'Select a skill',
				isRequired: true,
				options: {
					choices: skillChoices
				}
			})

			const selectedSkill = skills[parseInt(selectedIdx, 10)]
			if (selectedSkill) {
				this.stores.skill.setLoggedInSkill(selectedSkill)
			}
		}
	}

	public async switch() {
		const loggedInUser = this.stores.user.loggedInUser()
		if (!loggedInUser) {
			this.fatal('You are not logged in as a person!')
			this.hint('Try spruce user:login')
			return
		}

		const skills = await this.stores.skill.skills(loggedInUser.token)

		if (skills.length === 0) {
			this.warn(`You don't have any skills tied to you as a developer.`)
			this.hint('Try spruce skill:create to get started')
			return
		}

		//Select a skill
		const skillChoices: ISelectFieldDefinitionChoice[] = skills.map(
			(skill, idx) => ({
				value: String(idx),
				label: skill.name
			})
		)

		const selectedIdx = await this.prompt({
			type: FieldType.Select,
			label: 'Select a skill',
			isRequired: true,
			options: {
				choices: skillChoices
			}
		})

		const selectedSkill = skills[parseInt(selectedIdx, 10)]
		if (selectedSkill) {
			this.stores.skill.setLoggedInSkill(selectedSkill)
		}
	}

	// Public auth(skillId?: string, skillApiKey?: string): Promise<void> {
	// 	return new Promise(async (resolve, reject) => {
	// 		if (!skillId || !skillApiKey) {
	// 			return reject('MISSING_PARAMETERS')
	// 		}
	// 		const m = new Mercury({
	// 			spruceApiUrl: config.getApiUrl(config.remote),
	// 			credentials: {
	// 				id: skillId,
	// 				apiKey: skillApiKey
	// 			},
	// 			onDisconnect: () => {
	// 				console.log('on onDisconnect')
	// 			},
	// 			onConnect: () => {
	// 				console.log('onConnect')
	// 				// resolve()
	// 				const result = m.emit<
	// 					{
	// 						test: string
	// 					},
	// 					{
	// 						testAgain: string
	// 					}
	// 				>(
	// 					{
	// 						eventName: 'booking:get-providers',
	// 						payload: {
	// 							s: 'test'
	// 						}
	// 					},
	// 					() => {
	// 						console.log('return')
	// 						log.debug({
	// 							result,
	// 							skillId,
	// 							skillApiKey
	// 						})
	// 						resolve()
	// 					}
	// 				)
	// 			}
	// 		})
	// 		// console.log('connect', { remote: config.remote })
	// 		// await m.connect({
	// 		// 	spruceApiUrl: config.remote
	// 		// })
	// 	})
	// 	// if (!skillId) {
	// 	// 	const result = await inquirer.prompt({
	// 	// 		type: 'input',
	// 	// 		name: 'skillId',
	// 	// 		message: "What's your skill id?"
	// 	// 	})
	// 	// 	skillId = result.skillId
	// 	// }

	// 	// if (!skillApiKey) {
	// 	// 	const result = await inquirer.prompt({
	// 	// 		type: 'input',
	// 	// 		name: 'skillApiKey',
	// 	// 		message: "What's your skill api key?"
	// 	// 	})
	// 	// 	skillApiKey = result.skillApiKey
	// 	// }

	// 	// const result = await gqlClient.query({
	// 	// 	query: gql`
	// 	// 		query Skill($skillId: ID!) {
	// 	// 			Skill(id: $skillId) {
	// 	// 				id
	// 	// 				name
	// 	// 				eventContract
	// 	// 				apiKey
	// 	// 			}
	// 	// 		}
	// 	// 	`,
	// 	// 	variables: {
	// 	// 		skillId
	// 	// 	}
	// 	// })
	// }

	// protected async copyBaseFiles() {
	// 	if (!skillState.isSet()) {
	// 		this.crit(
	// 			`Unable to create skill files because the skill data is not set for this directory: ${process.cwd()}`
	// 		)
	// 		throw new Error('SKILL_NOT_INITIALIZED')
	// 	}
	// 	const files = globby.sync(`${__dirname}/../../templates/baseSkill/**/*`, {
	// 		dot: true
	// 	})
	// 	for (let i = 0; i < files.length; i += 1) {
	// 		const file = files[i]
	// 		this.log.debug({ file })
	// 		const {
	// 			isHandlebarsTemplate,
	// 			relativeBaseDirectory,
	// 			filename
	// 		} = this.parseTemplateFilePath(file)

	// 		const dirPathToWrite = `${process.cwd()}/${relativeBaseDirectory}`
	// 		const filePathToWrite = `${dirPathToWrite}/${filename}`

	// 		this.object({
	// 			isHandlebarsTemplate,
	// 			relativeBaseDirectory,
	// 			filename,
	// 			dirPathToWrite,
	// 			filePathToWrite
	// 		})

	// 		await fs.ensureDir(dirPathToWrite)
	// 		console.log('wrote path')
	// 		if (isHandlebarsTemplate) {
	// 			const template = fs.readFileSync(file)
	// 			// Compile the file
	// 			const compiledTemplate = handlebars.compile(template.toString())
	// 			const result = compiledTemplate(skillState.toData())

	// 			console.log({
	// 				data: skillState.toData()
	// 			})

	// 			await fs.writeFile(filePathToWrite, result)
	// 		} else {
	// 			// By default just copy the file over as-is
	// 			console.log('COPY***')
	// 			console.log(file)
	// 			console.log(filePathToWrite)
	// 			await fs.copy(file, filePathToWrite)
	// 		}
	// 	}
	// }

	// private async repair() {
	// 	this.writeLn('Repairing...')
	// 	await this.copyBaseFiles()
	// }
}
