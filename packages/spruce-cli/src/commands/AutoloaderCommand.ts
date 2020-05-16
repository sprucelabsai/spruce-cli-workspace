/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import { Command } from 'commander'
import globby from 'globby'
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import log from '../lib/log'
import AbstractCommand from './AbstractCommand'

export default class AutoloaderCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('autoloader [dir]')
			.description('Generate an autoloader for files in the directory')
			.option(
				'-p, --pattern <pattern>',
				'Only autoload files in this directory that match the globby pattern.',
				'**/*.ts'
			)
			.option(
				'-s, --suffix <suffix>',
				'Only loads files that end with this suffix. Not set by default.'
			)
			.action(this.generateAutoloader.bind(this))

		program
			.command('autoloader:bind')
			.description('Generates an autoloader that loads all other autoloaders')
			.action(this.autoloaderBind.bind(this))
	}

	private async autoloaderBind(_cmd: Command) {
		const globbyPattern = path.join(this.cwd, '.spruce/autoloaders/*.ts')

		const info = await this.utilities.introspection.parseAutoloaders({
			globbyPattern
		})

		const autoloaderFileContents = this.templates.autoloaderIndex(info)

		const filename = `.spruce/autoloaders/index.ts`
		await this.writeFile(filename, autoloaderFileContents)
		await this.services.lint.fix(filename)
	}

	private async generateAutoloader(dir: string, cmd: Command) {
		// Glob all the files in the folder
		const directory = this.resolvePath(dir)
		const pattern = cmd.pattern
			? (cmd.pattern as string).replace("'", '').replace('"', '')
			: '**/*.ts'

		const suffix = cmd.suffix ? (cmd.suffix as string) : ''

		const {
			filePaths,
			...info
		} = await this.utilities.introspection.buildTemplateItems({
			directory,
			suffix
		})
		const fileName = `${path.basename(directory)}`

		// Generate the autoloader file
		if (!info.abstractClassName || !info.abstractClassRelativePath) {
		
		}

		
		const namePascal = this.utilities.names.toPascal(fileName)
		const namePlural = this.utilities.names.toPlural(namePascal)
		const nameSingular = this.utilities.names.toSingular(namePascal)
		const nameCamel = this.utilities.names.toCamel(namePascal)

		const autoloaderFileContents = this.templates.autoloader({
			abstractClassName: info.abstractClassName,
			abstractClassRelativePath: info.abstractClassRelativePath,
			classes: info.classes,
			interfaces: info.interfaces,
			nameSingular,
			namePlural,
			nameCamel
		})

		// Write the file
		const filename = `.spruce/autoloaders/${fileName}.ts`
		await this.writeFile(filename, autoloaderFileContents)

		await this.services.lint.fix(filename)

		this.term.headline('Autoloader Created 🎉')
		this.term.codeSample(
			`import ${fileName}Autoloader from '#spruce/autoloaders/${fileName}'\nconst ${fileName} = await ${fileName}Autoloader({ constructorOptions: options })`
		)

		await this.autoloaderBind(cmd)
	}
}
