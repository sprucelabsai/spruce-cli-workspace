import { Templates } from '@sprucelabs/spruce-templates'

export interface IGeneratorOptions {
	templates: Templates
}

export default abstract class AbstractGenerator {
	protected templates: Templates

	public constructor(templates: Templates) {
		this.templates = templates
	}
}
