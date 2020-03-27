import { Command } from 'commander'
import chalk from 'chalk'
import config from '../../utilities/Config'
import CommandBase from '../Base'
import usersState from '../../stores/User'
import { FieldType, IFieldSelectDefinitionChoice } from '@sprucelabs/schema'

export default class User extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('user')
			.description('Get information about your logged in user(s)')
			.action(this.userInfo.bind(this))

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

	public async login(phoneNumber?: string): Promise<void> {
		let phone = phoneNumber
		let valid = false
		let pinLabel = 'Enter the pin I just sent!'

		if (!phone) {
			phone = await this.prompt({
				type: FieldType.Phone,
				isRequired: true,
				label: "What's your cell?"
			})
		}

		this.startLoading('Requesting pin')

		await this.store.user.requestPin(phone)

		this.stopLoading()

		do {
			const pin = await this.prompt({
				type: FieldType.Text,
				isRequired: true,
				label: pinLabel
			})

			this.startLoading('Verifying identity...')
			debugger

			try {
				const token = await this.store.user.login(phone, pin)

				this.stopLoading()

				// const token = loginResult?.responses[0]?.payload.jwt

				if (token) {
					await usersState.addUserByJWT({ jwt: token, remote: config.remote })
					valid = true
					this.section({
						headline: 'Login successful',
						lines: [
							'Your token:',
							'',
							token,
							'',
							'This token can be used when working directly with the api (through Mercury).'
						]
					})
				} else {
					this.error(
						"I'm not sure what happened, but the response I got is bad. Maybe a routing issue?"
					)
					pinLabel = 'Pin again, please'
				}
			} catch (err) {
				this.stopLoading()
				if (err.message === 'PIN_NOT_FOUND') {
					this.error('That was the wrong pin!')
					pinLabel = "Let's give it another try, pin please"
				} else {
					this.error(err)
				}
			}

			// pin should arrive any moment, s
		} while (!valid)
	}

	public logout() {
		this.info('Logout successful')

		config.save({
			userToken: null
		})
	}

	public async switchUser() {
		const numUsers = Object.keys(usersState.users).length
		if (numUsers === 0) {
			this.warn('You haven\'t logged in yet! run "spruce user:login"')
			return
		} else if (numUsers === 1) {
			this.warn(
				'There is only 1 user logged in, log in with different phone number using "spruce user:login"'
			)
			return
		}

		const choices: IFieldSelectDefinitionChoice[] = Object.keys(
			usersState.users
		).map(userId => {
			const u = usersState.users[userId]
			return {
				label: `${u.name} (${u.remote})`,
				value: u.id || '**missing id**'
			}
		})

		const result = await this.prompt({
			type: FieldType.Select,
			isRequired: true,
			label: 'Select a current user',
			options: {
				choices
			}
		})

		usersState.setCurrentUser(result)

		const token = usersState.users[result].jwt

		this.section({
			headline: `Active user set to ${usersState.users[result].name}`,
			lines: ['Your token:', '', token || '']
		})
	}

	/** Create a new skill */
	public async createSkill(options?: { name?: string }) {
		let name = options?.name

		if (!name) {
			name = await this.prompt({
				type: FieldType.Text,
				isRequired: true,
				name: 'skillName',
				message: 'What name should we use for your new skill?'
			})
		}

		this.log.debug({ name })
	}

	public async userInfo() {
		const currentUser = usersState.currentUser
		const lines = [
			chalk.bold('Current User:'),
			chalk.magenta(
				` ${currentUser?.name} (${currentUser?.id}) (${currentUser?.remote})`
			),
			'',
			chalk.bold('Available Users:')
		]
		Object.keys(usersState.users).forEach(userId => {
			const user = usersState.users[userId]
			if (user.id !== currentUser?.id) {
				lines.push(` ${user.name} (${user.id}) (${user.remote})`)
			}
		})

		this.writeLns(lines)
	}
}
