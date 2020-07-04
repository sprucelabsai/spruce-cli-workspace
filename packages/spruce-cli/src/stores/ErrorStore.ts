import pathUtil from 'path'
import Schema from '@sprucelabs/schema'
import { ISchemaDefinition } from '@sprucelabs/schema/build/schema.types'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import ServiceFactory, { Service } from '../factories/ServiceFactory'
import ImportService from '../services/ImportService'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'

interface IFetchErrorTemplateItemsResponse {
	items: IErrorTemplateItem[]
	errors: SpruceError[]
}

export default class ErrorStore {
	public cwd: string

	private serviceFactory: ServiceFactory

	private ImportService = (cwd?: string): ImportService => {
		return this.serviceFactory.Service(cwd ?? this.cwd, Service.Import)
	}

	public constructor(cwd: string, serviceFactory: ServiceFactory) {
		this.cwd = cwd
		this.serviceFactory = serviceFactory
	}

	public async fetchErrorTemplateItems(
		lookupDir: string
	): Promise<IFetchErrorTemplateItemsResponse> {
		if (!diskUtil.doesDirExist(lookupDir)) {
			throw new SpruceError({
				code: ErrorCode.DirectoryNotFound,
				directory: lookupDir
			})
		}

		const results: IFetchErrorTemplateItemsResponse = {
			items: [],
			errors: []
		}

		const matches = await globby(pathUtil.join(lookupDir, '/**/*.builder.ts'))
		const importService = this.ImportService()

		await Promise.all(
			matches.map(async file => {
				try {
					const definition = await importService.importDefault<
						ISchemaDefinition
					>(file)

					Schema.validateDefinition(definition)

					const templateItem: IErrorTemplateItem = {
						definition,
						nameCamel: namesUtil.toCamel(definition.id),
						namePascal: namesUtil.toPascal(definition.id)
					}
					results.items.push(templateItem)
				} catch (err) {
					results.errors.push(err)
				}
			})
		)

		return results
	}
}
