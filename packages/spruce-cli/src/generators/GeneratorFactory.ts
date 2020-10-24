import { Templates } from '@sprucelabs/spruce-templates'
import { GraphicsInterface } from '../types/cli.types'
import { IGeneratorOptions } from './AbstractGenerator'
import ErrorGenerator from './ErrorGenerator'
import EventGenerator from './EventGenerator'
import SchemaGenerator from './SchemaGenerator'
import SkillGenerator from './SkillGenerator'
import TestGenerator from './TestGenerator'

const classMap = {
	error: ErrorGenerator,
	event: EventGenerator,
	schema: SchemaGenerator,
	skill: SkillGenerator,
	test: TestGenerator,
}

export interface GeneratorMap {
	error: ErrorGenerator
	event: EventGenerator
	schema: SchemaGenerator
	skill: SkillGenerator
	test: TestGenerator
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
		options?: Partial<IGeneratorOptions>
	): GeneratorMap[C] {
		const Class = classMap[code]
		return new Class({
			templates: this.templates,
			term: this.term,
			...(options || {}),
		}) as GeneratorMap[C]
	}
}
