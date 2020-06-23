import path from 'path'
import { ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import { Command } from 'commander'
// import ErrorCode from '#spruce/errors/errorCode'
import FieldType from '#spruce/schemas/fields/fieldType'
// import SpruceError from '../errors/SpruceError'
import FeatureManager, { FeatureCode } from '../FeatureManager'
import SkillStore from '../stores/SkillStore'
import UserStore from '../stores/UserStore'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

export interface ISkillCommandOptions extends ICommandOptions {
	featureManager: FeatureManager
	stores: {
		user: UserStore
		skill: SkillStore
	}
}

export default class SkillCommand extends AbstractCommand {
	private featureManager: FeatureManager
	private userStore: UserStore
	private skillStore: SkillStore

	/** Sets up commands */
	public attachCommands = (program: Command) => {
		program
			.command('skill.create')
			.description('Sets up a skill in the current directory')
			.option(
				'-s --silent',
				'Suppress terminal output if a skill is already set up'
			)
			.action(this.create)
		// program
		// 	.command('skill:login [skillId] [skillApiKey]')
		// 	.description('Authenticate as a skill')
		// 	.action(this.login)
		program
			.command('skill:switch')
			.description('Switch to a different skill')
			.action(this.switch)
	}

	public create = async (cmd: Command) => {
		const isInstalled = await this.featureManager.isInstalled({
			features: [FeatureCode.Skill]
		})

		if (isInstalled && !cmd.silent) {
			this.term.info('Nothing to do. A skill is already installed here.')
			return
		}

		// Is it installed in directories further up?
		let parentInstallDirectory: string | undefined
		let done = false
		let dirToCheck = path.resolve(this.cwd, '..')
		while (!done) {
			this.featureManager.cwd = dirToCheck
			const installedInParent = await this.featureManager.isInstalled({
				features: [FeatureCode.Skill]
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
			createSkill = await this.term.prompt({
				type: FieldType.Boolean,
				label: `A Skill is already installed in ${parentInstallDirectory}. Are you sure you want to create a skill here?`,
				isRequired: true
			})
		}

		console.log(createSkill)
		throw new Error('finish')
	}
	// }
	public switch = async () => {
		const loggedInUser = this.userStore.getLoggedInUser()
		if (!loggedInUser) {
			this.term.fatal('You are not logged in as a person!')
			this.term.hint('Try spruce user:login')
			return
		}

		const skills = await this.skillStore.getSkills(loggedInUser.token)

		if (skills.length === 0) {
			this.term.warn(`You don't have any skills tied to you as a developer.`)
			this.term.hint('Try spruce skill:create to get started')
			return
		}

		//Select a skill
		const skillChoices: ISelectFieldDefinitionChoice[] = skills.map(
			(skill, idx) => ({
				value: String(idx),
				label: skill.name
			})
		)

		const selectedIdx = await this.term.prompt({
			type: FieldType.Select,
			label: 'Select a skill',
			isRequired: true,
			options: {
				choices: skillChoices
			}
		})

		const selectedSkill = skills[parseInt(selectedIdx, 10)]
		if (selectedSkill) {
			this.skillStore.setLoggedInSkill(selectedSkill)
		}
	}
	public constructor(options: ISkillCommandOptions) {
		super(options)
		this.featureManager = options.featureManager
		this.userStore = options.stores.user
		this.skillStore = options.stores.skill
	}

	// public login = async (
	// 	skillId?: string,
	// 	skillApiKey?: string
	// ): Promise<void> => {
	// 	const loggedInUser = this.userStore.getLoggedInUser()
	// 	const loggedInSkill = this.skillStore.getLoggedInSkill()
	// 	const authType = this.userStore.authType

	// 	if (skillId) {
	// 		throw new SpruceError({
	// 			code: ErrorCode.CommandNotImplemented,
	// 			command: 'skill:login with skill id',
	// 			args: [skillId, skillApiKey || '**no api key**']
	// 		})
	// 	}

	// 	// If they passed nothing and we're in a skill dir, lets ask if they want to use that
	// 	if (this.isInSkillDirectory() && (!skillId || !skillApiKey)) {
	// 		const skillFromDir = this.skillStore.skillFromDir(this.cwd)

	// 		// Are we in a different directory that the logged in one?
	// 		if (
	// 			skillFromDir &&
	// 			(loggedInSkill?.id !== skillFromDir.id || authType !== StoreAuth.Skill)
	// 		) {
	// 			const confirm = await this.term.confirm(
	// 				`You are in the ${skillFromDir.slug} directory, want to login as that?`
	// 			)

	// 			if (confirm) {
	// 				this.skillStore.setLoggedInSkill(skillFromDir)
	// 				this.term.writeLn(`You are now authenticated as ${skillFromDir.slug}`)
	// 				return
	// 			}
	// 		}
	// 	}

	// 	if (!loggedInUser && (!skillId || !skillApiKey)) {
	// 		this.term.error(
	// 			'You must first login as a user to get access to skills (unless you know the id and api key)'
	// 		)

	// 		this.term.hint('Try user:login or skill:login SKILL_ID API_KEY')
	// 		return
	// 	}

	// 	// If we are authing as a user, lets confirm we want to login as a user going forward
	// 	if (loggedInUser && authType === StoreAuth.User) {
	// 		const pass = await this.term.confirm(
	// 			`You are currently logged as ${loggedInUser.casualName}, are you sure you want to log out as a user and in as a skill?`
	// 		)
	// 		if (!pass) {
	// 			this.term.info('OK, bailing out...')
	// 			return
	// 		}
	// 	}

	// 	//Lets find all skills by this user
	// 	if (loggedInUser && (!skillId || !skillApiKey)) {
	// 		const skills = await this.skillStore.skills(loggedInUser.token)
	// 		if (skills.length === 0) {
	// 			this.term.warn(`You don't have any skills tied to you as a developer.`)
	// 			this.term.hint('Try spruce skill:create to get started')
	// 			return
	// 		}

	// 		//Select a skill
	// 		const skillChoices: ISelectFieldDefinitionChoice[] = skills.map(
	// 			(skill, idx) => ({
	// 				value: String(idx),
	// 				label: skill.name
	// 			})
	// 		)

	// 		const selectedIdx = await this.term.prompt({
	// 			type: FieldType.Select,
	// 			label: 'Select a skill',
	// 			isRequired: true,
	// 			options: {
	// 				choices: skillChoices
	// 			}
	// 		})

	// 		const selectedSkill = skills[parseInt(selectedIdx, 10)]
	// 		if (selectedSkill) {
	// 			this.skillStore.setLoggedInSkill(selectedSkill)
	// 		}
	// 	}
}
