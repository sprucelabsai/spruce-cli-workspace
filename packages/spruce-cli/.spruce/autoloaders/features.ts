// Import base class
import AbstractFeature from '../../src/features/AbstractFeature'

// Import each matching class that will be autoloaded
import Schema from '../../src/features/SchemaFeature'
import Skill from '../../src/features/SkillFeature'
import Test from '../../src/features/TestFeature'

// Import necessary interface(s)
import { IFeatureOptions } from '../../src/features/AbstractFeature'

export interface IFeatures {
	schema: Schema
	skill: Skill
	test: Test
}

export enum Feature {
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
}

export default async function autoloader(options: {
	constructorOptions: IFeatureOptions
	after?: (instance: AbstractFeature) => Promise<void>
}): Promise<IFeatures> {
	const { constructorOptions, after } = options

	const schema = new Schema(constructorOptions)
	if (after) {
		await after(schema)
	}
	const skill = new Skill(constructorOptions)
	if (after) {
		await after(skill)
	}
	const test = new Test(constructorOptions)
	if (after) {
		await after(test)
	}

	const siblings: IFeatures = {
		schema,
		skill,
		test
	}

	// @ts-ignore method is optional
	if (typeof schema.afterAutoload === 'function') {
		// @ts-ignore method is optional
		schema.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof skill.afterAutoload === 'function') {
		// @ts-ignore method is optional
		skill.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof test.afterAutoload === 'function') {
		// @ts-ignore method is optional
		test.afterAutoload(siblings)
	}

	return siblings
}
