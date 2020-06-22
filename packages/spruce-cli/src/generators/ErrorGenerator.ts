import {
	IDefinitionBuilderTemplateItem,
	IErrorTemplateItem
} from '@sprucelabs/spruce-templates'
import log from '../singletons/log'
import { ICreatedFile } from '../types/cli.types'
import diskUtil from '../utilities/disk.utility'
import AbstractGenerator from './AbstractGenerator'

interface IErrorClassFiles {
	errorClass?: ICreatedFile
}

export default class ErrorGenerator extends AbstractGenerator {
	public async generateOrAppendErrorsToClass(
		destinationFile: string,
		errors: IErrorTemplateItem[]
	): Promise<{
		generatedFiles: IErrorClassFiles
		updatedFiles: IErrorClassFiles
	}> {
		const generatedFiles: IErrorClassFiles = {}
		const updatedFiles: IErrorClassFiles = {}

		if (errors.length === 0) {
			// todo move to proper error
			throw new Error('Need at least one error')
		}

		if (!diskUtil.doesFileExist(destinationFile)) {
			const errorContents = this.templates.error({ errors })
			await diskUtil.writeFile(destinationFile, errorContents)

			generatedFiles.errorClass = {
				name: 'Error subclass',
				path: destinationFile,
				description:
					'A new subclass of SpruceBaseError where you can control your error messaging.'
			}
		} else {
			const errorBlock = this.templates.error({
				errors,
				renderClassDefinition: false
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

				await diskUtil.writeFile(destinationFile, newErrorContents)

				updatedFiles.errorClass = {
					name: 'Error subclass',
					path: destinationFile,
					description:
						errors.length > 1
							? `${errors.length} blocks of code were in to handle the new types of errors`
							: 'A new block of code was added to handle the new error type'
				}
			} else {
				// Could not write to file, output snippet suggestion
				log.warn('Failed to add to Error.ts, here is the block to drop in')
			}
		}

		return {
			generatedFiles,
			updatedFiles
		}
	}

	public async generateBuilder(
		destinationFile: string,
		options: IDefinitionBuilderTemplateItem
	): Promise<{
		generatedFiles: {
			errorBuilder: ICreatedFile
		}
	}> {
		await diskUtil.writeFile(
			destinationFile,
			this.templates.definitionBuilder(options)
		)

		return {
			generatedFiles: {
				errorBuilder: {
					name: 'Error builder',
					path: destinationFile,
					description:
						'Holds the builder for this error. Used to generate type files.'
				}
			}
		}
	}
	public async generateErrorCodeType(
		destinationFile: string,
		errorTemplateItems: IErrorTemplateItem[]
	): Promise<{
		generatedFiles: {
			codesEnum: ICreatedFile
		}
	}> {
		// Find all definition files in the lookup dir

		const contents = this.templates.errorCode({ codes: errorTemplateItems })
		diskUtil.writeFile(destinationFile, contents)

		return {
			generatedFiles: {
				codesEnum: {
					name: 'Error code enum',
					path: destinationFile,
					description:
						'The enum that holds all error types for reference, like ErrorCode.FileNotFound.'
				}
			}
		}
	}

	public async generateOptionsTypesFile(
		destinationFile: string,
		errorTemplateItems: IErrorTemplateItem[]
	): Promise<{
		generatedFiles: {
			optionsTypes: ICreatedFile
		}
	}> {
		const contents = this.templates.errorOptionsTypes({
			options: errorTemplateItems
		})
		diskUtil.writeFile(destinationFile, contents)

		return {
			generatedFiles: {
				optionsTypes: {
					name: 'Error options',
					path: destinationFile,
					description:
						'A union of all error options for your skill. Used as the first parameter to the SpruceError constructor.'
				}
			}
		}
	}
}
