import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import { IGeneratedFile } from '../types/cli.types'
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
			const updates = this.dropInNewErrorCases(errors, destinationFile)
			if (updates.length > 0) {
				results.push({
					...updates[0],
					description: `${updates.length} new error cases were dropped in.`,
				})
			}
		}

		return results
	}

	private dropInNewErrorCases(
		errors: IErrorTemplateItem[],
		destinationFile: string
	) {
		let results: IGeneratedFile[] = []
		errors.forEach((error) => {
			results.push(...this.dropInErrorCaseIfMissing(error, destinationFile))
		})
		return results
	}

	private dropInErrorCaseIfMissing(
		error: IErrorTemplateItem,
		destinationFile: string
	) {
		let results: IGeneratedFile[] = []
		const errorBlock = this.templates.error({
			errors: [error],
			renderClassDefinition: false,
		})

		// Try and drop in the block right before "default:"
		const currentErrorContents = diskUtil.readFile(destinationFile)
		const blockMatches = currentErrorContents.search(/default:/g)
		if (
			blockMatches > -1 &&
			!this.doesErrorCaseExist(currentErrorContents, error)
		) {
			const newErrorContents =
				currentErrorContents.substring(0, blockMatches) +
				'\n' +
				errorBlock +
				'\n' +
				currentErrorContents.substring(blockMatches)

			results = this.writeFileIfChangedMixinResults(
				destinationFile,
				newErrorContents,
				`A new block was added to handle ${error.code}.`,
				results
			)
		}
		return results
	}

	private doesErrorCaseExist(
		currentContents: string,
		error: IErrorTemplateItem
	) {
		return currentContents.search(new RegExp(`case '${error.code}':`)) > -1
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
