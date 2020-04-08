/* eslint-disable @typescript-eslint/no-var-requires */
import { Command } from 'commander'
import AbstractCommand from '../AbstractCommand'
import log from '../../lib/log'
import * as ts from 'typescript'
import _ from 'lodash'
// TODO will be used
// import path from 'path'
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
		log.debug('LOADER', { dir })

		// Glob all the files in the folder
		const fullDirectory = this.resolvePath(dir)
		log.debug({ fullDirectory })

		// TODO
		// const autoloadedFiles: {
		// 	fileName: string
		// 	filePath: string
		// }[] = []

		const pattern = cmd.pattern
			? (cmd.pattern as string).replace("'", '').replace('"', '')
			: '**/*.ts'

		const suffix = cmd.suffix ? (cmd.suffix as string) : ''

		const globbyPattern = `${fullDirectory}/${pattern}`

		const filePaths = globby.sync(globbyPattern)

		log.debug({ globbyPattern, filePaths, fullDirectory })
		await this.compileFiles({ filePaths, fullDirectory, suffix })

		// TODO: do we even need to traverse?
		// for (let i = 0; i < filePaths.length; i += 1) {
		// 	const filePath = filePaths[i]
		// 	try {
		// 		let fileName = filePath.replace(/^(.*[\\/])/, '')
		// 		// FileName = fileName.replace('Service', '')
		// 		fileName = fileName.replace(/(\.js|\.ts)/, '')
		// 		fileName = `${fileName.charAt(0).toLowerCase()}${fileName.slice(1)}`

		// 		await this.compileFile(filePath)

		// 		// Const thing = await import(filePath)
		// 		// const thingRequire = require(filePath)

		// 		// autoloadedFiles.push({
		// 		// 	fileName,
		// 		// 	filePath
		// 		// })

		// 		// Log.debug({
		// 		// 	thing,
		// 		// 	thingRequire,
		// 		// 	default: thing.default,
		// 		// 	type: typeof thing
		// 		// 	// NewThing: new thing()
		// 		// })

		// 		log.debug(`Autoloader loaded file: ${filePath}`)
		// 	} catch (e) {
		// 		log.debug(`Autoloader could not load file: ${filePath}`, e)
		// 	}
		// }
	}

	private async compileFiles(options: {
		filePaths: string[]
		fullDirectory: string
		suffix: string
	}) {
		const { filePaths, fullDirectory, suffix } = options
		const program = ts.createProgram(filePaths, {})
		const checker = program.getTypeChecker()

		const info: {
			classes: {
				constructorOptionsInterfaceName?: string
				className: string
				relativeFilePath: string
			}[]
			interfaces: {
				interfaceName: string
				relativeFilePath: string
			}[]
		} = {
			classes: [],
			interfaces: []
		}

		// Loop through the root AST nodes of the file
		// for (const sourceFile of program.getSourceFiles()) {
		for (let i = 0; i < filePaths.length; i += 1) {
			const filePath = filePaths[i]
			const sourceFile = program.getSourceFile(filePath)
			const relativeFilePath = filePath
				.replace(fullDirectory, '.')
				.replace(/\.ts$/, '')

			if (sourceFile && _.includes(filePaths, sourceFile.fileName)) {
				ts.forEachChild(sourceFile, node => {
					if (ts.isClassDeclaration(node) && node.name) {
						const symbol = checker.getSymbolAtLocation(node.name)
						checker.getSignaturesOfType
						if (symbol) {
							console.log({ symbol })
							const details = this.serializeSymbol({ checker, symbol })
							// Get the construct signatures
							const constructorType = checker.getTypeOfSymbolAtLocation(
								symbol,
								symbol.valueDeclaration
							)

							const isAbstractClass = tsutils.isModifierFlagSet(
								node,
								ts.ModifierFlags.Abstract
							)

							if (!isAbstractClass) {
								details.constructors = constructorType
									.getConstructSignatures()
									.map(s => this.serializeSignature({ signature: s, checker }))

								info.classes.push({
									className: node.name.text.replace(suffix, ''),
									constructorOptionsInterfaceName:
										details.constructors &&
										details.constructors[0].parameters &&
										details.constructors[0].parameters[0] &&
										details.constructors[0].parameters[0].type,
									relativeFilePath
								})
							}

							// TODO
							// console.log({ sourceFile, details })
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

		console.log({ info })

		// Find what interface(s) we need to import
		const interfacesHash: Record<string, string> = {}
		info.classes.forEach(c => {
			if (c.constructorOptionsInterfaceName) {
				interfacesHash[c.constructorOptionsInterfaceName] =
					c.constructorOptionsInterfaceName
			}
		})

		const interfaceNamesToImport = Object.values(interfacesHash)

		const interfaces = info.interfaces.filter(i => {
			return _.includes(interfaceNamesToImport, i.interfaceName)
		})

		// Now generate the autoloader file
		const autoloaderFileContents = this.templates.autoloader({
			classes: info.classes,
			interfaces
		})

		console.log(autoloaderFileContents)
	}

	// TODO
	// private async compileFile(filePath: string) {
	// 	const program = ts.createProgram([filePath], {})
	// 	const sourceFile = program.getSourceFile(filePath)
	// 	// To give constructive error messages, keep track of found and un-found identifiers
	// 	// const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
	// 	// const unfoundNodes: any = []
	// 	// const foundNodes: any = []
	// 	// const identifiers: any = []

	// 	// Loop through the root AST nodes of the file
	// 	// @ts-ignore
	// 	ts.forEachChild(sourceFile, node => {
	// 		console.log({ node })
	// 		// If (ts.isClassDeclaration(node)) {
	// 		// 	console.log({ node })
	// 		// 	// Console.log({
	// 		// 	// 	name: node.name,
	// 		// 	// 	body: node.body
	// 		// 	// 	// SourceFile,
	// 		// 	// 	// node
	// 		// 	// })
	// 		// } else if (ts.isConstructSignatureDeclaration(node)) {
	// 		// 	console.log({ node })
	// 		// }

	// 		// Let name = ''

	// 		// This is an incomplete set of AST nodes which could have a top level identifier
	// 		// it's left to you to expand this list, which you can do by using
	// 		// https://ts-ast-viewer.com/ to see the AST of a file then use the same patterns
	// 		// as below
	// 		// if (ts.isFunctionDeclaration(node)) {
	// 		// 	if (node.name && node.name.text) {
	// 		// 		name = node.name.text
	// 		// 	}
	// 		// 	// Hide the method body when printing
	// 		// 	node.body = undefined
	// 		// } else if (ts.isVariableStatement(node)) {
	// 		// 	name = node.declarationList.declarations[0].name.getText(sourceFile)
	// 		// } else if (ts.isInterfaceDeclaration(node)) {
	// 		// 	name = node.name.text
	// 		// }

	// 		// const container = identifiers.includes(name) ? foundNodes : unfoundNodes
	// 		// container.push([name, node])
	// 	})

	// 	// Either print the found nodes, or offer a list of what identifiers were found
	// 	// if (!foundNodes.length) {
	// 	// 	console.log(
	// 	// 		`Could not find any of ${identifiers.join(
	// 	// 			', '
	// 	// 		)} in ${filePath}, found: ${unfoundNodes
	// 	// 			.filter((f: any) => f[0])
	// 	// 			.map((f: any) => f[0])
	// 	// 			.join(', ')}.`
	// 	// 	)
	// 	// 	process.exitCode = 1
	// 	// } else {
	// 	// 	foundNodes.map(f => {
	// 	// 		const [name, node] = f
	// 	// 		console.log('### ' + name + '\n')
	// 	// 		console.log(
	// 	// 			printer.printNode(ts.EmitHint.Unspecified, node, sourceFile)
	// 	// 		) + '\n'
	// 	// 	})
	// 	// }
	// }

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
