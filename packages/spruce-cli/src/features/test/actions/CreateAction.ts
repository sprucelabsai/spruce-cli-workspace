import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import createTestActionSchema from '#spruce/schemas/local/v2020_07_22/createTestAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import { IFeatureActionExecuteResponse } from '../../features.types'

export default class CreateAction extends AbstractFeatureAction<
	SpruceSchemas.Local.v2020_07_22.ICreateTestActionSchema
> {
	public name = 'Test'
	public optionsSchema = createTestActionSchema

	public async execute(
		options: SpruceSchemas.Local.v2020_07_22.ICreateTestAction
	): Promise<IFeatureActionExecuteResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const {
			testDestinationDir,
			namePascal,
			nameCamel,
			type,
		} = normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			testDestinationDir,
			type
		)

		const generator = this.Generator('test')

		const results = await generator.generateTest(resolvedDestination, {
			...normalizedOptions,
			type,
			nameCamel,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		return { files: results }
	}
}
