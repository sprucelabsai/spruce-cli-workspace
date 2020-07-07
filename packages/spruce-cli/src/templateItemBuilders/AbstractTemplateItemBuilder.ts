export default class AbstractTemplateItemBuilder {
	protected cwd: string
	public constructor(options: { cwd: string }) {
		this.cwd = options.cwd
	}
}
