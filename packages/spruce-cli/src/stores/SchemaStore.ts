import pathUtil from 'path'
import {
	ISchema,
	IFieldRegistration,
	fieldRegistrations,
} from '@sprucelabs/schema'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { uniqBy } from 'lodash'
import SpruceError from '../errors/SpruceError'
import {
	personSchema,
	personLocationSchema,
	skillSchema,
	locationSchema,
	aclSchema,
} from '../temporary/schemas'
import AbstractStore from './AbstractStore'

interface IAddonItem {
	path: string
	registration: IFieldRegistration
	isLocal: boolean
}

export interface ISchemasByNamespace {
	[namespace: string]: ISchema[]
}

interface IFetchSchemasResults {
	schemasByNamespace: ISchemasByNamespace
	errors: SpruceError[]
}
export interface IFetchedField {
	path?: string
	registration: IFieldRegistration
	isLocal: boolean
}

interface IFetchFieldsResults {
	errors: SpruceError[]
	fields: IFetchedField[]
}

export default class SchemaStore extends AbstractStore {
	public async fetchSchemas(options: {
		localSchemaLookupDir?: string
		fetchRemoteSchemas?: boolean
		enableVersioning?: boolean
		localNamespace: string
		fetchCoreSchemas?: boolean
		fetchLocalSchemas?: boolean
	}): Promise<IFetchSchemasResults> {
		const {
			localSchemaLookupDir: localSchemaDir = 'src/schemas',
			fetchLocalSchemas = true,
			fetchRemoteSchemas = true,
			enableVersioning = true,
			localNamespace,
			fetchCoreSchemas = true,
		} = options || {}

		const results: IFetchSchemasResults = {
			errors: [],
			schemasByNamespace: {},
		}

		if (fetchRemoteSchemas) {
			// TODO - make mercury request when mercury-api is running
		}

		if (fetchCoreSchemas) {
			results.schemasByNamespace[CORE_NAMESPACE] = [
				personSchema,
				skillSchema,
				locationSchema,
				personLocationSchema,
				aclSchema,
			]
		}

		if (fetchLocalSchemas) {
			const locals = await this.loadLocalSchemas(
				localSchemaDir,
				enableVersioning
			)
			results.schemasByNamespace[localNamespace] = locals.schemas
			results.errors.push(...locals.errors)
		}

		return results
	}

	private async loadLocalSchemas(
		localLookupDir: string,
		enableVersioning?: boolean
	) {
		const localMatches = await globby(
			diskUtil.resolvePath(this.cwd, localLookupDir, '**/*.builder.[t|j]s')
		)

		const schemaService = this.Service('schema')
		const errors: SpruceError[] = []
		const schemas: ISchema[] = []

		await Promise.all(
			localMatches.map(async (local: string) => {
				let version: undefined | string

				try {
					version =
						enableVersioning === false
							? undefined
							: versionUtil.extractVersion(this.cwd, local).dirValue
				} catch (err) {
					errors.push(
						new SpruceError({
							// @ts-ignore
							code: 'VERSION_MISSING',
							friendlyMessage: `It looks like your schema's are not versioned. Make sure schemas are in a directory like src/schemas/${
								versionUtil.generateVersion().dirValue
							}/*.ts`,
						})
					)
				}

				if (version || enableVersioning === false) {
					try {
						const schema = await schemaService.importSchema(local)
						schema.version = version

						schemas.push(schema)
					} catch (err) {
						errors.push(
							new SpruceError({
								code: 'SCHEMA_FAILED_TO_IMPORT',
								file: local,
								originalError: err,
							})
						)
					}
				}
			})
		)

		return {
			schemas,
			errors,
		}
	}

	public async fetchFields(options?: {
		localAddonsDir?: string
	}): Promise<IFetchFieldsResults> {
		const { localAddonsDir } = options || {}

		// TODO load from mercury-api when live
		const coreAddons = fieldRegistrations.map((registration) => {
			return {
				registration,
				isLocal: false,
			}
		})

		const localErrors: SpruceError[] = []
		const importService = this.Service('import')

		const localAddons = !localAddonsDir
			? []
			: await Promise.all(
					(
						await globby([
							pathUtil.join(localAddonsDir, '/*Field.addon.[t|j]s'),
						])
					).map(async (file: string) => {
						try {
							const registration = await importService.importDefault<
								IFieldRegistration
							>(file)

							return {
								path: file,
								registration,
								isLocal: true,
							}
						} catch (err) {
							localErrors.push(
								new SpruceError({
									code: 'FAILED_TO_IMPORT',
									file,
									originalError: err,
								})
							)
							return false
						}
					})
			  )

		const allFields = uniqBy(
			[
				...coreAddons,
				...(localAddons.filter((addon) => !!addon) as IAddonItem[]),
			],
			'registration.type'
		)

		return {
			fields: allFields,
			errors: localErrors,
		}
	}
}
