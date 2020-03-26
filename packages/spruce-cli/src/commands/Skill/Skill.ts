import { Command } from 'commander'
import config from '../../utilities/Config'
import { Mercury } from '@sprucelabs/mercury'
import CommandBase from '../Base'
import globby from 'globby'
import fs from 'fs-extra'
import handlebars from 'handlebars'
import skillState from '../../store/Skill'

export default class Skill extends CommandBase {
	/** Sets up commands */
	public attachCommands(program: Command) {
		program
			.command('skill:auth [skillId] [skillApiKey]')
			.description('Authenticate with the CLI as a skill')
			.action(this.auth.bind(this))

		program
			.command('skill:repair')
			.description('Attempt to recover corrupted skill configuration')
			.action(this.repair.bind(this))
	}

	public auth(skillId?: string, skillApiKey?: string): Promise<void> {
		return new Promise(async (resolve, reject) => {
			if (!skillId || !skillApiKey) {
				return reject('MISSING_PARAMETERS')
			}
			const m = new Mercury({
				spruceApiUrl: config.getApiUrl(config.remote),
				credentials: {
					id: skillId,
					apiKey: skillApiKey
				},
				onDisconnect: () => {
					console.log('on onDisconnect')
				},
				onConnect: () => {
					console.log('onConnect')
					// resolve()
					const result = m.emit<
						{
							test: string
						},
						{
							asdlfkjasdf: string
						}
					>(
						{
							eventName: 'booking:get-providers',
							payload: {
								s: 'test'
							}
						},
						() => {
							console.log('return')
							log.debug({
								result,
								skillId,
								skillApiKey
							})
							resolve()
						}
					)
				}
			})
			// console.log('connect', { remote: config.remote })
			// await m.connect({
			// 	spruceApiUrl: config.remote
			// })
		})
		// if (!skillId) {
		// 	const result = await inquirer.prompt({
		// 		type: 'input',
		// 		name: 'skillId',
		// 		message: "What's your skill id?"
		// 	})
		// 	skillId = result.skillId
		// }

		// if (!skillApiKey) {
		// 	const result = await inquirer.prompt({
		// 		type: 'input',
		// 		name: 'skillApiKey',
		// 		message: "What's your skill api key?"
		// 	})
		// 	skillApiKey = result.skillApiKey
		// }

		// const result = await gqlClient.query({
		// 	query: gql`
		// 		query Skill($skillId: ID!) {
		// 			Skill(id: $skillId) {
		// 				id
		// 				name
		// 				eventContract
		// 				apiKey
		// 			}
		// 		}
		// 	`,
		// 	variables: {
		// 		skillId
		// 	}
		// })
	}

	protected async copyBaseFiles() {
		if (!skillState.isSet()) {
			this.crit(
				`Unable to create skill files because the skill data is not set for this directory: ${process.cwd()}`
			)
			throw new Error('SKILL_NOT_INITIALIZED')
		}
		const files = globby.sync(`${__dirname}/../../templates/baseSkill/**/*`, {
			dot: true
		})
		for (let i = 0; i < files.length; i += 1) {
			const file = files[i]
			this.log.debug({ file })
			const {
				isHandlebarsTemplate,
				relativeBaseDirectory,
				filename
			} = this.parseTemplateFilePath(file)

			const dirPathToWrite = `${process.cwd()}/${relativeBaseDirectory}`
			const filePathToWrite = `${dirPathToWrite}/${filename}`

			this.object({
				isHandlebarsTemplate,
				relativeBaseDirectory,
				filename,
				dirPathToWrite,
				filePathToWrite
			})

			await fs.ensureDir(dirPathToWrite)
			console.log('wrote path')
			if (isHandlebarsTemplate) {
				const template = fs.readFileSync(file)
				// Compile the file
				const compiledTemplate = handlebars.compile(template.toString())
				const result = compiledTemplate(skillState.toData())

				console.log({
					data: skillState.toData()
				})

				await fs.writeFile(filePathToWrite, result)
			} else {
				// By default just copy the file over as-is
				console.log('COPY***')
				console.log(file)
				console.log(filePathToWrite)
				await fs.copy(file, filePathToWrite)
			}
		}
	}

	private async repair() {
		this.writeLn('Repairing...')
		await this.copyBaseFiles()
	}
}
