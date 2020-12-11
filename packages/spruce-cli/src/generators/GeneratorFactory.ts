import { Templates } from '@sprucelabs/spruce-templates'
import ErrorGenerator from '../features/error/generators/ErrorGenerator'
import EventGenerator from '../features/event/generators/EventGenerator'
import NodeGenerator from '../features/node/generators/NodeGenerator'
import SchemaGenerator from '../features/schema/generators/SchemaGenerator'
import SkillGenerator from '../features/skill/generators/SkillGenerator'
import TestGenerator from '../features/test/generators/TestGenerator'
import { GraphicsInterface } from '../types/cli.types'
import { GeneratorOptions } from './AbstractGenerator'

const classMap = {
	error: ErrorGenerator,
	event: EventGenerator,
	schema: SchemaGenerator,
	skill: SkillGenerator,
	test: TestGenerator,
	node: NodeGenerator,
}

export interface GeneratorMap {
	error: ErrorGenerator
	event: EventGenerator
	schema: SchemaGenerator
	skill: SkillGenerator
	test: TestGenerator
	node: NodeGenerator
}
export type GeneratorCode = keyof GeneratorMap

export default class GeneratorFactory {
	private templates: Templates
	private term: GraphicsInterface

	public constructor(templates: Templates, term: GraphicsInterface) {
		this.templates = templates
		this.term = term
	}

	public Generator<C extends GeneratorCode>(
		code: C,
		options?: Partial<GeneratorOptions>
	): GeneratorMap[C] {
		const Class = classMap[code]
		return new Class({
			templates: this.templates,
			term: this.term,
			...(options || {}),
		}) as GeneratorMap[C]
	}
}
