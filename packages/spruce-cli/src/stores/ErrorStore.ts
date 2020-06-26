import pathUtil from 'path'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import globby from 'globby'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import schemaUtil from '../services/SchemaService'
import diskUtil from '../utilities/disk.utility'
import namesUtil from '../utilities/names.utility'

interface IFetchErrorTemplateItemsResponse {
	items: IErrorTemplateItem[]
	errors: SpruceError[]
}

export default class ErrorStore {
	public cwd: string
	public constructor(cwd: string) {
		this.cwd = cwd
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

		await Promise.all(
			matches.map(async file => {
				try {
					const definition = await schemaUtil.importDefinition(this.cwd, file)
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
