import { Templates } from '@sprucelabs/spruce-templates'
import ErrorWriter from '../features/error/writers/ErrorWriter'
import EventWriter from '../features/event/writers/EventWriter'
import NodeWriter from '../features/node/writers/NodeWriter'
import SchemaWriter from '../features/schema/writers/SchemaWriter'
import SkillGenerator from '../features/skill/writers/SkillWriter'
import TestGenerator from '../features/test/writers/TestWriter'
import VsCodeWriter from '../features/vscode/writers/VsCodeWriter'
import LintService from '../services/LintService'
import { FileDescription } from '../types/cli.types'
import { GraphicsInterface } from '../types/cli.types'
import { WriterOptions } from './AbstractWriter'

const classMap = {
	error: ErrorWriter,
	event: EventWriter,
	schema: SchemaWriter,
	skill: SkillGenerator,
	test: TestGenerator,
	node: NodeWriter,
	vscode: VsCodeWriter,
}

export interface WriterMap {
	error: ErrorWriter
	event: EventWriter
	schema: SchemaWriter
	skill: SkillGenerator
	test: TestGenerator
	node: NodeWriter
	vscode: VsCodeWriter
}
export type WriterCode = keyof WriterMap

export default class WriterFactory {
	private templates: Templates
	private term: GraphicsInterface
	private linter?: LintService

	public constructor(
		templates: Templates,
		term: GraphicsInterface,
		linter?: LintService
	) {
		this.templates = templates
		this.term = term
		this.linter = linter
	}

	public Writer<C extends WriterCode>(
		code: C,
		options: Partial<WriterOptions> & { fileDescriptions: FileDescription[] }
	): WriterMap[C] {
		const Class = classMap[code]
		return new Class({
			templates: this.templates,
			term: this.term,
			linter: this.linter,
			...(options || {}),
		}) as WriterMap[C]
	}
}
