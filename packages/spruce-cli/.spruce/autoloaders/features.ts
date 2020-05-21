/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
import { IFeatureOptions } from '#spruce/../src/features/AbstractFeature'
// Import each matching class that will be autoloaded
import CircleCIFeature from '#spruce/../src/features/CircleCIFeature'
import ErrorFeature from '#spruce/../src/features/ErrorFeature'
import MercuryFeature from '#spruce/../src/features/MercuryFeature'
import SchemaFeature from '#spruce/../src/features/SchemaFeature'
import SkillFeature from '#spruce/../src/features/SkillFeature'
import TestFeature from '#spruce/../src/features/TestFeature'
import VSCodeFeature from '#spruce/../src/features/VsCodeFeature'

export type Features =
	| CircleCIFeature
	| ErrorFeature
	| MercuryFeature
	| SchemaFeature
	| SkillFeature
	| TestFeature
	| VSCodeFeature

export interface IFeatures {
	circleCi: CircleCIFeature
	error: ErrorFeature
	mercury: MercuryFeature
	schema: SchemaFeature
	skill: SkillFeature
	test: TestFeature
	vsCode: VSCodeFeature
}

export enum Feature {
	CircleCi = 'circleCi',
	Error = 'error',
	Mercury = 'mercury',
	Schema = 'schema',
	Skill = 'skill',
	Test = 'test',
	VsCode = 'vsCode'
}

export default async function autoloader<K extends Feature[]>(options: {
	constructorOptions: IFeatureOptions
	after?: (instance: Features) => Promise<void>
	only?: K
}): Promise<K extends undefined ? IFeatures : Pick<IFeatures, K[number]>> {
	const { constructorOptions, after, only } = options
	const siblings: Partial<IFeatures> = {}

	if (!only || only.indexOf(Feature.CircleCi) > -1) {
		const circleCiFeature = new CircleCIFeature(constructorOptions)
		if (after) {
			await after(circleCiFeature)
		}
		siblings.circleCi = circleCiFeature
	}
	if (!only || only.indexOf(Feature.Error) > -1) {
		const errorFeature = new ErrorFeature(constructorOptions)
		if (after) {
			await after(errorFeature)
		}
		siblings.error = errorFeature
	}
	if (!only || only.indexOf(Feature.Mercury) > -1) {
		const mercuryFeature = new MercuryFeature(constructorOptions)
		if (after) {
			await after(mercuryFeature)
		}
		siblings.mercury = mercuryFeature
	}
	if (!only || only.indexOf(Feature.Schema) > -1) {
		const schemaFeature = new SchemaFeature(constructorOptions)
		if (after) {
			await after(schemaFeature)
		}
		siblings.schema = schemaFeature
	}
	if (!only || only.indexOf(Feature.Skill) > -1) {
		const skillFeature = new SkillFeature(constructorOptions)
		if (after) {
			await after(skillFeature)
		}
		siblings.skill = skillFeature
	}
	if (!only || only.indexOf(Feature.Test) > -1) {
		const testFeature = new TestFeature(constructorOptions)
		if (after) {
			await after(testFeature)
		}
		siblings.test = testFeature
	}
	if (!only || only.indexOf(Feature.VsCode) > -1) {
		const vsCodeFeature = new VSCodeFeature(constructorOptions)
		if (after) {
			await after(vsCodeFeature)
		}
		siblings.vsCode = vsCodeFeature
	}

	return siblings as K extends undefined
		? IFeatures
		: Pick<IFeatures, K[number]>
}
