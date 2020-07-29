import { ISchema, ISchemaTemplateItem } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE } from '../../constants'
import SchemaTemplateItemBuilder from '../../templateItemBuilders/SchemaTemplateItemBuilder'

const cowbellV1: ISchema = {
	id: 'cowbell',
	version: '2020_06_01',
	name: 'Cowbell test',
	fields: {
		radius: {
			type: FieldType.Number,
		},
	},
}

const cowbellV1TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: cowbellV1.id,
	nameCamel: 'cowbell',
	namePascal: 'Cowbell',
	nameReadable: 'Cowbell test',
	schema: cowbellV1,
}

const cowbellV2: ISchema = {
	id: 'cowbell',
	version: '2020_06_02',
	name: 'Cowbell test two!',
	fields: {
		radius: {
			type: FieldType.Number,
		},
		owner: {
			type: FieldType.Schema,
			options: {
				schemaId: { id: 'person', version: '2020_06_03' },
			},
		},
	},
}

const cowbellV2TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: cowbellV2.id,
	nameCamel: 'cowbell',
	namePascal: 'Cowbell',
	nameReadable: 'Cowbell test two!',
	schema: {
		id: 'cowbell',
		version: '2020_06_02',
		name: 'Cowbell test two!',
		fields: {
			radius: {
				type: FieldType.Number,
			},
			owner: {
				type: FieldType.Schema,
				options: {
					schemaIds: [{ id: 'person', version: '2020_06_03' }],
				},
			},
		},
	},
}

const personV1: ISchema = {
	id: 'person',
	version: '2020_06_01',
	name: 'Person test',
	fields: {
		name: {
			type: FieldType.Text,
		},
	},
}

const personV1TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: personV1.id,
	nameCamel: 'person',
	namePascal: 'Person',
	nameReadable: 'Person test',
	schema: personV1,
}

const personV2: ISchema = {
	id: 'person',
	version: '2020_06_01',
	name: 'Person version 2',
	fields: {
		name: {
			type: FieldType.Text,
		},
		favoriteVehicle: {
			type: FieldType.Schema,
			options: {
				schema: {
					id: 'vehicle',
					name: 'Vehicle v1',
					version: '2020_06_01',
					fields: {
						make: {
							type: FieldType.Text,
						},
					},
				},
			},
		},
	},
}

const personV2TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: personV1.id,
	nameCamel: 'person',
	namePascal: 'Person',
	nameReadable: 'Person version 2',
	schema: {
		id: 'person',
		version: '2020_06_01',
		name: 'Person version 2',
		fields: {
			name: {
				type: FieldType.Text,
			},
			favoriteVehicle: {
				type: FieldType.Schema,
				options: {
					schemaIds: [{ id: 'vehicle', version: '2020_06_01' }],
				},
			},
		},
	},
}

const personV3: ISchema = {
	id: 'person',
	version: '2020_06_03',
	name: 'Person test the 3rd',
	fields: {
		relatedField: {
			type: FieldType.Schema,
			options: {
				schemas: [cowbellV1, cowbellV2],
			},
		},
	},
}

const personV3TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: personV3.id,
	nameCamel: 'person',
	namePascal: 'Person',
	nameReadable: 'Person test the 3rd',
	schema: {
		id: 'person',
		version: '2020_06_03',
		name: 'Person test the 3rd',
		fields: {
			relatedField: {
				type: FieldType.Schema,
				options: {
					schemaIds: [
						{ id: 'cowbell', version: '2020_06_01' },
						{ id: 'cowbell', version: '2020_06_02' },
					],
				},
			},
		},
	},
}

const vehicleV1TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: 'vehicle',
	nameCamel: 'vehicle',
	namePascal: 'Vehicle',
	nameReadable: 'Vehicle v1',
	schema: {
		id: 'vehicle',
		name: 'Vehicle v1',
		version: '2020_06_01',
		fields: {
			make: {
				type: FieldType.Text,
			},
		},
	},
}

const personV4: ISchema = {
	id: 'person',
	version: '2020_06_04',
	name: 'Person test the last',
	fields: {
		cowbells: {
			type: FieldType.Schema,
			options: {
				schemaIds: [
					{ id: 'cowbell', version: '2020_06_01' },
					{ id: 'cowbell', version: '2020_06_02' },
				],
			},
		},
	},
}

const personV4TemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: personV4.id,
	nameCamel: 'person',
	namePascal: 'Person',
	nameReadable: 'Person test the last',
	schema: personV4,
}

export default class SchemaTemplateItemBuilderTest extends AbstractSchemaTest {
	private static itemBuilder: SchemaTemplateItemBuilder

	protected static async beforeEach() {
		super.beforeEach()
		this.itemBuilder = new SchemaTemplateItemBuilder()
	}

	@test()
	protected static async canInstantiate() {
		assert.isOk(this.itemBuilder)
	}

	@test()
	protected static async hasAccumulateMethod() {
		assert.isFunction(this.itemBuilder.generateTemplateItems)
	}

	@test()
	protected static async turnsSingleDefinitionIntoTemplateItem() {
		const results = this.itemBuilder.generateTemplateItems(CORE_NAMESPACE, [
			personV1,
		])
		const actual = results[0]

		assert.isEqualDeep(actual, personV1TemplateItem)
	}

	@test(
		'turns 2 definitions into 2 template items',
		[cowbellV1, personV1],
		[cowbellV1TemplateItem, personV1TemplateItem]
	)
	@test(
		'turns one nested definition into 2 items',
		[personV2],
		[vehicleV1TemplateItem, personV2TemplateItem]
	)
	@test(
		'handles recursion',
		[personV3],
		[cowbellV1TemplateItem, cowbellV2TemplateItem, personV3TemplateItem]
	)
	@test(
		'handles duplication',
		[cowbellV1, cowbellV1, cowbellV1],
		[cowbellV1TemplateItem]
	)
	@test(
		'handles resolving by id and version',
		[personV4, personV3, cowbellV1, cowbellV2],
		[
			cowbellV1TemplateItem,
			personV3TemplateItem,
			cowbellV2TemplateItem,
			personV4TemplateItem,
		]
	)
	@test(
		'handles resolving by id and version in different order',
		[cowbellV1, personV4, personV3, cowbellV2],
		[
			cowbellV1TemplateItem,
			personV3TemplateItem,
			cowbellV2TemplateItem,
			personV4TemplateItem,
		]
	)
	protected static async generationTests(
		definitions: ISchema[],
		expected: ISchemaTemplateItem[]
	) {
		const results = this.itemBuilder.generateTemplateItems(
			CORE_NAMESPACE,
			definitions
		)

		assert.isEqual(results.length, expected.length)

		expected.forEach((expected, idx) => {
			const match = results[idx]

			assert.isOk(match, `Did not find a template item for ${expected.id}`)
			assert.isEqualDeep(match, expected)
		})
	}
}
