import { Command } from 'commander'
import AbstractCommand from '../AbstractCommand'
import { FieldType, ISelectFieldDefinitionChoice } from '@sprucelabs/schema'
import { ErrorCode } from '#spruce/errors/codes.types'
import { StoreAuth } from '../../stores/AbstractStore'
import SpruceError from '../../errors/SpruceError'
import { ITerminalEffect } from '../../utilities/TerminalUtility'
import { SpruceSchemas } from '../../../.spruce/schemas/schemas.types'

export default class UserCommand extends AbstractCommand {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('whoami')
			.description('Get information about your logged in user(s)')
			.action(this.whoAmI.bind(this))

		program
			.command('user:login [phoneNumber]')
			.description('Authenticate with the CLI as a user')
			.action(this.login.bind(this))

		program
			.command('user:logout')
			.description('Logs the current user out')
			.action(this.logout.bind(this))

		program
			.command('user:switch')
			.description('Switches the current user')
			.action(this.switchUser.bind(this))
	}

	/** Log a person in */
	public async login(phoneNumber?: string): Promise<void> {
		let phone = phoneNumber
		let pinLabel = 'Enter the pin I just sent!'

		if (!phone) {
			phone = await this.prompt({
				type: FieldType.Phone,
				isRequired: true,
				label: "What's your cell?"
			})
		}

		this.startLoading('Requesting pin')
		await this.services.pin.requestPin(phone)
		this.stopLoading()

		let user: SpruceSchemas.local.ICliUserWithToken | undefined

		let valid = false

		do {
			const pin = await this.prompt({
				type: FieldType.Text,
				isRequired: true,
				label: pinLabel
			})

			this.startLoading('Verifying identity...')

			try {
				user = await this.stores.user.userWithTokenFromPhone(phone, pin)
				valid = true

				this.stopLoading()
			} catch (err) {
				this.stopLoading()

				if (err instanceof SpruceError) {
					this.error(err.friendlyMessage())
					throw err
				} else if (err.message === 'PIN_NOT_FOUND') {
					this.error('That was the wrong pin!')
					pinLabel = "Let's give it another try, pin please"
				} else {
					this.error(err.message)
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
		this.stores.user.setLoggedInUser(user)

		// Show their deets (plus jwt)
		this.whoAmI()
	}

	public logout() {
		this.stores.user.logout()
		this.info('Logout successful')
	}

	public async switchUser() {
		const users = this.stores.user.users()

		if (users.length === 0) {
			this.warn('You are not logged in as anyone, try `spruce user:login`')
		}

		const choices: ISelectFieldDefinitionChoice[] = users.map((user, idx) => ({
			value: String(idx),
			label: user.casualName
		}))

		const loggedInUser = this.stores.user.loggedInUser()
		const userIdx = await this.prompt({
			type: FieldType.Select,
			label: 'Select previously logged in user',
			isRequired: true,
			defaultValue: loggedInUser && loggedInUser.id,
			options: {
				choices
			}
		})

		const selectedUser = users[parseInt(userIdx, 10)]

		this.stores.user.setLoggedInUser(selectedUser)
		this.whoAmI()
	}

	public async whoAmI() {
		const user = this.stores.user.loggedInUser()
		const skill = this.stores.skill.loggedInSkill()
		const authType = this.stores.remote.authType
		const headerEffects = [
			ITerminalEffect.SpruceHeader,
			ITerminalEffect.Red,
			ITerminalEffect.Blue,
			ITerminalEffect.Green
		]

		if (user && authType === StoreAuth.User) {
			this.section({
				headline: `Logged in as human: ${user.casualName}`,
				object: user,
				headlineEffects: headerEffects
			})
		} else if (skill && authType === StoreAuth.Skill) {
			this.section({
				headline: `Logged in as skill: ${skill.name}`,
				object: skill,
				headlineEffects: headerEffects
			})
		} else {
			this.writeLn('Not currently logged in')
		}
	}
}
