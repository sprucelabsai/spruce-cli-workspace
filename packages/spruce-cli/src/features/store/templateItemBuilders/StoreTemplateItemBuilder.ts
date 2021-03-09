import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { StoreTemplateItem } from '@sprucelabs/spruce-templates'
import { LoadedStore } from '../stores/StoreStore'

export default class StoreTemplateItemBuilder {
	public buildTemplateItems(
		stores: LoadedStore[],
		destination: string
	): StoreTemplateItem[] {
		const items: StoreTemplateItem[] = []

		for (const store of stores) {
			const ext = pathUtil.extname(store.path)
			const relativePath = pathUtil
				.relative(destination, store.path)
				.replace(ext, '')
			items.push({
				namePascal: store.className,
				nameCamel: namesUtil.toCamel(store.className),
				path: relativePath,
			})
		}

		return items
	}
}
