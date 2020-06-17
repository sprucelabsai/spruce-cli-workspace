import path from 'path'
import {
	IAutoLoaderTemplateItem,
	IRootAutoloaderTemplateItem,
	IAutoLoaderClassTemplateItem,
	IAutoLoaderInterfaceTemplateItem,
	IAutoLoaderImportTemplateItem
} from '@sprucelabs/spruce-templates'
import globby from 'globby'
import ErrorCode from '#spruce/errors/errorCode'
import autoloaderDefinition from '#spruce/schemas/local/autoloader.definition'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import AbstractUtility from './AbstractUtility'

export default class AutoloaderUtility extends AbstractUtility {
	private cache: Record<string, any> = {}
	/** Build the template item needed to build the root autoloader  */
	public async buildRootTemplateItem(
		autoloaders: SpruceSchemas.Local.IAutoloader[],
		cwd?: string
	): Promise<IRootAutoloaderTemplateItem> {
		const templateItems: IAutoLoaderTemplateItem[] = await Promise.all(
			autoloaders.map(autoloader => {
				const directory = autoloader.lookupDir.path
				const pattern = autoloader.pattern
				return this.buildTemplateItem({
					directory: path.join(cwd || this.cwd, directory),
					pattern,
					cwd
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
		/** The current directory */
		cwd?: string
	}): Promise<IAutoLoaderTemplateItem> {
		const {
			directory,
			pattern = autoloaderDefinition.fields.pattern.defaultValue,
			cwd = this.cwd
		} = options

		const cacheKey = `${directory}-${pattern}-${cwd}`
		if (this.cache[cacheKey]) {
			return this.cache[cacheKey]
		}
		const globbyPattern = `${directory}/${pattern}`
		const filePaths = await globby(globbyPattern)
		const results = this.utilities.introspection.introspect(filePaths)
		const names = this.utilities.names
		const classes: IAutoLoaderClassTemplateItem[] = []
		const interfaces: IAutoLoaderInterfaceTemplateItem[] = []
		let abstractClass:
			| {
					className: string
					relativeFilePath: string
					constructorOptionsInterfaceName?: string
			  }
			| undefined

		const namePlural = `${path.basename(directory)}`
		const nameCamelPlural = names.toCamel(namePlural)
		const namePascalPlural = names.toPascal(namePlural)
		const name = names.toSingular(namePlural)
		const namePascal = names.toPascal(name)
		const nameCamel = names.toCamel(namePascal)

		results.forEach((introspection, idx) => {
			const filePath = filePaths[idx]
				.replace(cwd, '')
				.replace(path.extname(filePaths[idx]), '')

			// build interface template items
			introspection.interfaces.forEach(i => {
				interfaces.push({
					interfaceName: i.interfaceName,
					relativeFilePath: `#spruce/..${filePath}`
				})
			})

			// build class template items
			introspection.classes.forEach(i => {
				if (i.isAbstract) {
					abstractClass = {
						className: i.className,
						relativeFilePath: `#spruce/..${filePath}`,
						constructorOptionsInterfaceName: i.constructorOptionsInterfaceName
					}
				} else {
					classes.push({
						constructorOptionsInterfaceName: i.constructorOptionsInterfaceName,
						// AutoloaderUtility -> Autoloader since namePascal wll be Utility
						className: i.className,
						nameCamel: names.toCamel(i.className).replace(namePascal, ''),
						namePascal: names.toPascal(
							names.toCamel(i.className).replace(namePascal, '')
						),
						relativeFilePath: `#spruce/..${filePath}`
					})
				}
			})
		})

		if (!abstractClass) {
			throw new SpruceError({
				code: ErrorCode.NotImplemented,
				friendlyMessage: `Autoloader classes in ${directory} need to inherit and abstract class that lives in the same directory. If you deleted a directory, try running \`spruce autoloader:sync\``
			})
		}

		const constructorOptionInterfaces: IAutoLoaderImportTemplateItem[] = []

		classes.forEach(item => {
			if (
				item.constructorOptionsInterfaceName &&
				!constructorOptionInterfaces.find(
					i => i.name === item.constructorOptionsInterfaceName
				)
			) {
				const path = interfaces.find(
					i => i.interfaceName === item.constructorOptionsInterfaceName
				)
				if (path) {
					constructorOptionInterfaces.push({
						name: item.constructorOptionsInterfaceName,
						filePath: path.relativeFilePath
					})
				}
			}
		})

		const templateItem = {
			abstractClassName: abstractClass.className,
			abstractClassRelativePath: abstractClass.relativeFilePath,
			abstractClassConstructorOptionsInterfaceName:
				abstractClass.constructorOptionsInterfaceName,
			interfaces,
			classes,
			namePascalPlural,
			namePascal,
			nameCamel,
			nameCamelPlural,
			constructorOptionInterfaces
		}

		this.cache[cacheKey] = templateItem

		return templateItem
	}
}
