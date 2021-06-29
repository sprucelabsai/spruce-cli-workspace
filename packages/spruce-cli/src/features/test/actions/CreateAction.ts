import pathUtil from 'path'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import createTestActionSchema from '#spruce/schemas/spruceCli/v2020_07_22/createTestOptions.schema'
import SpruceError from '../../../errors/SpruceError'
import AbstractAction from '../../AbstractAction'
import ParentTestFinder from '../../error/ParentTestFinder'
import { FeatureActionResponse } from '../../features.types'

interface ParentClassCandidate {
	name: string
	path?: string
	import?: string
	isDefaultExport: boolean
}

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

		const candidates = await this.buildParentClassCandidates()

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
						{ value: '', label: 'Default (AbstractSpruceTest)' },
						...candidates.map((candidate, idx) => ({
							value: `${idx}`,
							label: candidate.name,
						})),
					],
				},
			})

			if (idx !== '' && candidates[+idx]) {
				const match = candidates[+idx]

				if (match) {
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

	private buildParentClassFromCandidate(
		match: ParentClassCandidate,
		resolvedDestination: string
	): { name: string; importPath: string; isDefaultExport: boolean } {
		return {
			name: match.name,
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

	private async buildParentClassCandidates(): Promise<ParentClassCandidate[]> {
		const parentFinder = new ParentTestFinder(this.cwd)
		const candidates: ParentClassCandidate[] =
			await parentFinder.findAbstractTests()

		const results = await this.emitter.emit(
			'test.register-abstract-test-classes'
		)

		const { payloads } = eventResponseUtil.getAllResponsePayloadsAndErrors(
			results,
			SpruceError
		)

		for (const payload of payloads) {
			const { abstractClasses } = payload
			candidates.push(
				...abstractClasses.map((ac) => ({ ...ac, isDefaultExport: false }))
			)
		}

		candidates.sort((a, b) => {
			if (a.name > b.name) {
				return 1
			} else {
				return -1
			}
		})

		return candidates
	}
}
