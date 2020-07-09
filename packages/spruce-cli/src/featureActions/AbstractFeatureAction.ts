import { ISchemaDefinition, SchemaDefinitionValues } from '@sprucelabs/schema'
import { Templates } from '@sprucelabs/spruce-templates'
import { IFeatureAction } from '../features/feature.types'

export default abstract class AbstractFeatureAction<
	S extends ISchemaDefinition = ISchemaDefinition
> implements IFeatureAction<S> {
	public abstract name: string
	public abstract optionsDefinition: S

	protected cwd: string
	protected templates: Templates

	public constructor(cwd: string, templates: Templates) {
		this.cwd = cwd
		this.templates = templates
	}

	public abstract execute(options: SchemaDefinitionValues<S>): Promise<void>
}
