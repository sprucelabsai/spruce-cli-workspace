import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createTestActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createTestAction.schema'
import AbstractFeatureAction from '../../AbstractFeatureAction'
import ParentTestFinder from '../../error/ParentTestFinder'
import { FeatureActionResponse } from '../../features.types'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateTestActionSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateTestAction
export default class CreateAction extends AbstractFeatureAction<OptionsSchema> {
	public code = 'Test'
	public optionsSchema = createTestActionSchema

	public async execute(options: Options): Promise<FeatureActionResponse> {
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

		this.ui.startLoading('Checking potential parent test classes')

		const parentFinder = new ParentTestFinder(this.cwd)
		const candidates = await parentFinder.findAbstractTests()

		this.ui.stopLoading()

		let parentTestClass: undefined | { name: string; importPath: string }

		if (candidates.length > 0) {
			const parentPath = await this.ui.prompt({
				type: 'select',
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

		this.ui.startLoading('Generating test file...')

		const writer = this.Writer('test')

		const results = await writer.generateTest(resolvedDestination, {
			...normalizedOptions,
			type,
			nameCamel,
			parentTestClass,
			namePascal: namePascal ?? namesUtil.toPascal(nameCamel),
		})

		return {
			files: results,
			hints: ["run `spruce test` in your skill when you're ready!"],
		}
	}
}
