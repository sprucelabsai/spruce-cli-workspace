import { buildSchema, ISchema, ISchemaTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import AbstractCliTest from '../../AbstractCliTest'
import SchemaTemplateItemBuilder from '../../templateItemBuilders/SchemaTemplateItemBuilder'

const cowbellV1: ISchema = {
	id: 'cowbell',
	version: '2020_06_01',
	name: 'Cowbell test',
	fields: {
		radius: {
			type: 'number',
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
	isNested: false,
	destinationDir: '#spruce/schemas',
}

const cowbellV1NestedTemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: cowbellV1.id,
	nameCamel: 'cowbell',
	namePascal: 'Cowbell',
	nameReadable: 'Cowbell test',
	schema: cowbellV1,
	isNested: true,
	destinationDir: '#spruce/schemas',
}

const cowbellV2: ISchema = {
	id: 'cowbell',
	version: '2020_06_02',
	name: 'Cowbell test two!',
	fields: {
		radius: {
			type: 'number',
		},
		owner: {
			type: 'schema',
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
	isNested: false,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'cowbell',
		version: '2020_06_02',
		name: 'Cowbell test two!',
		fields: {
			radius: {
				type: 'number',
			},
			owner: {
				type: 'schema',
				options: {
					schemaIds: [{ id: 'person', version: '2020_06_03' }],
				},
			},
		},
	},
}

const cowbellV2NestedTemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: cowbellV2.id,
	nameCamel: 'cowbell',
	namePascal: 'Cowbell',
	nameReadable: 'Cowbell test two!',
	isNested: true,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'cowbell',
		version: '2020_06_02',
		name: 'Cowbell test two!',
		fields: {
			radius: {
				type: 'number',
			},
			owner: {
				type: 'schema',
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
			type: 'text',
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
	isNested: false,
	destinationDir: '#spruce/schemas',
}

const personV2: ISchema = {
	id: 'person',
	version: '2020_06_01',
	name: 'Person version 2',
	fields: {
		name: {
			type: 'text',
		},
		favoriteVehicle: {
			type: 'schema',
			options: {
				schema: {
					id: 'vehicle',
					name: 'Vehicle v1',
					version: '2020_06_01',
					fields: {
						make: {
							type: 'text',
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
	isNested: false,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'person',
		version: '2020_06_01',
		name: 'Person version 2',
		fields: {
			name: {
				type: 'text',
			},
			favoriteVehicle: {
				type: 'schema',
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
			type: 'schema',
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
	isNested: false,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'person',
		version: '2020_06_03',
		name: 'Person test the 3rd',
		fields: {
			relatedField: {
				type: 'schema',
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
	isNested: true,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'vehicle',
		name: 'Vehicle v1',
		version: '2020_06_01',
		fields: {
			make: {
				type: 'text',
			},
		},
	},
}

const personV4: ISchema = {
	id: 'person',
	version: '2020_06_04',
	name: 'Person test the last',
	importsWhenLocal: ["import BaseParent from '../../file'"],
	importsWhenRemote: [
		"import BaseParent from '@sprucelabs/spruce-core-schemas'",
	],
	fields: {
		cowbells: {
			type: 'schema',
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
	isNested: false,
	imports: ["import BaseParent from '@sprucelabs/spruce-core-schemas'"],
	destinationDir: '#spruce/schemas',
}

const nestedMercuryContract: ISchema = {
	id: 'mercuryContract',
	name: 'Mercury Contract',
	description: '',
	version: '2020_09_01',
	dynamicFieldSignature: {
		type: 'schema',
		keyName: 'eventNameWithOptionalNamespace',
		options: {
			schema: {
				id: 'eventSignature',
				name: 'Event Signature',
				description: '',
				fields: {
					responsePayload: {
						type: 'raw',
						options: { valueType: 'ISchema' },
					},
					emitPayload: {
						type: 'raw',
						options: { valueType: 'ISchema' },
					},
					listenPermissionsAny: {
						type: 'text',
					},
					emitPermissionsAny: {
						type: 'text',
					},
				},
			},
		},
	},
}

const nestedMercuryContractArray: ISchema = {
	id: 'mercuryContract',
	name: 'Mercury Contract',
	description: '',
	version: '2020_09_01',
	dynamicFieldSignature: {
		type: 'schema',
		keyName: 'eventNameWithOptionalNamespace',
		options: {
			schemas: [
				{
					id: 'eventSignature',
					name: 'Event Signature',
					description: '',
					fields: {
						responsePayload: {
							type: 'raw',
							options: { valueType: 'ISchema' },
						},
						emitPayload: {
							type: 'raw',
							options: { valueType: 'ISchema' },
						},
						listenPermissionsAny: {
							type: 'text',
						},
						emitPermissionsAny: {
							type: 'text',
						},
					},
				},
				{
					id: 'eventSignature2',
					name: 'Event Signature2',
					description: '',
					fields: {
						responsePayload: {
							type: 'raw',
							options: { valueType: 'ISchema' },
						},
						emitPayload: {
							type: 'raw',
							options: { valueType: 'ISchema' },
						},
						listenPermissionsAny: {
							type: 'text',
						},
						emitPermissionsAny: {
							type: 'text',
						},
					},
				},
			],
		},
	},
}

const mercuryTemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: nestedMercuryContract.id,
	nameCamel: 'mercuryContract',
	namePascal: 'MercuryContract',
	nameReadable: nestedMercuryContract.name ?? nestedMercuryContract.id,
	isNested: false,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'mercuryContract',
		name: 'Mercury Contract',
		description: '',
		version: '2020_09_01',
		dynamicFieldSignature: {
			type: 'schema',
			keyName: 'eventNameWithOptionalNamespace',
			options: {
				schemaIds: [
					{
						id: 'eventSignature',
						version: '2020_09_01',
					},
				],
			},
		},
	},
}

const eventSignatureTemplateItem: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: 'eventSignature',
	nameCamel: 'eventSignature',
	namePascal: 'EventSignature',
	nameReadable: 'Event Signature',
	isNested: true,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'eventSignature',
		name: 'Event Signature',
		description: '',
		version: '2020_09_01',
		fields: {
			responsePayload: {
				type: 'raw',
				options: { valueType: 'ISchema' },
			},
			emitPayload: {
				type: 'raw',
				options: { valueType: 'ISchema' },
			},
			listenPermissionsAny: {
				type: 'text',
			},
			emitPermissionsAny: {
				type: 'text',
			},
		},
	},
}
const mercuryTemplateItemArray: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: nestedMercuryContractArray.id,
	nameCamel: 'mercuryContract',
	namePascal: 'MercuryContract',
	nameReadable:
		nestedMercuryContractArray.name ?? nestedMercuryContractArray.id,
	isNested: false,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'mercuryContract',
		name: 'Mercury Contract',
		description: '',
		version: '2020_09_01',
		dynamicFieldSignature: {
			type: 'schema',
			keyName: 'eventNameWithOptionalNamespace',
			options: {
				schemaIds: [
					{
						id: 'eventSignature',
						version: '2020_09_01',
					},
					{
						id: 'eventSignature2',
						version: '2020_09_01',
					},
				],
			},
		},
	},
}

const eventSignatureTemplateItem2: ISchemaTemplateItem = {
	namespace: CORE_NAMESPACE,
	id: 'eventSignature2',
	nameCamel: 'eventSignature2',
	namePascal: 'EventSignature2',
	nameReadable: 'Event Signature2',
	isNested: true,
	destinationDir: '#spruce/schemas',
	schema: {
		id: 'eventSignature2',
		name: 'Event Signature2',
		description: '',
		version: '2020_09_01',
		fields: {
			responsePayload: {
				type: 'raw',
				options: { valueType: 'ISchema' },
			},
			emitPayload: {
				type: 'raw',
				options: { valueType: 'ISchema' },
			},
			listenPermissionsAny: {
				type: 'text',
			},
			emitPermissionsAny: {
				type: 'text',
			},
		},
	},
}
export default class SchemaTemplateItemBuilderTest extends AbstractCliTest {
	private static itemBuilder: SchemaTemplateItemBuilder

	private static readonly LOCAL_NAMESPACE = 'LocalNamespace'

	protected static async beforeEach() {
		await super.beforeEach()
		this.itemBuilder = new SchemaTemplateItemBuilder(this.LOCAL_NAMESPACE)
	}

	@test()
	protected static async canInstantiate() {
		assert.isTruthy(this.itemBuilder)
	}

	@test()
	protected static async hasGenerateFunction() {
		assert.isFunction(this.itemBuilder.generateTemplateItems)
	}

	@test()
	protected static async turnsSingleDefinitionIntoTemplateItem() {
		const results = this.itemBuilder.generateTemplateItems(
			{ [CORE_NAMESPACE]: [personV1] },
			'#spruce/schemas'
		)
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
		[
			cowbellV1NestedTemplateItem,
			cowbellV2NestedTemplateItem,
			personV3TemplateItem,
		]
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
	@test(
		'handles nested schema in dynamic key signature',
		[nestedMercuryContract],
		[eventSignatureTemplateItem, mercuryTemplateItem]
	)
	@test(
		'handles nested schemas in dynamic key signature',
		[nestedMercuryContractArray],
		[
			eventSignatureTemplateItem,
			eventSignatureTemplateItem2,
			mercuryTemplateItemArray,
		]
	)
	protected static async generationTests(
		schemas: ISchema[],
		expected: ISchemaTemplateItem[]
	) {
		const results = this.itemBuilder.generateTemplateItems(
			{ [CORE_NAMESPACE]: schemas },
			'#spruce/schemas'
		)

		assert.isEqual(
			results.length,
			expected.length,
			"Didn't generate the number of template items expected"
		)

		expected.forEach((expected, idx) => {
			const match = results[idx]

			assert.isTruthy(match, `Did not find a template item for ${expected.id}`)
			assert.isEqualDeep(match, expected)
		})
	}

	@test('properly set imports')
	protected static async setsImports() {
		const results = this.itemBuilder.generateTemplateItems(
			{
				[this.LOCAL_NAMESPACE]: [
					buildSchema({
						id: 'local',
						importsWhenLocal: ['import local from "local"'],
						importsWhenRemote: ['import remote from "remote"'],
						fields: {
							firstName: { type: 'text' },
						},
					}),
				],
			},
			'#spruce/schemas'
		)

		assert.isEqualDeep(results, [
			{
				id: 'local',
				namespace: 'LocalNamespace',
				schema: {
					id: 'local',
					importsWhenLocal: [`import local from "local"`],
					importsWhenRemote: [`import remote from "remote"`],
					fields: {
						firstName: {
							type: 'text',
						},
					},
				},
				nameReadable: 'local',
				nameCamel: 'local',
				namePascal: 'Local',
				isNested: false,
				destinationDir: '#spruce/schemas',
				imports: [`import local from "local"`],
			},
		])
	}
}
