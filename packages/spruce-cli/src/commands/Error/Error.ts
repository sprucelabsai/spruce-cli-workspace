import AbstractCommand from '../Abstract'
import { Command } from 'commander'
import namedTemplateItemDefinition from '../../schemas/namedTemplateItem.definition'

export default class ErrorCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('error:create')
			.description('Define a new type of error')
			.action(this.createError.bind(this))
	}

	public createError() {
		debugger

		const form = this.formBuilder(namedTemplateItemDefinition)

		console.log(form)
	}
}
