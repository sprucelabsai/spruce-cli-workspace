import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import SpruceError from '../../../errors/SpruceError'
import AbstractStore from '../../../stores/AbstractStore'
import introspectionUtil from '../../../utilities/introspection.utility'

export interface LoadedStore {
	className: string
	path: string
}

export default class StoreStore extends AbstractStore {
	public name = 'store'

	public async fetchStores() {
		const search = diskUtil.resolvePath(this.cwd, 'src', 'stores', '*.store.ts')
		const matches = await globby(search)

		const results = introspectionUtil.introspect(matches)

		const stores: LoadedStore[] = []

		for (let i = 0; i < results.length; i++) {
			const introspect = results[i]
			const className = introspect.classes[0]?.className
			if (!className) {
				throw new SpruceError({ code: 'FAILED_TO_IMPORT', file: matches[i] })
			}

			stores.push({ className, path: matches[i] })
		}

		return stores
	}
}
