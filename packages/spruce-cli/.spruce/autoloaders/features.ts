/* eslint-disable spruce/prefer-pascal-case-enums */
// Import base class
import AbstractFeature from '../../src/features/AbstractFeature'

// Import each matching class that will be autoloaded
import CircleCI from '../../src/features/CircleCIFeature'
import Schema from '../../src/features/SchemaFeature'
import Skill from '../../src/features/SkillFeature'
import Test from '../../src/features/TestFeature'
import VSCode from '../../src/features/VsCodeFeature'

// Import necessary interface(s)
import { IFeatureOptions } from '../../src/features/AbstractFeature'

export interface IFeatures {
	[feature: string]: CircleCI | Schema | Skill | Test | VSCode
	circleCi: CircleCI
	schema: Schema
	skill: Skill
	test: Test
	vsCode: VSCode
}

export enum Feature {
	CircleCI = 'circleCi',
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
	VSCode = 'vsCode'
}

export default async function autoloader(options: {
	constructorOptions: IFeatureOptions
	after?: (instance: AbstractFeature) => Promise<void>
}): Promise<IFeatures> {
	const { constructorOptions, after } = options

	const circleCi = new CircleCI(constructorOptions)
	if (after) {
		await after(circleCi)
	}
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
	const vsCode = new VSCode(constructorOptions)
	if (after) {
		await after(vsCode)
	}

	const siblings: IFeatures = {
		circleCi,
		schema,
		skill,
		test,
		vsCode
	}

	// @ts-ignore method is optional
	if (typeof circleCi.afterAutoload === 'function') {
		// @ts-ignore method is optional
		circleCi.afterAutoload(siblings)
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
	// @ts-ignore method is optional
	if (typeof vsCode.afterAutoload === 'function') {
		// @ts-ignore method is optional
		vsCode.afterAutoload(siblings)
	}

	return siblings
}
