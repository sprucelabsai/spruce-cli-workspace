/* eslint-disable no-unreachable */
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import ErrorCode from '#spruce/errors/errorCode'
import SpruceError from '../errors/SpruceError'
import diskUtil from '../utilities/disk.utility'

export default class ErrorStore {
	public async fetchErrorTemplateItems(
		lookupDir: string
	): Promise<IErrorTemplateItem[]> {
		if (!diskUtil.doesDirExist(lookupDir)) {
			throw new SpruceError({
				code: ErrorCode.DirectoryNotFound,
				directory: lookupDir
			})
		}
		return []
	}
}
