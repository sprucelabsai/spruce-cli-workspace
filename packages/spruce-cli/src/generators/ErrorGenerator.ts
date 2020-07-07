import {
	IDefinitionBuilderTemplateItem,
	IErrorTemplateItem,
} from '@sprucelabs/spruce-templates'
import log from '../singletons/log'
import diskUtil from '../utilities/disk.utility'
import AbstractGenerator, { GenerationResults } from './AbstractGenerator'

export default class ErrorGenerator extends AbstractGenerator {
	public async generateOrAppendErrorsToClass(
		destinationFile: string,
		errors: IErrorTemplateItem[]
	): Promise<GenerationResults> {
		let results: GenerationResults = []

		if (errors.length === 0) {
			// todo move to proper error
			throw new Error('Need at least one error')
		}

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
			const blockMatches = currentErrorContents.search(/\t\t\tdefault:/g)
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

	public async generateBuilder(
		destinationFile: string,
		options: IDefinitionBuilderTemplateItem
	): Promise<GenerationResults> {
		return this.writeFileIfChangedMixinResults(
			destinationFile,
			this.templates.definitionBuilder(options),
			'Holds the builder for this error. Used to generate type files.'
		)
	}
	public async generateErrorCodeType(
		destinationFile: string,
		errorTemplateItems: IErrorTemplateItem[]
	): Promise<GenerationResults> {
		// Find all definition files in the lookup dir

		const contents = this.templates.errorCode({ codes: errorTemplateItems })

		return this.writeFileIfChangedMixinResults(
			destinationFile,
			contents,
			'The enum that holds all error types for reference, like ErrorCode.FileNotFound.'
		)
	}

	public async generateOptionsTypesFile(
		destinationFile: string,
		errorTemplateItems: IErrorTemplateItem[]
	): Promise<GenerationResults> {
		const contents = this.templates.errorOptionsTypes({
			options: errorTemplateItems,
		})

		return this.writeFileIfChangedMixinResults(
			destinationFile,
			contents,
			'A union of all error options for your skill. Used as the first parameter to the SpruceError constructor.'
		)
	}
}
