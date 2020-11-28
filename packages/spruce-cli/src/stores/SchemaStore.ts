import pathUtil from 'path'
import {
	Schema,
	FieldRegistration,
	fieldRegistrations,
} from '@sprucelabs/schema'
import * as coreSchemas from '@sprucelabs/spruce-core-schemas'
import { versionUtil } from '@sprucelabs/spruce-skill-utils'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import globby from 'globby'
import { uniqBy } from 'lodash'
import SpruceError from '../errors/SpruceError'
import AbstractStore from './AbstractStore'

interface AddonItem {
	path: string
	registration: FieldRegistration
	isLocal: boolean
}

export interface SchemasByNamespace {
	[namespace: string]: Schema[]
}

interface FetchSchemasResults {
	schemasByNamespace: SchemasByNamespace
	errors: SpruceError[]
}
export interface FetchedField {
	path?: string
	registration: FieldRegistration
	isLocal: boolean
}

interface FetchFieldsResults {
	errors: SpruceError[]
	fields: FetchedField[]
}

export default class SchemaStore extends AbstractStore {
	public readonly name = 'schema'

	public async fetchSchemas(options: {
		localSchemaLookupDir?: string
		fetchRemoteSchemas?: boolean
		enableVersioning?: boolean
		localNamespace: string
		fetchCoreSchemas?: boolean
		fetchLocalSchemas?: boolean
	}): Promise<FetchSchemasResults> {
		const {
			localSchemaLookupDir: localSchemaDir = 'src/schemas',
			fetchLocalSchemas = true,
			fetchRemoteSchemas = true,
			enableVersioning = true,
			localNamespace,
			fetchCoreSchemas = true,
		} = options || {}

		const results: FetchSchemasResults = {
			errors: [],
			schemasByNamespace: {},
		}

		if (fetchRemoteSchemas) {
			// TODO - make mercury request when mercury-api is running
		}

		if (fetchCoreSchemas) {
			results.schemasByNamespace[CORE_NAMESPACE] = Object.values(coreSchemas)
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
		const schemas: Schema[] = []

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
						let errors: string[] = []

						if (schema.version) {
							errors.push('version_should_not_be_set')
						}

						if (schema.namespace) {
							errors.push('namespace_should_not_be_set')
						}

						if (errors.length > 0) {
							throw new SpruceError({
								code: 'INVALID_SCHEMA',
								schemaId: schema.id,
								errors,
								friendlyMessage:
									'You should not set a namespace nor version in your schema builder.',
							})
						}

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
	}): Promise<FetchFieldsResults> {
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
							const registration = await importService.importDefault<FieldRegistration>(
								file
							)

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
				...(localAddons.filter((addon) => !!addon) as AddonItem[]),
			],
			'registration.type'
		)

		return {
			fields: allFields,
			errors: localErrors,
		}
	}
}
