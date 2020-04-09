/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from 'commander'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'
import * as ts from 'typescript'
import _ from 'lodash'
// TODO will be used
import path from 'path'
import globby from 'globby'
import * as tsutils from 'tsutils'

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

interface IIntermediateAutoloadInfo {
	classes: IClass[]
	mismatchClasses: IClass[]
	abstractClasses: IClass[]
	interfaces: {
		interfaceName: string
		relativeFilePath: string
	}[]
}

interface IAutoloadInfo extends IIntermediateAutoloadInfo {
	abstractClassName: string
	abstractClassRelativePath: string
}

export default class AutoloaderCommand extends AbstractCommand {
	public attachCommands(program: Command): void {
		// TODO: add option to override globby
		// Or .autoloader
		program
			.command('autoloader [dir]')
			.description('Generate an autoloader for files in the directory')
			.option(
				'-p, --pattern <pattern>',
				'Only autoload files in this directory that match the globby pattern. Default: **/*.ts'
			)
			.option(
				'-s, --suffix <suffix>',
				'Only loads files that end with this suffix and strip it from the returned name. Not set by default.'
			)
			.action(this.generateAutoloader.bind(this))
	}

	private async generateAutoloader(dir: string, cmd: Command) {
		// Glob all the files in the folder
		const fullDirectory = this.resolvePath(dir)

		const pattern = cmd.pattern
			? (cmd.pattern as string).replace("'", '').replace('"', '')
			: '**/*.ts'

		const suffix = cmd.suffix ? (cmd.suffix as string) : ''

		const globbyPattern = `${fullDirectory}/${pattern}`

		const filePaths = globby.sync(globbyPattern)

		log.trace('Generating autoloader: ', {
			globbyPattern,
			filePaths,
			fullDirectory
		})
		// Parse all the files in the directory
		const info = await this.parseFiles({ filePaths, fullDirectory, suffix })
		const fileName = `${path.basename(fullDirectory)}`

		// Generate the autoloader file
		const autoloaderFileContents = this.templates.autoloader({
			abstractClassName: info.abstractClassName,
			abstractClassRelativePath: info.abstractClassRelativePath,
			classes: info.classes,
			interfaces: info.interfaces,
			fileName
		})

		// Write the file
		this.writeFile(`.spruce/autoloaders/${fileName}.ts`, autoloaderFileContents)

		this.info(
			`Autoloader created 🎉. Import it with:\nimport ${fileName} from '#spruce/autoloaders/${fileName}'`
		)
	}

	private async parseFiles(options: {
		filePaths: string[]
		fullDirectory: string
		suffix: string
	}): Promise<IAutoloadInfo> {
		const { filePaths, suffix } = options
		const program = ts.createProgram(filePaths, {})
		const checker = program.getTypeChecker()

		const info: IIntermediateAutoloadInfo = {
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
				: ''
		const abstractClassRelativePath =
			info.classes &&
			info.classes[0] &&
			typeof info.classes[0].parentClassPath === 'string'
				? info.classes[0].parentClassPath
						.replace(/'/g, '')
						.replace(/"/g, '')
						.replace(this.cwd, '../..')
						.replace(/\.ts$/, '')
				: ''

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
