import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import log from '../singletons/log'
import diskUtil from '../utilities/disk.utility'
import AbstractGenerator, { GenerationResults } from './AbstractGenerator'

export default class ErrorGenerator extends AbstractGenerator {
	public async generateOrAppendErrorsToClass(
		destinationDir: string,
		errors: IErrorTemplateItem[]
	): Promise<GenerationResults> {
		let results: GenerationResults = []

		if (errors.length === 0) {
			// todo move to proper error
			throw new Error('Need at least one error')
		}

		const destinationFile = diskUtil.resolvePath(
			destinationDir,
			`SpruceError.ts`
		)

		if (!diskUtil.doesFileExist(destinationFile)) {
			const errorContents = this.templates.error({ errors })
			results = this.writeFileIfChangedMixinResults(
				destinationFile,
				errorContents,
				'A new subclass of SpruceBaseError where you can control your error messaging.',
				results
			)
		} else {
			const errorBlock = this.templates.error({
				errors,
				renderClassDefinition: false,
			})

			// Try and drop in the block right before "default:"
			const currentErrorContents = diskUtil.readFile(destinationFile)
			const blockMatches = currentErrorContents.search(/default:/g)
			if (blockMatches > -1) {
				const newErrorContents =
					currentErrorContents.substring(0, blockMatches) +
					'\n' +
					errorBlock +
					'\n' +
					currentErrorContents.substring(blockMatches)

				results = this.writeFileIfChangedMixinResults(
					destinationFile,
					newErrorContents,
					errors.length > 1
						? `${errors.length} blocks of code were in to handle the new types of errors`
						: 'A new block of code was added to handle the new error type',
					results
				)
			} else {
				// Could not write to file, output snippet suggestion
				log.warn('Failed to add to Error.ts, here is the block to drop in')
			}
		}

		return results
	}

	public async generateOptionsTypesFile(
		destinationDir: string,
		errorTemplateItems: IErrorTemplateItem[]
	): Promise<GenerationResults> {
		const contents = this.templates.errorOptionsTypes({
			options: errorTemplateItems,
		})

		const destination = diskUtil.resolvePath(destinationDir, 'options.types.ts')

		return this.writeFileIfChangedMixinResults(
			destination,
			contents,
			'A union of all error options for your skill. Used as the first parameter to the SpruceError constructor.'
		)
	}
}
