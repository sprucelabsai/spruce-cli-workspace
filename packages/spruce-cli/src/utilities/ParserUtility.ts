import * as ts from 'typescript'
import _ from 'lodash'
import * as tsutils from 'tsutils'
import log from '../lib/log'
import globby from 'globby'
import { isReservedWord } from '../lib/reservedWords'
import SpruceError from '../errors/SpruceError'
import { ErrorCode } from '../../.spruce/errors/codes.types'
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

interface IClass {
	parentClassName: string
	parentClassPath: string
	constructorOptionsInterfaceName?: string
	className: string
	relativeFilePath: string
}

interface IIntermediateFileGroupInfo {
	classes: IClass[]
	mismatchClasses: IClass[]
	abstractClasses: IClass[]
	interfaces: {
		interfaceName: string
		relativeFilePath: string
	}[]
}

interface IFileGroupInfo extends IIntermediateFileGroupInfo {
	filePaths: string[]
	abstractClassName: string | null
	abstractClassRelativePath: string | null
}

export default class ParserUtility extends AbstractUtility {
	/** Parses a group of files that follow the typical pattern of extending an abstract class */
	public async parseFileGroup(options: {
		globbyPattern: string
		suffix: string
	}): Promise<IFileGroupInfo> {
		const { globbyPattern, suffix } = options
		const filePaths = globby.sync(globbyPattern)
		const program = ts.createProgram(filePaths, {})
		const checker = program.getTypeChecker()

		const info: IIntermediateFileGroupInfo = {
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

							const classInfo = {
								parentClassName,
								parentClassPath,
								className: node.name.text.replace(suffix, ''),
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
								info.abstractClasses.push(classInfo)
								log.trace(`Abstract Class loaded: ${classInfo.className}`)
							} else if (isIncludedClass) {
								info.classes.push(classInfo)
								log.trace(`Class loaded: ${classInfo.className}`)
							} else {
								info.mismatchClasses.push(classInfo)
								log.trace(
									`Class not included because it did not match suffix: ${classInfo.className}`
								)
							}
						}
					} else if (ts.isInterfaceDeclaration(node)) {
						info.interfaces.push({
							interfaceName: node.name.text,
							relativeFilePath
						})
					}
				})
			}
		}

		// Find what interface(s) we need to import
		const abstractClassName =
			info.classes &&
			info.classes[0] &&
			typeof info.classes[0].parentClassName === 'string'
				? info.classes[0].parentClassName
				: null
		const abstractClassRelativePath =
			info.classes &&
			info.classes[0] &&
			typeof info.classes[0].parentClassPath === 'string'
				? info.classes[0].parentClassPath
						.replace(/'/g, '')
						.replace(/"/g, '')
						.replace(this.cwd, '../..')
						.replace(/\.ts$/, '')
				: null

		const interfacesHash: Record<string, string> = {}
		info.classes.forEach(c => {
			if (c.constructorOptionsInterfaceName) {
				interfacesHash[c.constructorOptionsInterfaceName] =
					c.constructorOptionsInterfaceName
			}
		})

		const interfaceNamesToImport = Object.values(interfacesHash)

		info.interfaces = info.interfaces.filter(i => {
			return _.includes(interfaceNamesToImport, i.interfaceName)
		})

		return {
			filePaths,
			abstractClassName,
			abstractClassRelativePath,
			...info
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
