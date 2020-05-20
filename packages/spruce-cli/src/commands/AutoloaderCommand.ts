import { DirectoryTemplateKind } from '@sprucelabs/spruce-templates'
import { Command } from 'commander'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractCommand from './AbstractCommand'
import { FieldType } from '#spruce:schema/fields/fieldType'

export default class AutoloaderCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		program
			.command('autoloader:create [name]')
			.description('Generate an autoloader for files in the directory')
			.option(
				'-p, --pattern <pattern>',
				'Only autoload files in this directory that match the globby pattern.',
				SpruceSchemas.Local.Autoloader.definition.fields.pattern.defaultValue
			)
			.option(
				'-l, --lookupDir <lookupDir>',
				'If creating based on existing dir, this is that dir.'
			)
			.option(
				'-d, --destination <destination>',
				'Where should I save the autoloadable files being created?',
				'src/'
			)
			.option(
				'-ad, --autoloaderDestination <autoloaderDestination>',
				'Where should I save the new autoloader?',
				'.spruce/autoloaders/'
			)
			.option(
				'-rad, --rootAutoloaderDestination <rootAutoloaderDestination>',
				'Where should I save the root autoloader?',
				'.spruce/autoloaders/'
			)
			.option('-f, --force', 'Force create directory if doing new?')
			.action(this.create.bind(this))

		program
			.command('autoloader:sync')
			.description(
				'Syncs all autoloaders you have ever created and cleans out deleted ones.'
			)
			.option(
				'-rad, --rootAutoloaderDestination <rootAutoloaderDestination>',
				'Where should I save the root autoloader?',
				'.spruce/autoloaders/'
			)
			.action(this.sync.bind(this))

		program
			.command('autoloader:root [destination]')
			.description(
				'Generates the root autoloader that loads all other autoloaders.'
			)
			.action(this.root.bind(this))
	}

	private async sync(cmd: Command) {
		const rootAutoloaderDestination = cmd.rootAutoloaderDestination as string
		const autoloaders = await this.stores.autoloader.autoloaders()

		this.term.startLoading(
			`Found ${autoloaders.length} autoloaders, generating now....`
		)

		// lets check autoloaders exist and if not, clear them out
		for (let i = 0; i < autoloaders.length; i++) {
			const autoloader = autoloaders[i]
			const lookupDir = this.resolvePath(this.cwd, autoloader.lookupDir.path)
			// if it does not exist, lets delete it
			if (!this.doesFileExist(lookupDir)) {
				const confirm = await this.term.confirm(
					`Could not find autoloader at ${autoloader.lookupDir.path}, you good if I delete the autoloader?`
				)
				if (confirm) {
					this.stores.autoloader.removeAutoloader(autoloader)
				}
			} else {
				// if it does exist, lets generate the autoloader
				this.term.startLoading(
					`Generating autoloader for ${autoloader.lookupDir.path}`
				)
				const templateItem = await this.utilities.autoloader.buildTemplateItem({
					directory: lookupDir,
					pattern: autoloader.pattern
				})

				const autoloaderContents = this.templates.autoloader(templateItem)
				const destination = this.resolvePath(
					this.cwd,
					autoloader.destination.path || '',
					autoloader.destination.name
				)
				await this.writeFile(destination, autoloaderContents)
			}
		}

		this.term.startLoading('Generating root autoloader')
		await this.generators.autoloader.generateRoot(
			this.resolvePath(rootAutoloaderDestination, 'index.ts')
		)

		this.term.startLoading(
			'Prettying generated files (you can use them now)...'
		)
		await this.services.lint.fix(
			this.resolvePath(rootAutoloaderDestination) + '**/*.ts'
		)
	}

	private async create(name: string | undefined, cmd: Command) {
		// get all options off command
		const autoloaderDestination = cmd.autoloaderDestination as string
		const rootAutoloaderDestination = cmd.rootAutoloaderDestination as string
		let lookupDir = cmd.lookupDir as string | undefined
		const pattern = (cmd.pattern as string).replace("'", '').replace('"', '')

		const createdFiles: { name: string; path: string }[] = []

		// if they pass a name, we're creating a new autoloader with no existing files
		if (name) {
			// make names utility a bit more accessible
			const names = this.utilities.names

			// best guesses on names
			const namePascal = names.toSingular(names.toPascal(name))
			const namePascalPlural = names.toPlural(names.toPascal(name))
			const nameCamelPlural = names.toCamel(namePascalPlural)

			const form = this.formBuilder({
				definition: SpruceSchemas.Local.NamedTemplateItem.definition,
				initialValues: {
					namePascal,
					namePascalPlural,
					nameCamelPlural
				},
				onWillAskQuestion: this.utilities.names.onWillAskQuestionHandler.bind(
					this.utilities.names
				)
			})

			const values = await form.present({
				showOverview: true,
				fields: [
					'namePascal',
					'namePascalPlural',
					'nameCamelPlural',
					'description'
				]
			})

			// build the destination directory
			const destination = this.resolvePath(
				cmd.destination as string,
				nameCamelPlural
			)

			if (this.doesFileExist(destination)) {
				throw new Error(
					'Destination already exists (try spruce autoloader:create and select the directory)'
				)
			}

			const create = await this.term.confirm(
				`Do you want to create ${destination}?`
			)

			if (!create) {
				return
			}

			this.term.startLoading('Generating autoloading files...')

			const directoryTemplate = await this.templates.directoryTemplate({
				kind: DirectoryTemplateKind.Autoloadable,
				context: values
			})

			const abstractContents = directoryTemplate.files.find(
				f => f.relativePath === 'AbstractExample'
			)

			if (!abstractContents) {
				throw new Error('Unknown error, template not found')
			}

			const exampleContents = directoryTemplate.files.find(
				f => f.relativePath === 'SubclassExample'
			)

			if (!exampleContents) {
				throw new Error('Unknown error, template not found')
			}

			const abstractFilename = `Abstract${values.namePascal}.ts`
			const exampleFilename = `Example${values.namePascal}.ts`

			const abstractFilePath = this.resolvePath(destination, abstractFilename)
			this.writeFile(abstractFilePath, abstractContents.contents)

			createdFiles.push({
				name: `Abstract ${values.namePascal} example`,
				path: abstractFilePath
			})

			const exampleFilePath = this.resolvePath(destination, exampleFilename)
			this.writeFile(exampleFilePath, exampleContents.contents)

			createdFiles.push({
				name: `Example ${values.namePascal} example`,
				path: exampleFilePath
			})

			// for looking up later
			lookupDir = destination
		} else {
			do {
				// if they did not give us a name, lets let them select a directory
				const response = await this.term.prompt({
					type: FieldType.Directory,
					isRequired: true,
					label: 'Select directory to autoload'
				})
				const confirm = await this.term.confirm(
					`You want to autoload ${response.path}`
				)

				if (confirm) {
					lookupDir = response.path
				}
			} while (!lookupDir)

			this.term.startLoading('Generating autoloading files...')
		}

		// build the autoloader for the specified directory
		const templateItem = await this.utilities.autoloader.buildTemplateItem({
			directory: lookupDir,
			pattern
		})

		const autoloaderFilePath = this.resolvePath(
			autoloaderDestination,
			`${templateItem.nameCamelPlural}.ts`
		)
		const autoloaderContents = this.templates.autoloader(templateItem)
		await this.writeFile(autoloaderFilePath, autoloaderContents)

		createdFiles.push({
			name: `${templateItem.namePascal} autoloader`,
			path: autoloaderFilePath
		})

		// track this autoloader for sync
		this.stores.autoloader.addAutoloader({
			lookupDir: lookupDir as any,
			pattern,
			destination: autoloaderFilePath as any
		})

		const results = await this.generators.autoloader.generateRoot(
			this.resolvePath(rootAutoloaderDestination, 'index.ts')
		)
		createdFiles.push({
			name: `Root autoloader`,
			path: results.generatedFiles.root
		})

		this.term.stopLoading()
		this.term.clear()
		this.term.createdFileSummary({ createdFiles })

		this.term.headline('Some examples')
		this.term.codeSample(`
// loading your new autoloadables directly
import ${templateItem.nameCamel}Autoloader from '#spruce/autoloaders/${templateItem.nameCamelPlural}'
const ${templateItem.nameCamelPlural} = await ${templateItem.nameCamel}Autoloader({ constructorOptions: options })

// loading a specific autoloadable
const twilio${templateItem.namePascal} = await ${templateItem.nameCamel}Autoloader({ constructorOptions: options, only: ['twilio'] })
`)

		this.term.startLoading('Prettying generate files (you can use them now)...')
		await this.services.lint.fix(autoloaderDestination + '/**/*.ts')
		this.term.stopLoading()
	}

	private async root(destination: string | undefined) {
		this.term.startLoading('Generating root autoloader...')
		const file = this.resolvePath(destination ?? '.spruce/autoloaders/index.ts')
		const results = await this.generators.autoloader.generateRoot(file)

		this.term.clear()
		this.term.createdFileSummary({
			createdFiles: [
				{ name: 'Root autoloader', path: results.generatedFiles.root }
			]
		})

		this.term.startLoading('Prettying root autoloader (use can use it now)...')
		await this.services.lint.fix(file)
	}
}
