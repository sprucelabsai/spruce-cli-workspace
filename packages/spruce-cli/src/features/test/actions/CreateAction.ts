import pathUtil from 'path'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createTestActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createTestOptions.schema'
import AbstractAction from '../../AbstractAction'
import { FeatureActionResponse } from '../../features.types'
import TestFeature, { ParentClassCandidate } from '../TestFeature'

type OptionsSchema = SpruceSchemas.SpruceCli.v2020_07_22.CreateTestOptionsSchema
type Options = SpruceSchemas.SpruceCli.v2020_07_22.CreateTestOptions
export default class CreateAction extends AbstractAction<OptionsSchema> {
	public optionsSchema = createTestActionSchema
	public invocationMessage = 'Creating a test... 🛡'

	public async execute(options: Options): Promise<FeatureActionResponse> {
		const normalizedOptions = this.validateAndNormalizeOptions(options)
		const { testDestinationDir, namePascal, nameCamel, type } =
			normalizedOptions

		const resolvedDestination = diskUtil.resolvePath(
			this.cwd,
			testDestinationDir,
			type
		)

		this.ui.startLoading('Checking potential parent test classes')

		const testFeature = this.parent as TestFeature
		const candidates = await testFeature.buildParentClassCandidates()

		this.ui.stopLoading()

		let parentTestClass:
			| undefined
			| { name: string; importPath: string; isDefaultExport: boolean }

		if (candidates.length > 0) {
			const idx = await this.ui.prompt({
				type: 'select',
				isRequired: true,
				label: 'Which abstract test class do you want to extend?',
				options: {
					choices: [
						{ value: '', label: 'AbstractSpruceTest (default)' },
						...candidates.map((candidate, idx) => ({
							value: `${idx}`,
							label: candidate.label,
						})),
					],
				},
			})

			if (idx !== '' && candidates[+idx]) {
				const match = candidates[+idx]

				if (match) {
					await this.optionallyInstallFeatureBasedOnSelection(match)

					parentTestClass = this.buildParentClassFromCandidate(
						match,
						resolvedDestination
					)
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
	private async optionallyInstallFeatureBasedOnSelection(
		match: ParentClassCandidate
	) {
		if (match.featureCode) {
			const isInstalled = await this.featureInstaller.isInstalled(
				match.featureCode
			)

			if (!isInstalled) {
				this.ui.startLoading(`Installing ${match.name}...`)
				await this.featureInstaller.install({
					features: [{ code: match.featureCode as any }],
				})
				this.ui.stopLoading()
			}
		}
	}

	private buildParentClassFromCandidate(
		match: ParentClassCandidate,
		resolvedDestination: string
	): {
		name: string
		label: string
		importPath: string
		isDefaultExport: boolean
	} {
		return {
			name: match.name,
			label: match.label,
			isDefaultExport: match.isDefaultExport,
			importPath:
				match.import ??
				pathUtil.relative(
					resolvedDestination,
					//@ts-ignore
					match.path.replace(pathUtil.extname(match.path), '')
				),
		}
	}
}
