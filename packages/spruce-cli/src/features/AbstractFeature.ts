import fs from 'fs-extra'
import path from 'path'
import { TemplateDirectory, TemplateKind } from '@sprucelabs/spruce-templates'
import { Feature } from '#spruce/autoloaders/features'
import { IUtilities } from '#spruce/autoloaders/utilities'
import { IServices } from '#spruce/autoloaders/services'

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

export default abstract class AbstractFeature {
	/** Other features that must also be installed for this feature to work */
	public featureDependencies: Feature[] = []

	/** The current working directory */
	protected cwd: string

	protected utilities: IUtilities
	protected services: IServices

	/** The required npm packages for this feature */
	public abstract packages: IFeaturePackage[]

	public constructor(options: IFeatureOptions) {
		this.cwd = options.cwd
		this.utilities = options.utilities
		this.services = options.services
	}

	/** Called before packages have been installed */
	public async beforePackageInstall(
		_options?: Record<string, any>
	): Promise<void> {}

	/** Called after packages have been installed */
	public async afterPackageInstall(
		_options?: Record<string, any>
	): Promise<void> {}

	/** Writes the template files */
	protected async writeDirectoryTemplate(options: {
		template: TemplateKind
		/** Force overwrite the file even if it exists. The default behavior is to throw an error */
		forceOverwrite?: boolean
		/** The data to send to the template */
		templateData?: Record<string, any>
	}) {
		const { template, templateData, forceOverwrite } = options
		const templateDirectory = await TemplateDirectory.build({
			template,
			templateData
		})

		for (let i = 0; i < templateDirectory.files.length; i += 1) {
			const file = templateDirectory.files[i]
			const filePathToWrite = path.join(this.cwd, file.relativePath)
			const dirPathToWrite = path.dirname(filePathToWrite)
			fs.ensureDirSync(dirPathToWrite)
			if (!forceOverwrite && fs.existsSync(filePathToWrite)) {
				throw new Error('Overwriting file')
			}
			fs.writeFileSync(filePathToWrite, file.contents)
		}
	}

	/** Should return true if the feature is currently installed */
	public abstract isInstalled(): Promise<boolean>
}
