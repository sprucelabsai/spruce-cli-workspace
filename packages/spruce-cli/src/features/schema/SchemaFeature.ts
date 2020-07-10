import SpruceError from '@sprucelabs/schema/build/errors/SpruceError'
import { Service } from '../../factories/ServiceFactory'
import { GenerationResults } from '../../generators/AbstractGenerator'
import { INpmPackage } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'
import namesUtil from '../../utilities/names.utility'
import AbstractFeature from '../AbstractFeature'
import { IFeatureAction, FeatureCode } from '../features.types'
import { ICreateSchemaActionDefinition } from './actions/CreateAction'
import { ISyncSchemaOptionsDefinition } from './actions/SyncAction'

interface ICreateSchemaOptions {
	destinationDir?: string
	nameReadable?: string
	namePascal?: string
	nameCamel: string
	description?: string
	addonsLookupDir?: string
	typesDestination?: string
}

interface ISyncSchemasOptions {
	lookupDir?: string
	destinationDir?: string
	addonsLookupDir?: string
	typesDestinationDir?: string
}

export interface ISchemaFeature {
	createSchema(options: ICreateSchemaOptions): Promise<GenerationResults>
	syncSchemas(options?: ISyncSchemasOptions): Promise<GenerationResults>
}

export default class SchemaFeature extends AbstractFeature
	implements ISchemaFeature {
	public description = 'Define, validate, and normalize everything.'
	public dependencies: FeatureCode[] = ['skill']
	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema',
		},
	]

	public code: FeatureCode = 'schema'
	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled() {
		try {
			return this.Service(Service.Pkg).isInstalled('@sprucelabs/schema')
		} catch {
			return false
		}
	}

	public async createSchema(
		options: ICreateSchemaOptions
	): Promise<GenerationResults> {
		const action = this.Action('create') as IFeatureAction<
			ICreateSchemaActionDefinition
		>

		const results = await action?.execute({
			...options,
			destinationDir: options.destinationDir ?? 'src/schemas',
			lookupDir: 'src/schemas',
			typesDestinationDir: options.typesDestination ?? '#spruce/schemas',
			addonsLookupDir: options.addonsLookupDir ?? 'src/addons',
			nameReadable: options.nameReadable ?? options.nameCamel,
			namePascal: options.namePascal ?? namesUtil.toPascal(options.nameCamel),
		})

		return results.files ?? []
	}

	public async syncSchemas(options?: ISyncSchemasOptions) {
		const isInstalled = await this.isInstalled()

		if (!isInstalled) {
			throw new SpruceError({
				// @ts-ignore
				code: 'SKILL_NOT_INSTALLED',
			})
		}

		const myOptions = options ?? {}

		const action = this.Action('sync') as IFeatureAction<
			ISyncSchemaOptionsDefinition
		>

		const results = await action?.execute({
			...options,
			typesDestinationDir: myOptions.typesDestinationDir ?? '#spruce/schemas',
			lookupDir: myOptions.lookupDir ?? 'src/schemas',
			addonsLookupDir: myOptions.addonsLookupDir ?? 'src/addons',
		})

		return results.files ?? []
	}
}
