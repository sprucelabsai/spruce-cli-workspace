import { ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import { Command } from 'commander'
import ErrorCode from '#spruce/errors/errorCode'
import FieldType from '#spruce/schemas/fields/fieldType'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import { Service } from '../factories/ServiceFactory'
import { ITerminalEffect } from '../interfaces/TerminalInterface'
import PinService from '../services/PinService'
import RemoteStore from '../stores/RemoteStore'
import SkillStore from '../stores/SkillStore'
import UserStore from '../stores/UserStore'
import { AuthedAs } from '../types/cli.types'
import AbstractCommand, { ICommandOptions } from './AbstractCommand'

interface IUserCommandOptions extends ICommandOptions {
	services: {
		pin: PinService
	}
	stores: {
		user: UserStore
		skill: SkillStore
		remote: RemoteStore
	}
}

export default class UserCommand extends AbstractCommand {
	protected userStore: UserStore
	protected skillStore: SkillStore
	protected remoteStore: RemoteStore

	public constructor(options: IUserCommandOptions) {
		super(options)
		this.userStore = options.stores.user
		this.skillStore = options.stores.skill
		this.remoteStore = options.stores.remote
	}
	/** Sets up commands */
	public attachCommands = (program: Command) => {
		program
			.command('whoami')
			.description('Get information about your logged in user(s)')
			.action(this.whoAmI)

		program
			.command('user:login [phoneNumber]')
			.description('Authenticate with the CLI as a user')
			.action(this.login)

		program
			.command('user:logout')
			.description('Logs the current user out')
			.action(this.logout)

		program
			.command('user:switch')
			.description('Switches the current user')
			.action(this.switchUser)
	}

	public login = async (phoneNumber?: string): Promise<void> => {
		let phone = phoneNumber
		let pinLabel = 'Enter the pin I just sent!'

		if (!phone) {
			phone = await this.term.prompt({
				type: FieldType.Phone,
				isRequired: true,
				label: "What's your cell?"
			})
		}

		this.term.startLoading('Requesting pin')

		await this.PinService().requestPin(phone)

		this.term.stopLoading()

		let user: SpruceSchemas.Local.ICliUserWithToken | undefined

		let valid = false

		do {
			const pin = await this.term.prompt({
				type: FieldType.Text,
				isRequired: true,
				label: pinLabel
			})

			this.term.startLoading('Verifying identity...')

			try {
				user = await this.userStore.fetchUserWithTokenFromPhone(phone, pin)
				valid = true

				this.term.stopLoading()
			} catch (err) {
				this.term.stopLoading()

				if (err instanceof SpruceError) {
					this.term.error(err.friendlyMessage())
					throw err
				} else if (err.message === 'PIN_NOT_FOUND') {
					this.term.error('That was the wrong pin!')
					pinLabel = "Let's give it another try, pin please"
				} else {
					this.term.error(err.message)
				}
			}
		} while (!valid)

		if (!user || !user.id) {
			throw new SpruceError({
				code: ErrorCode.UserNotFound,
				friendlyMessage:
					'This should never have happened, but the user is missing.'
			})
		}

		// Log in the user
		this.userStore.setLoggedInUser(user)

		// Show their deets (plus jwt)
		this.whoAmI()
	}

	public logout = () => {
		this.userStore.logout()
		this.term.info('Logout successful')
	}

	public switchUser = async () => {
		const users = this.userStore.getUsers()

		if (users.length === 0) {
			this.term.warn('You are not logged in as anyone, try `spruce user:login`')
		}

		const choices: ISelectFieldDefinitionChoice[] = users.map((user, idx) => ({
			value: String(idx),
			label: user.casualName
		}))

		const loggedInUser = this.userStore.getLoggedInUser()
		const userIdx = await this.term.prompt({
			type: FieldType.Select,
			label: 'Select previously logged in user',
			isRequired: true,
			defaultValue: loggedInUser && loggedInUser.id,
			options: {
				choices
			}
		})

		const selectedUser = users[parseInt(userIdx, 10)]

		this.userStore.setLoggedInUser(selectedUser)
		this.whoAmI()
	}

	public whoAmI = () => {
		const user = this.userStore.getLoggedInUser()
		const skill = this.skillStore.getLoggedInSkill()
		const authType = this.remoteStore.authType
		const headerEffects = [
			ITerminalEffect.SpruceHeader,
			ITerminalEffect.Red,
			ITerminalEffect.Blue,
			ITerminalEffect.Green
		]

		if (user && authType === AuthedAs.User) {
			this.term.section({
				headline: `Logged in as human: ${user.casualName}`,
				object: user,
				headlineEffects: headerEffects
			})
		} else if (skill && authType === AuthedAs.Skill) {
			this.term.section({
				headline: `Logged in as skill: ${skill.name}`,
				object: skill,
				headlineEffects: headerEffects
			})
		} else {
			this.term.writeLn('Not currently logged in')
		}
	}

	private PinService = () => {
		return this.serviceFactory.Service(this.cwd, Service.Pin)
	}
}
