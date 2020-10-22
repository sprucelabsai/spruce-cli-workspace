import { buildSchema, ISchema, ISchemaTemplateItem } from '@sprucelabs/schema'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test'
import SchemaTemplateItemBuilder from '../../templateItemBuilders/SchemaTemplateItemBuilder'
import AbstractCliTest from '../../test/AbstractCliTest'

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

const schemaWithManyNestedSchemas: ISchema = {
	id: 'manyNested',
	version: '2020_09_01',
	fields: {
		firstLayer: {
			type: 'schema',
			options: {
				schema: {
					id: 'firstLayer',
					fields: {
						secondLayer: {
							type: 'schema',
							options: {
								schema: {
									id: 'secondLayer',
									fields: {
										lastLayer: {
											type: 'schema',
											options: {
												schema: {
													id: 'lastLayer',
													fields: {
														pass: {
															type: 'boolean',
														},
													},
												},
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
	},
}

const manyNestedTemplateItem: ISchemaTemplateItem = {
	id: 'manyNested',
	namespace: 'Spruce',
	schema: {
		id: 'manyNested',
		version: '2020_09_01',
		fields: {
			firstLayer: {
				type: 'schema',
				options: { schemaIds: [{ id: 'firstLayer', version: '2020_09_01' }] },
			},
		},
	},
	nameReadable: 'manyNested',
	nameCamel: 'manyNested',
	namePascal: 'ManyNested',
	isNested: false,
	destinationDir: '#spruce/schemas',
}

const firstLayerTemplateItem: ISchemaTemplateItem = {
	id: 'firstLayer',
	namespace: 'Spruce',
	schema: {
		id: 'firstLayer',
		version: '2020_09_01',
		fields: {
			secondLayer: {
				type: 'schema',
				options: { schemaIds: [{ id: 'secondLayer', version: '2020_09_01' }] },
			},
		},
	},
	nameReadable: 'firstLayer',
	nameCamel: 'firstLayer',
	namePascal: 'FirstLayer',
	isNested: true,
	destinationDir: '#spruce/schemas',
}

const secondLayerTemplateItem: ISchemaTemplateItem = {
	id: 'secondLayer',
	namespace: 'Spruce',
	schema: {
		id: 'secondLayer',
		version: '2020_09_01',
		fields: {
			lastLayer: {
				type: 'schema',
				options: { schemaIds: [{ id: 'lastLayer', version: '2020_09_01' }] },
			},
		},
	},
	nameReadable: 'secondLayer',
	nameCamel: 'secondLayer',
	namePascal: 'SecondLayer',
	isNested: true,
	destinationDir: '#spruce/schemas',
}

const lastLayerTemplateItem: ISchemaTemplateItem = {
	id: 'lastLayer',
	namespace: 'Spruce',
	schema: {
		id: 'lastLayer',
		version: '2020_09_01',
		fields: { pass: { type: 'boolean' } },
	},
	nameReadable: 'lastLayer',
	nameCamel: 'lastLayer',
	namePascal: 'LastLayer',
	isNested: true,
	destinationDir: '#spruce/schemas',
}

const mercurySchemas = [
	{
		id: 'mercuryContract',
		name: 'Mercury Contract',
		description: '',
		fields: {
			eventSignatures: {
				type: 'schema',
				isRequired: true,
				isArray: true,
				options: {
					schema: {
						id: 'eventSignature',
						name: 'Event Signature',
						description: '',
						fields: {
							eventNameWithOptionalNamespace: {
								type: 'text',
								isRequired: true,
							},
							responsePayload: {
								type: 'raw',
								options: { valueType: 'SpruceSchema.ISchema' },
							},
							emitPayload: {
								type: 'raw',
								options: { valueType: 'SpruceSchema.ISchema' },
							},
							listenPermissions: {
								type: 'schema',
								isArray: true,
								options: {
									schemaId: { id: 'permission', version: 'v2020_09_01' },
								},
							},
							emitPermissions: {
								type: 'schema',
								isArray: true,
								options: {
									schemaId: { id: 'permission', version: 'v2020_09_01' },
								},
							},
						},
					},
				},
			},
		},
		version: 'v2020_09_01',
	},
	{
		id: 'permissionContract',
		name: 'Permission Contract',
		description: '',
		fields: {
			requireAllPermissions: { type: 'boolean', defaultValue: false },
			permissions: {
				type: 'schema',
				isRequired: true,
				isArray: true,
				options: {
					schema: {
						id: 'permission',
						name: 'Permission',
						fields: {
							name: {
								type: 'text',
								label: 'Permission name',
								isRequired: true,
								hint:
									'Hyphen separated name for this permission, e.g. can-unlock-doors',
							},
							requireAllStatuses: {
								type: 'boolean',
								label: 'Require all statuses',
								defaultValue: false,
							},
							defaultsByRoleBase: {
								type: 'schema',
								options: {
									schema: {
										id: 'defaultsByRole',
										fields: {
											owner: { type: 'boolean' },
											groupManager: { type: 'boolean' },
											manager: { type: 'boolean' },
											teammate: { type: 'boolean' },
											guest: { type: 'boolean' },
										},
									},
								},
							},
							can: {
								type: 'schema',
								options: {
									schema: {
										id: 'statusFlags',
										fields: {
											default: { type: 'boolean' },
											clockedIn: {
												label: 'Clocked in',
												hint: 'Is the person clocked in and ready to rock?',
												type: 'boolean',
											},
											clockedOut: {
												label: 'Clocked out',
												hint: 'When someone is not working (off the clock).',
												type: 'boolean',
											},
											onPrem: {
												label: 'On premise',
												hint:
													'Are they at work (maybe working, maybe visiting).',
												type: 'boolean',
											},
											offPrem: {
												label: 'Off premise',
												hint: "They aren't at the office or shop.",
												type: 'boolean',
											},
										},
									},
								},
							},
						},
					},
				},
			},
		},
		version: 'v2020_09_01',
	},
]

const mercuryTemplateItems = [
	{
		id: 'defaultsByRole',
		namespace: 'Spruce',
		schema: {
			version: 'v2020_09_01',
			id: 'defaultsByRole',
			fields: {
				owner: { type: 'boolean' },
				groupManager: { type: 'boolean' },
				manager: { type: 'boolean' },
				teammate: { type: 'boolean' },
				guest: { type: 'boolean' },
			},
		},
		nameReadable: 'defaultsByRole',
		nameCamel: 'defaultsByRole',
		namePascal: 'DefaultsByRole',
		isNested: true,
		destinationDir: '#spruce/schemas',
	},
	{
		id: 'statusFlags',
		namespace: 'Spruce',
		schema: {
			version: 'v2020_09_01',
			id: 'statusFlags',
			fields: {
				default: { type: 'boolean' },
				clockedIn: {
					label: 'Clocked in',
					hint: 'Is the person clocked in and ready to rock?',
					type: 'boolean',
				},
				clockedOut: {
					label: 'Clocked out',
					hint: 'When someone is not working (off the clock).',
					type: 'boolean',
				},
				onPrem: {
					label: 'On premise',
					hint: 'Are they at work (maybe working, maybe visiting).',
					type: 'boolean',
				},
				offPrem: {
					label: 'Off premise',
					hint: "They aren't at the office or shop.",
					type: 'boolean',
				},
			},
		},
		nameReadable: 'statusFlags',
		nameCamel: 'statusFlags',
		namePascal: 'StatusFlags',
		isNested: true,
		destinationDir: '#spruce/schemas',
	},
	{
		id: 'permission',
		namespace: 'Spruce',
		schema: {
			version: 'v2020_09_01',
			id: 'permission',
			fields: {
				name: {
					type: 'text',
					label: 'Permission name',
					isRequired: true,
					hint:
						'Hyphen separated name for this permission, e.g. can-unlock-doors',
				},
				requireAllStatuses: {
					type: 'boolean',
					label: 'Require all statuses',
					defaultValue: false,
				},
				defaultsByRoleBase: {
					type: 'schema',
					options: {
						schemaIds: [{ id: 'defaultsByRole', version: 'v2020_09_01' }],
					},
				},
				can: {
					type: 'schema',
					options: {
						schemaIds: [{ id: 'statusFlags', version: 'v2020_09_01' }],
					},
				},
			},
			name: 'Permission',
		},
		nameReadable: 'Permission',
		nameCamel: 'permission',
		namePascal: 'Permission',
		isNested: true,
		destinationDir: '#spruce/schemas',
	},
	{
		id: 'eventSignature',
		namespace: 'Spruce',
		schema: {
			version: 'v2020_09_01',
			id: 'eventSignature',
			name: 'Event Signature',
			description: '',
			fields: {
				eventNameWithOptionalNamespace: { type: 'text', isRequired: true },
				responsePayload: {
					type: 'raw',
					options: { valueType: 'SpruceSchema.ISchema' },
				},
				emitPayload: {
					type: 'raw',
					options: { valueType: 'SpruceSchema.ISchema' },
				},
				listenPermissions: {
					type: 'schema',
					isArray: true,
					options: {
						schemaIds: [{ version: 'v2020_09_01', id: 'permission' }],
					},
				},
				emitPermissions: {
					type: 'schema',
					isArray: true,
					options: {
						schemaIds: [{ version: 'v2020_09_01', id: 'permission' }],
					},
				},
			},
		},
		nameReadable: 'Event Signature',
		nameCamel: 'eventSignature',
		namePascal: 'EventSignature',
		isNested: true,
		destinationDir: '#spruce/schemas',
	},
	{
		id: 'mercuryContract',
		namespace: 'Spruce',
		schema: {
			id: 'mercuryContract',
			name: 'Mercury Contract',
			description: '',
			fields: {
				eventSignatures: {
					type: 'schema',
					isRequired: true,
					isArray: true,
					options: {
						schemaIds: [{ id: 'eventSignature', version: 'v2020_09_01' }],
					},
				},
			},
			version: 'v2020_09_01',
		},
		nameReadable: 'Mercury Contract',
		nameCamel: 'mercuryContract',
		namePascal: 'MercuryContract',
		isNested: false,
		destinationDir: '#spruce/schemas',
	},
	{
		id: 'permissionContract',
		namespace: 'Spruce',
		schema: {
			id: 'permissionContract',
			name: 'Permission Contract',
			description: '',
			fields: {
				requireAllPermissions: { type: 'boolean', defaultValue: false },
				permissions: {
					type: 'schema',
					isRequired: true,
					isArray: true,
					options: {
						schemaIds: [{ id: 'permission', version: 'v2020_09_01' }],
					},
				},
			},
			version: 'v2020_09_01',
		},
		nameReadable: 'Permission Contract',
		nameCamel: 'permissionContract',
		namePascal: 'PermissionContract',
		isNested: false,
		destinationDir: '#spruce/schemas',
	},
]

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
		'handles recursion (by looking through nested schemas and their dependencies before self)',
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
	@test(
		'handles many layers of nested schemas',
		[schemaWithManyNestedSchemas],
		[
			lastLayerTemplateItem,
			secondLayerTemplateItem,
			firstLayerTemplateItem,
			manyNestedTemplateItem,
		]
	)
	@test('can import mercury contracts', mercurySchemas, mercuryTemplateItems)
	protected static async generationTests(
		schemas: ISchema[],
		expected: ISchemaTemplateItem[]
	) {
		const results = this.itemBuilder.generateTemplateItems(
			{ [CORE_NAMESPACE]: schemas },
			'#spruce/schemas'
		)

		assert.isEqual(results.length, expected.length)

		expected.forEach((expected, idx) => {
			const match = results[idx]

			assert.isTruthy(match, `Did not find a template item for ${expected.id}`)
			assert.isEqualDeep(match, expected)
		})
	}

	@test()
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
