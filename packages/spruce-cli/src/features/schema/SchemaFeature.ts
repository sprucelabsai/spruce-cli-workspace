import SpruceError from '@sprucelabs/schema/build/errors/SpruceError'
import { IValueTypes } from '@sprucelabs/spruce-templates'
import { Service } from '../../factories/ServiceFactory'
import { GenerationResults } from '../../generators/AbstractGenerator'
import { INpmPackage } from '../../types/cli.types'
import diskUtil from '../../utilities/disk.utility'
import namesUtil from '../../utilities/names.utility'
import schemaGeneratorUtil from '../../utilities/schemaGenerator.utility'
import AbstractFeature from '../AbstractFeature'
import { FeatureCode } from '../FeatureManager'

interface ICreateSchemaOptions {
	destinationDir?: string
	nameReadable?: string
	namePascal?: string
	nameCamel: string
	description?: string
	addonsLookupDir?: string
}

interface ISyncSchemasOptions {
	lookupDir?: string
	destinationDir?: string
	addonLookupDir?: string
}

export interface ISchemaFeature {
	createSchema(options: ICreateSchemaOptions): Promise<GenerationResults>
	syncSchemas(options?: ISyncSchemasOptions): Promise<GenerationResults>
}

export default class SchemaFeature extends AbstractFeature
	implements ISchemaFeature {
	public description = 'Define, validate, and normalize everything.'
	public dependencies = [FeatureCode.Skill]
	public packageDependencies: INpmPackage[] = [
		{
			name: '@sprucelabs/schema',
		},
	]

	protected actionsDir = diskUtil.resolvePath(__dirname, 'actions')

	public async isInstalled() {
		return this.Service(Service.Pkg).isInstalled('@sprucelabs/schema')
	}

	public getActions() {
		return []
	}

	public async createSchema(
		options: ICreateSchemaOptions
	): Promise<GenerationResults> {
		const isInstalled = await this.isInstalled()

		if (!isInstalled) {
			throw new SpruceError({
				// @ts-ignore
				code: 'SKILL_NOT_INSTALLED',
			})
		}

		const {
			destinationDir = 'src/schemas',
			nameCamel,
			namePascal: namePascalOptions,
			nameReadable: nameReadableOptions,
			...rest
		} = options

		const action = this.actionFactory?.Action('createSchema')
		action?.execute

		const resolvedDestination = diskUtil.resolvePath(this.cwd, destinationDir)

		const results = await this.generators.schema.generateBuilder(
			resolvedDestination,
			{
				...rest,
				nameCamel,
				nameReadable: nameReadableOptions ?? nameCamel,
				namePascal: namePascalOptions ?? namesUtil.toPascal(nameCamel),
			}
		)

		const syncResults = await this.syncSchemas({
			lookupDir: destinationDir,
			...rest,
		})

		return [...results, ...syncResults]
	}

	public async syncSchemas(options?: ISyncSchemasOptions) {
		const isInstalled = await this.isInstalled()

		if (!isInstalled) {
			throw new SpruceError({
				// @ts-ignore
				code: 'SKILL_NOT_INSTALLED',
			})
		}

		const {
			lookupDir,
			addonLookupDir,
			destinationDir = diskUtil.resolveHashSprucePath(this.cwd, 'schemas'),
		} = options ?? {}

		const resolvedDestination = diskUtil.resolvePath(this.cwd, destinationDir)

		const {
			schemas: { items: schemaTemplateItems },
			fields: { items: fieldTemplateItems },
		} = await this.stores.schema.fetchAllTemplateItems(
			lookupDir,
			addonLookupDir
		)

		const definitionsToDelete = await schemaGeneratorUtil.filterDefinitionFilesBySchemaIds(
			resolvedDestination,
			schemaTemplateItems.map((i) => i.id)
		)

		definitionsToDelete.forEach((def) => diskUtil.deleteFile(def))

		await this.generators.schema.generateFieldTypes(resolvedDestination, {
			fieldTemplateItems,
		})

		const valueTypeResults = await this.generators.schema.generateValueTypes(
			resolvedDestination,
			{
				fieldTemplateItems,
				schemaTemplateItems,
			}
		)

		const valueTypes: IValueTypes = await this.serviceFactory
			.Service(this.cwd, Service.Import)
			.importDefault(valueTypeResults[0].path)

		const results = await this.generators.schema.generateSchemaTypes(
			diskUtil.resolvePath(this.cwd, destinationDir),
			{
				fieldTemplateItems,
				schemaTemplateItems,
				valueTypes,
			}
		)

		return results
	}
}
