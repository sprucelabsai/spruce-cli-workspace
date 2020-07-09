import { Templates } from '@sprucelabs/spruce-templates'
import { IFeatureAction } from '../features/feature.types'
import diskUtil from '../utilities/disk.utility'
import AbstractFeatureAction from './AbstractFeatureAction'

export default class FeatureActionFactory {
	private actionsDir: string
	private templates: Templates
	private cwd: string

	public constructor(cwd: string, actionsDir: string, templates: Templates) {
		this.cwd = cwd
		this.actionsDir = actionsDir
		this.templates = templates
	}

	public Action(name: string): IFeatureAction {
		const classPath = diskUtil.resolvePath(this.actionsDir, name)

		const Class: new (
			cwd: string,
			templates: Templates
		) => AbstractFeatureAction = require(classPath).default

		const action = new Class(this.cwd, this.templates)

		return action
	}
}
