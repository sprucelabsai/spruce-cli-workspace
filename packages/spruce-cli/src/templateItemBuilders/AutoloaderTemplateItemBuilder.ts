import path from 'path'
import {
	IAutoLoaderTemplateItem,
	IRootAutoloaderTemplateItem,
	IAutoLoaderClassTemplateItem,
	IAutoLoaderInterfaceTemplateItem,
	IAutoLoaderImportTemplateItem,
} from '@sprucelabs/spruce-templates'
import globby from 'globby'
import ErrorCode from '#spruce/errors/errorCode'
import autoloaderDefinition from '#spruce/schemas/local/autoloader.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import IntrospectionUtility from '../utilities/introspection.utility'
import NamesUtility from '../utilities/names.utility'
import AbstractTemplateItemBuilder from './AbstractTemplateItemBuilder'

export default class AutoloaderTemplateItemBuilder extends AbstractTemplateItemBuilder {
	private cache: Record<string, any> = {}
	/** Build the template item needed to build the root autoloader  */
	public async buildRootTemplateItem(
		autoloaders: SpruceSchemas.Local.IAutoloader[]
	): Promise<IRootAutoloaderTemplateItem> {
		const templateItems: IAutoLoaderTemplateItem[] = await Promise.all(
			autoloaders.map((autoloader) => {
				const directory = autoloader.lookupDir.path
				const pattern = autoloader.pattern
				return this.buildTemplateItem({
					directory: path.join(this.cwd, directory),
					pattern,
				})
			})
		)

		return { autoloaders: templateItems }
	}

	/** Build all the template item needed to autoload everything in a directory */
	public async buildTemplateItem(options: {
		/** The directory i'll look in to pull autoloaded classes */
		directory: string
		/** An optional pattern i'll match against when loading files */
		pattern?: string
	}): Promise<IAutoLoaderTemplateItem> {
		const {
			directory,
			pattern = autoloaderDefinition.fields.pattern.defaultValue,
		} = options

		const cacheKey = `${directory}-${pattern}-${this.cwd}`
		if (this.cache[cacheKey]) {
			return this.cache[cacheKey]
		}
		const globbyPattern = `${directory}/${pattern}`
		const filePaths = await globby(globbyPattern)
		const results = IntrospectionUtility.introspect(filePaths)
		const classes: IAutoLoaderClassTemplateItem[] = []
		const interfaces: IAutoLoaderInterfaceTemplateItem[] = []
		let abstractClass:
			| {
					className: string
					relativeFilePath: string
					optionsInterfaceName?: string
			  }
			| undefined

		const namePlural = `${path.basename(directory)}`
		const nameCamelPlural = NamesUtility.toCamel(namePlural)
		const namePascalPlural = NamesUtility.toPascal(namePlural)
		const name = NamesUtility.toSingular(namePlural)
		const namePascal = NamesUtility.toPascal(name)
		const nameCamel = NamesUtility.toCamel(namePascal)

		results.forEach((introspection, idx) => {
			const filePath = filePaths[idx]
				.replace(this.cwd, '')
				.replace(path.extname(filePaths[idx]), '')

			// build interface template items
			introspection.interfaces.forEach((i) => {
				interfaces.push({
					interfaceName: i.interfaceName,
					relativeFilePath: `#spruce/..${filePath}`,
				})
			})

			// build class template items
			introspection.classes.forEach((i) => {
				if (i.isAbstract) {
					abstractClass = {
						className: i.className,
						relativeFilePath: `#spruce/..${filePath}`,
						optionsInterfaceName: i.optionsInterfaceName,
					}
				} else {
					classes.push({
						optionsInterfaceName: i.optionsInterfaceName,
						// AutoloaderUtility -> Autoloader since namePascal wll be Utility
						className: i.className,
						nameCamel: NamesUtility.toCamel(i.className).replace(
							namePascal,
							''
						),
						namePascal: NamesUtility.toPascal(
							NamesUtility.toCamel(i.className).replace(namePascal, '')
						),
						relativeFilePath: `#spruce/..${filePath}`,
					})
				}
			})
		})

		if (!abstractClass) {
			throw new SpruceError({
				code: ErrorCode.NotImplemented,
				friendlyMessage: `Autoloader classes in ${directory} need to inherit and abstract class that lives in the same directory. If you deleted a directory, try running \`spruce autoloader:sync\``,
			})
		}

		const constructorOptionInterfaces: IAutoLoaderImportTemplateItem[] = []

		classes.forEach((item) => {
			if (
				item.optionsInterfaceName &&
				!constructorOptionInterfaces.find(
					(i) => i.name === item.optionsInterfaceName
				)
			) {
				const path = interfaces.find(
					(i) => i.interfaceName === item.optionsInterfaceName
				)
				if (path) {
					constructorOptionInterfaces.push({
						name: item.optionsInterfaceName,
						filePath: path.relativeFilePath,
					})
				}
			}
		})

		const templateItem = {
			abstractClassName: abstractClass.className,
			abstractClassRelativePath: abstractClass.relativeFilePath,
			abstractClassOptionsInterfaceName: abstractClass.optionsInterfaceName,
			interfaces,
			classes,
			namePascalPlural,
			namePascal,
			nameCamel,
			nameCamelPlural,
			constructorOptionInterfaces,
		}

		this.cache[cacheKey] = templateItem

		return templateItem
	}
}
