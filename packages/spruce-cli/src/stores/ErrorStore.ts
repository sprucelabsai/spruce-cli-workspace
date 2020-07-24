import pathUtil from 'path'
import Schema from '@sprucelabs/schema'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import ErrorCode from '#spruce/errors/errorCode'
import { LOCAL_NAMESPACE } from '../constants'
import SpruceError from '../errors/SpruceError'
import { Service } from '../factories/ServiceFactory'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'
import AbstractStore from './AbstractStore'

interface IFetchErrorTemplateItemsResponse {
	items: IErrorTemplateItem[]
	errors: SpruceError[]
}

export default class ErrorStore extends AbstractStore {
	public async fetchErrorTemplateItems(
		lookupDir: string
	): Promise<IFetchErrorTemplateItemsResponse> {
		const resolvedLookupDir = diskUtil.resolvePath(this.cwd, lookupDir)

		if (!diskUtil.doesDirExist(resolvedLookupDir)) {
			throw new SpruceError({
				code: ErrorCode.DirectoryNotFound,
				directory: resolvedLookupDir,
			})
		}

		const results: IFetchErrorTemplateItemsResponse = {
			items: [],
			errors: [],
		}

		const matches = await globby(
			pathUtil.join(resolvedLookupDir, '/**/*.builder.[t|j]s')
		)
		const schemaService = this.Service(Service.Schema)

		await Promise.all(
			matches.map(async (file) => {
				try {
					const definition = await schemaService.importDefinition(file)

					Schema.validateDefinition(definition)

					const templateItem: IErrorTemplateItem = {
						definition,
						id: definition.id,
						namespace: LOCAL_NAMESPACE,
						nameCamel: namesUtil.toCamel(definition.id),
						nameReadable: definition.name,
						namePascal: namesUtil.toPascal(definition.id),
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
