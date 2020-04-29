import fs from 'fs-extra'
import path from 'path'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import { Feature } from '#spruce/autoloaders/features'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '#spruce/autoloaders/services'
import {
	ISchemaDefinition,
	SchemaFields,
	SchemaDefinitionValues
} from '@sprucelabs/schema'

export interface IFeatureOptions {
	cwd: string
	utilities: IUtilities
	services: IServices
}

export interface IFeaturePackage {
	/** The full package name */
	name: string
	/** The package version. Defaults to "latest" */
	version?: string
	/** Whether to install this in "devDependencies" */
	isDev?: boolean
}

export enum WriteDirectoryMode {
	/** Throw an error if the file already exists. This is the default behavior */
	Throw = 'throw',
	/** Overwrite any file that already exists */
	Overwrite = 'overwrite',
	/** Skips files that exists and only creates files that don't already exist */
	Skip = 'skip'
}

// export interface IAbstractFeature<S extends ISchemaDefinition> {
// 	optionsSchema: S
// }

export default abstract class AbstractFeature<S extends ISchemaDefinition> {
	/** Other features that must also be installed for this feature to work */
	public featureDependencies: Feature[] = []

	/** The current working directory */
	protected cwd: string

	protected utilities: IUtilities
	protected services: IServices

	/** The required npm packages for this feature */
	public abstract packages: IFeaturePackage[]

	public abstract optionsSchema: ISchemaDefinition

	public constructor(options: IFeatureOptions) {
		this.cwd = options.cwd
		this.utilities = options.utilities
		this.services = options.services
	}

	/** Called before packages have been installed */
	public async beforePackageInstall(_options: {
		answers: SchemaDefinitionValues<S>
	}): Promise<void> {}

	/** Called after packages have been installed */
	public async afterPackageInstall(_options: SchemaFields<S>): Promise<void> {}

	/** Writes the template files */
	protected async writeDirectoryTemplate(options: {
		template: TemplateKind
		/** Force overwrite the file even if it exists. The default behavior is to throw an error */
		mode?: WriteDirectoryMode
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
			fs.ensureDirSync(dirPathToWrite)
			const fileExists = fs.existsSync(filePathToWrite)
			if (fileExists && mode === WriteDirectoryMode.Throw) {
				throw new Error('File already exists.')
			} else if (!fileExists || mode === WriteDirectoryMode.Overwrite) {
				fs.writeFileSync(filePathToWrite, file.contents)
			}
		}
	}

	/** Should return true if the feature is currently installed */
	public abstract isInstalled(): Promise<boolean>
}
