import AbstractStore from './AbstractStore'
import {
	ISchemaDefinition,
	FieldClassMap,
	FieldType,
	IFieldTemplateDetails,
	IFieldRegistration
} from '@sprucelabs/schema'
import {
	ISchemaTypesTemplateItem,
	IFieldTypesTemplateItem
} from '@sprucelabs/spruce-templates'

import path from 'path'
import { uniqBy } from 'lodash'

// TODO move these into mercury api and pull from there
import {
	userDefinition,
	userLocationDefinition,
	skillDefinition,
	locationDefinition,
	groupDefinition,
	aclDefinition
} from '../temporary/schemas'
import globby from 'globby'

/** The mapping of type keys (string, phoneNumber) to definitions */
export interface IFieldTypeMap {
	[fieldType: string]: IFieldTemplateDetails
}

export default class SchemaStore extends AbstractStore {
	public name = 'schema'

	/** Get the schema map */
	public async schemaTemplateItems(): Promise<ISchemaTypesTemplateItem[]> {
		/** Get all schemas from api  */
		// TODO load from api
		const schemas: ISchemaDefinition[] = [
			userDefinition,
			skillDefinition,
			locationDefinition,
			userLocationDefinition,
			groupDefinition,
			aclDefinition
		]

		// Each skill's slug will be the namespace
		const templateItems = this.utilities.schema.generateTemplateItems({
			namespace: 'core',
			definitions: schemas
		})

		return templateItems
	}

	/** All field types from all skills we depend on */
	public async fieldTemplateItems(): Promise<IFieldTypesTemplateItem[]> {
		// TODO load from core
		const coreAddons = (
			await globby([
				path.join(
					this.cwd,
					'node_modules/@sprucelabs/schema/build/src/addons/*Field.addon.js'
				),
				path.join(
					this.cwd,
					'../../node_modules/@sprucelabs/schema/build/src/addons/*Field.addon.js'
				)
			])
		).map(path => ({
			path,
			registration: this.services.vm.importAddon<IFieldRegistration>(path),
			isLocal: false
		}))

		const localAddons = (
			await globby([
				path.join(this.cwd, '/build/src/addons/*Field.addon.js'),
				path.join(this.cwd, '/src/addons/*Field.addon.ts')
			])
		).map(path => ({
			path,
			registration: this.services.vm.importAddon<IFieldRegistration>(path),
			isLocal: true
		}))

		const allAddons = uniqBy(
			[...coreAddons, ...localAddons],
			'registration.type'
		)
		const types: IFieldTypesTemplateItem[] = []

		for (const addon of allAddons) {
			const registration: IFieldRegistration = addon.registration
			let pkg = registration.package

			if (addon.isLocal) {
				const camelName = this.utilities.names
					.toFileNameWithoutExtension(addon.path)
					.replace('.addon', '')
				const pascalName = this.utilities.names.toPascal(camelName)

				pkg = `../../../src/fields/${pascalName}`
			}

			// Map registration to template item
			const name = registration.className
			types.push({
				pascalName: this.utilities.names.toPascal(name),
				camelName: this.utilities.names.toCamel(name),
				package: pkg,
				readableName: registration.className,
				pascalType: this.utilities.names.toPascal(registration.type),
				camelType: this.utilities.names.toCamel(registration.type),
				isLocal: addon.isLocal,
				description: registration.description
			})
		}

		return types
	}

	/** Get all fields */
	public async fieldTypeMap(): Promise<IFieldTypeMap> {
		const map: IFieldTypeMap = {}
		Object.keys(FieldClassMap).forEach(type => {
			const FieldClass = FieldClassMap[type as FieldType]
			const templateDetails = FieldClass.templateDetails()
			map[type] = templateDetails
		})
		return map
	}
}
