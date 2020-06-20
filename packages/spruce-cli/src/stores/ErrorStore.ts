/* eslint-disable no-unreachable */
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'

export default class ErrorStore {
	public async fetchErrorTemplateItems(
		lookupDir: string
	): Promise<IErrorTemplateItem[]> {
		throw new Error('FINISH')
		console.log(lookupDir)
		return []
	}
}
