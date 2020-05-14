import path from 'path'
import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import { Templates } from '@sprucelabs/spruce-templates'
import fs from 'fs-extra'
import { IAutoloaded } from '#spruce/autoloaders'
import { Feature } from '#spruce/autoloaders/features'
import { IServices } from '#spruce/autoloaders/services'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { ErrorCode } from '#spruce/errors/codes.types'
import Autoloadable from '../Autoloadable'
import SpruceError from '../errors/SpruceError'
import log from '../lib/log'
import { WriteMode } from '../types/cli'
import TerminalUtility from '../utilities/TerminalUtility'

export interface IFeatureOptions {
	cwd: string
	templates: Templates
}

export interface IFeaturePackage {
	/** The full package name */
	name: string
	/** The package version. Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export default abstract class AbstractFeature<
	S extends ISchemaDefinition = any
> extends Autoloadable {
	/** Other features that must also be installed for this feature to work */
	public featureDependencies: Feature[] = []

	/** The required npm packages for this feature */
	public packages: IFeaturePackage[] = []

	public optionsSchema?: () => ISchemaDefinition

	/** Convenience method that references this.utilities.terminal */
	protected term!: TerminalUtility

	protected utilities!: IUtilities
	protected services!: IServices
	protected templates: Templates

	/** A description of this feature */
	public abstract description: string

	public constructor(options: IFeatureOptions) {
		super(options)
		this.cwd = options.cwd
		this.templates = options.templates
	}

	public afterAutoload(autoloaded: IAutoloaded) {
		this.utilities = autoloaded.utilities
		this.services = autoloaded.services
		this.term = this.utilities.terminal
	}

	/** Called before packages have been installed */
	public async beforePackageInstall(_options: {
		answers: SchemaDefinitionValues<S>
	}): Promise<void> {}

	/** Called after packages have been installed */
	public async afterPackageInstall(_options: {
		answers: SchemaDefinitionValues<S>
	}): Promise<void> {}

	/** Writes the template files */
	protected async writeDirectoryTemplate(options: {
		template: TemplateKind
		/** Force overwrite the file even if it exists. The default behavior is to throw an error */
		mode?: WriteMode
		/** The data to send to the template */
		templateData?: Record<string, any>
	}) {
		const { template, templateData, mode } = options
		const templateDirectory = await TemplateDirectory.build({
			template,
			templateData
		})

		for (let i = 0; i < templateDirectory.files.length; i += 1) {
			const file = templateDirectory.files[i]
			const filePathToWrite = path.join(this.cwd, file.relativePath)
			const dirPathToWrite = path.dirname(filePathToWrite)
			await fs.ensureDir(dirPathToWrite)
			const fileExists = fs.existsSync(filePathToWrite)
			if (fileExists && mode === WriteMode.Throw) {
				throw new SpruceError({
					code: ErrorCode.FileExists,
					file: filePathToWrite,
					friendlyMessage: `The file already exists. Remove this file or set a different WriteMode`
				})
			} else if (!fileExists || mode === WriteMode.Overwrite) {
				await fs.writeFile(filePathToWrite, file.contents)
			}
		}
	}

	protected async containsAllTemplateFiles(options: {
		templateKind: TemplateKind
		/** The directory to check if a skill is installed. Default is the cwd. */
		dir?: string
	}) {
		const { templateKind, dir } = options
		const cwd = dir ?? this.cwd
		const filesToCheck = await TemplateDirectory.filesInTemplate(templateKind)
		// Check if the .spruce directory exists
		let filesMissing = false
		for (let i = 0; i < filesToCheck.length; i += 1) {
			const file = path.join(cwd, filesToCheck[i])
			if (!fs.existsSync(file)) {
				log.debug(
					`[${templateKind}] containsAllTemplateFiles failed because ${file} is missing`
				)
				filesMissing = true
				break
			}
		}

		if (!filesMissing) {
			return true
		}

		return false
	}

	/** Should return true if the feature is currently installed */
	public abstract isInstalled(): Promise<boolean>
}
