import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { IErrorTemplateItem } from '@sprucelabs/spruce-templates'
import { GeneratedFile } from '../types/cli.types'
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
			const errorContents = this.templates.error({
				errors: errors.filter((error) => !error.isNested),
			})
			results = await this.writeFileIfChangedMixinResults(
				destinationFile,
				errorContents,
				'A new subclass of SpruceBaseError where you can control your error messaging.',
				results
			)
		} else {
			const updates = await this.dropInNewErrorCases(errors, destinationFile)
			if (updates.length > 0) {
				results.push({
					...updates[0],
					description: `${updates.length} new error cases were dropped in.`,
				})
			}
		}

		return results
	}

	private async dropInNewErrorCases(
		errors: IErrorTemplateItem[],
		destinationFile: string
	) {
		let results: GeneratedFile[] = []

		for (const error of errors) {
			if (!error.isNested) {
				const dropInResults = await this.dropInErrorCaseIfMissing(
					error,
					destinationFile
				)
				results.push(...dropInResults)
			}
		}

		return results
	}

	private async dropInErrorCaseIfMissing(
		error: IErrorTemplateItem,
		destinationFile: string
	) {
		let results: GeneratedFile[] = []
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

			results = await this.writeFileIfChangedMixinResults(
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
			'A union of all possible error options for your skill. Used as the type for first parameter to the SpruceError constructor.'
		)
	}
}
