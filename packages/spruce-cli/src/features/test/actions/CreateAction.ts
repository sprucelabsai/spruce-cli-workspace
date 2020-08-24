import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import createTestActionSchema from '#spruce/schemas/local/v2020_07_22/createTestAction.schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import ParentTestFinder from '../../error/ParentTestFinder'
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

		const parentFinder = new ParentTestFinder(this.cwd)
		const candidates = await parentFinder.findAbstractTests()
		let parentTestClass: undefined | { name: string; importPath: string }

		if (candidates.length > 0) {
			const parentPath = await this.ui.prompt({
				type: FieldType.Select,
				isRequired: true,
				label: 'Which abstract test class do you want to extend?',
				options: {
					choices: [
						{ value: '', label: 'Default (AbstractSpruceTest)' },
						...candidates.map((candidate) => ({
							value: candidate.path,
							label: candidate.name,
						})),
					],
				},
			})

			if (parentPath.length > 0) {
				const match = candidates.find(
					(candidate) => candidate.path === parentPath
				)

				if (match) {
					parentTestClass = {
						name: match.name,
						importPath: pathUtil.relative(
							resolvedDestination,
							match.path.replace(pathUtil.extname(match.path), '')
						),
					}
				}
			}
		}

		const generator = this.Generator('test')

		const results = await generator.generateTest(resolvedDestination, {
			...normalizedOptions,
			type,
			nameCamel,
			parentTestClass,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		return { files: results }
	}
}
