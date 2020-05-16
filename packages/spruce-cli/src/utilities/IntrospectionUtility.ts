import {
	IAutoLoaderInterfaceTemplateItem,
	IAutoLoaderClassTemplateItem,
	IAutoLoaderTemplateItem
} from '@sprucelabs/spruce-templates/src/types/template.types'
import globby from 'globby'
import _ from 'lodash'
import * as tsutils from 'tsutils'
import * as ts from 'typescript'
import { ErrorCode } from '#spruce/errors/codes.types'
import SpruceError from '../errors/SpruceError'
import log from '../lib/log'
import { isReservedWord } from '../lib/reservedWords'
import AbstractUtility from './AbstractUtility'

interface IDocEntry {
	name?: string
	fileName?: string
	documentation?: string
	type?: string
	constructors?: IDocEntry[]
	parameters?: IDocEntry[]
	returnType?: string
}

interface IClassTemplateItem extends IAutoLoaderClassTemplateItem {
	parentClassName: string
	parentClassPath: string
}

interface IIntrospectionParseResult extends IAutoLoaderTemplateItem {
	mismatchClasses: IClassTemplateItem[]
}

export default class IntrospectionUtility extends AbstractUtility {
	/** Parses a group of files that follow the typical pattern of extending an abstract class */
	public async buildTemplateItems(options: {
		/** The directory i'll look in to pull autoloaded classes */
		directory: string
		/** An optional pattern i'll match against when loading files */
		pattern?: string
		/** The */
		suffix: string
	}): Promise<IIntrospectionParseResult> {
		const { pattern, directory, suffix } = options
		const globbyPattern = `${directory}/${pattern}`
		const filePaths = await globby(globbyPattern)
		const program = ts.createProgram(filePaths, {})
		const checker = program.getTypeChecker()

		const result: Partial<IIntrospectionParseResult> = {
			classes: [],
			mismatchClasses: [],
			abstractClasses: [],
			interfaces: []
		}

		// Loop through the root AST nodes of the file
		// for (const sourceFile of program.getSourceFiles()) {
		for (let i = 0; i < filePaths.length; i += 1) {
			const filePath = filePaths[i]
			const sourceFile = program.getSourceFile(filePath)
			const relativeFilePath = filePath
				.replace(this.cwd, '../..')
				.replace(/\.ts$/, '')

			if (sourceFile && _.includes(filePaths, sourceFile.fileName)) {
				ts.forEachChild(sourceFile, node => {
					if (ts.isClassDeclaration(node) && node.name) {
						const symbol = checker.getSymbolAtLocation(node.name)

						checker.getSignaturesOfType
						if (symbol) {
							const details = this.serializeSymbol({ checker, symbol })
							// Get the construct signatures
							const constructorType = checker.getTypeOfSymbolAtLocation(
								symbol,
								symbol.valueDeclaration
							)

							let parentClassSymbol: ts.Symbol | undefined
							if (node.heritageClauses && node.heritageClauses[0]) {
								parentClassSymbol = checker
									.getTypeAtLocation(node.heritageClauses[0].types[0])
									.getSymbol()
							}

							const parentClassName =
								// @ts-ignore
								parentClassSymbol?.valueDeclaration.name.text
							// @ts-ignore
							const parentClassPath = parentClassSymbol?.parent.getName()

							const isAbstractClass = tsutils.isModifierFlagSet(
								node,
								ts.ModifierFlags.Abstract
							)
							details.constructors = constructorType
								.getConstructSignatures()
								.map(s => this.serializeSignature({ signature: s, checker }))

							const isIncludedClassRegex = new RegExp(`${suffix}$`)
							const isIncludedClass = isIncludedClassRegex.test(node.name.text)
							const className = node.name.text.replace(suffix, '')

							const classInfo = {
								parentClassName,
								parentClassPath,
								className,
								nameCamel: this.utilities.names.toCamel(className),
								constructorOptionsInterfaceName:
									details.constructors &&
									details.constructors[0].parameters &&
									details.constructors[0].parameters[0] &&
									details.constructors[0].parameters[0].type,
								relativeFilePath
							}

							if (!isAbstractClass && isReservedWord(classInfo.className)) {
								throw new SpruceError({
									code: ErrorCode.ReservedKeyword,
									keyword: classInfo.className,
									friendlyMessage: `Your class can not use the javascript keyword: "${classInfo.className}" as your class name. Rename your class at ${classInfo.relativeFilePath} and re-run this command.`
								})
							}

							if (isAbstractClass) {
								result.abstractClasses.push(classInfo)
								log.trace(`Abstract Class loaded: ${classInfo.className}`)
							} else if (isIncludedClass) {
								result.classes.push(classInfo)
								log.trace(`Class loaded: ${classInfo.className}`)
							} else {
								result.mismatchClasses.push(classInfo)
								log.trace(
									`Class not included because it did not match suffix: ${classInfo.className}`
								)
							}
						}
					} else if (ts.isInterfaceDeclaration(node)) {
						result.interfaces.push({
							interfaceName: node.name.text,
							relativeFilePath
						})
					}
				})
			}
		}

		if (result.classes.length === 0) {
			throw new SpruceError({
				code: ErrorCode.CreateAutoloaderFailed,
				directory,
				globbyPattern,
				filePaths,
				suffix,
				friendlyMessage:
					'No classes were found. Check the suffix and/or pattern'
			})
		}

		// Find what interface(s) we need to import
		const abstractClassName =
			result.classes &&
			result.classes[0] &&
			typeof result.classes[0].parentClassName === 'string'
				? result.classes[0].parentClassName
				: null

		if (!abstractClassName) {
			throw new SpruceError({
				code: ErrorCode.CreateAutoloaderFailed,
				directory,
				globbyPattern,
				filePaths,
				suffix,
				friendlyMessage:
					'An abstract class that your classes extend could not be found.'
			})
		}

		const abstractClassRelativePath =
			result.classes &&
			result.classes[0] &&
			typeof result.classes[0].parentClassPath === 'string'
				? result.classes[0].parentClassPath
						.replace(/'/g, '')
						.replace(/"/g, '')
						.replace(this.cwd, '../..')
						.replace(/\.ts$/, '')
				: null

		const interfacesHash: Record<string, string> = {}
		result.classes.forEach(c => {
			if (c.constructorOptionsInterfaceName) {
				interfacesHash[c.constructorOptionsInterfaceName] =
					c.constructorOptionsInterfaceName
			}
		})

		const interfaceNamesToImport = Object.values(interfacesHash)

		result.interfaces = result.interfaces.filter(i => {
			return _.includes(interfaceNamesToImport, i.interfaceName)
		})

		return {
			filePaths,
			abstractClassName,
			abstractClassRelativePath,
			...result
		}
	}

	private serializeSignature(options: {
		checker: ts.TypeChecker
		signature: ts.Signature
	}) {
		const { checker, signature } = options
		return {
			parameters: signature.parameters.map(p =>
				this.serializeSymbol({ symbol: p, checker })
			),
			returnType: checker.typeToString(signature.getReturnType()),
			documentation: ts.displayPartsToString(
				signature.getDocumentationComment(checker)
			)
		}
	}

	private serializeSymbol(options: {
		checker: ts.TypeChecker
		symbol: ts.Symbol
	}): IDocEntry {
		const { checker, symbol } = options
		return {
			name: symbol.getName(),
			documentation: ts.displayPartsToString(
				symbol.getDocumentationComment(checker)
			),
			type: checker.typeToString(
				checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration)
			)
		}
	}
}
