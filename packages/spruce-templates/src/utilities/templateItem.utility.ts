import { ISchemaTemplateItem, IFieldTemplateItem } from '@sprucelabs/schema'

const templateItemUtil = {
	groupSchemaTemplatesByNamespaceAndName(
		schemaTemplateItems: ISchemaTemplateItem[]
	) {
		const hash: {
			[namespace: string]: {
				[name: string]: ISchemaTemplateItem[]
			}
		} = {}

		schemaTemplateItems.forEach((item) => {
			if (!hash[item.namespace]) {
				hash[item.namespace] = {}
			}

			if (!hash[item.namespace][item.nameCamel]) {
				hash[item.namespace][item.nameCamel] = []
			}

			hash[item.namespace][item.nameCamel].push(item)
		})

		return hash
	},

	groupFieldItemsByNamespace(fieldTemplateItems: IFieldTemplateItem[]) {
		const fieldTemplatesByType: {
			[namespace: string]: IFieldTemplateItem[]
		} = {}

		fieldTemplateItems.forEach((item) => {
			if (!fieldTemplatesByType[item.camelType]) {
				fieldTemplatesByType[item.camelType] = []
			}
			fieldTemplatesByType[item.camelType].push(item)
		})
	},
	// eslint-disable-next-line no-undef
} as const

export default templateItemUtil
