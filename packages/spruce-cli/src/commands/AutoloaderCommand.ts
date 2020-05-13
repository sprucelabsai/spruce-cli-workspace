/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from 'commander'
import path from 'path'
import _ from 'lodash'
import inflection from 'inflection'
import AbstractCommand from './AbstractCommand'
import log from '../lib/log'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '#spruce/errors/codes.types'

export default class AutoloaderCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('autoloader [dir]')
			.description('Generate an autoloader for files in the directory')
			.option(
				'-p, --pattern <pattern>',
				'Only autoload files in this directory that match the globby pattern. Default: **/*.ts'
			)
			.option(
				'-s, --suffix <suffix>',
				'Only loads files that end with this suffix and strip it from the returned name. Not set by default.'
			)
			.action(this.generateAutoloader.bind(this))
	}

	private async generateAutoloader(dir: string, cmd: Command) {
		// Glob all the files in the folder
		const fullDirectory = this.resolvePath(dir)

		const pattern = cmd.pattern
			? (cmd.pattern as string).replace("'", '').replace('"', '')
			: '**/*.ts'

		const suffix = cmd.suffix ? (cmd.suffix as string) : ''

		const globbyPattern = `${fullDirectory}/${pattern}`

		log.trace('Generating autoloader: ', {
			globbyPattern,
			fullDirectory
		})
		// Parse all the files in the directory
		const { filePaths, ...info } = await this.utilities.parser.parseFileGroup({
			globbyPattern,
			suffix
		})
		const fileName = `${path.basename(fullDirectory)}`

		// Generate the autoloader file
		if (!info.abstractClassName || !info.abstractClassRelativePath) {
			throw new SpruceError({
				code: ErrorCode.CreateAutoloaderFailed,
				directory: fullDirectory,
				globbyPattern,
				filePaths,
				suffix,
				friendlyMessage:
					'An abstract class that your classes extend could not be found.'
			})
		}

		if (info.classes.length === 0) {
			throw new SpruceError({
				code: ErrorCode.CreateAutoloaderFailed,
				directory: fullDirectory,
				globbyPattern,
				filePaths,
				suffix,
				friendlyMessage:
					'No classes were found. Check the suffix and/or pattern'
			})
		}
		const namePascal = _.upperFirst(fileName)
		const namePlural = inflection.pluralize(namePascal)
		const nameSingular = inflection.singularize(namePascal)

		const autoloaderFileContents = this.templates.autoloader({
			abstractClassName: info.abstractClassName,
			abstractClassRelativePath: info.abstractClassRelativePath,
			classes: info.classes,
			interfaces: info.interfaces,
			nameSingular,
			namePlural
		})

		// Write the file
		const filename = `.spruce/autoloaders/${fileName}.ts`
		await this.writeFile(filename, autoloaderFileContents)

		await this.services.lint.fix(filename)

		this.utilities.terminal.headline('Autoloader Created 🎉')
		this.utilities.terminal.codeSample(
			`import ${fileName}Autoloader from '#spruce/autoloaders/${fileName}'\nconst ${fileName} = await ${fileName}Autoloader({ constructorOptions: options })`
		)
	}
}
