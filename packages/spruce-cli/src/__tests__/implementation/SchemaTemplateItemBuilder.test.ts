import { ISchemaDefinition, ISchemaTemplateItem } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE } from '../../constants'
import SchemaTemplateItemBuilder from '../../templateItemBuilders/SchemaTemplateItemBuilder'

export default class SchemaTemplateItemBuilderTest extends AbstractSchemaTest {
	private static itemBuilder: SchemaTemplateItemBuilder

	private static cowbellV1: ISchemaDefinition = {
		id: 'cowbell',
		version: '2020_06_01',
		name: 'Cowbell test',
		fields: {
			radius: {
				type: FieldType.Number
			}
		}
	}

	private static cowbellV1TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.cowbellV1.id,
		nameCamel: 'cowbell',
		namePascal: 'Cowbell',
		nameReadable: 'Cowbell test',
		definition: SchemaTemplateItemBuilderTest.cowbellV1
	}

	private static cowbellV2: ISchemaDefinition = {
		id: 'cowbell',
		version: '2020_06_02',
		name: 'Cowbell test two!',
		fields: {
			radius: {
				type: FieldType.Number
			},
			owner: {
				type: FieldType.Schema,
				options: {
					schemaId: { id: 'person', version: '2020_06_03' }
				}
			}
		}
	}

	private static cowbellV2TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.cowbellV2.id,
		nameCamel: 'cowbell',
		namePascal: 'Cowbell',
		nameReadable: 'Cowbell test two!',
		definition: {
			id: 'cowbell',
			version: '2020_06_02',
			name: 'Cowbell test two!',
			fields: {
				radius: {
					type: FieldType.Number
				},
				owner: {
					type: FieldType.Schema,
					options: {
						schemaIds: [{ id: 'person', version: '2020_06_03' }]
					}
				}
			}
		}
	}

	private static personV1: ISchemaDefinition = {
		id: 'person',
		version: '2020_06_01',
		name: 'Person test',
		fields: {
			name: {
				type: FieldType.Text
			}
		}
	}

	private static personV1TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.personV1.id,
		nameCamel: 'person',
		namePascal: 'Person',
		nameReadable: 'Person test',
		definition: SchemaTemplateItemBuilderTest.personV1
	}

	private static personV2: ISchemaDefinition = {
		id: 'person',
		version: '2020_06_01',
		name: 'Person version 2',
		fields: {
			name: {
				type: FieldType.Text
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
								type: FieldType.Text
							}
						}
					}
				}
			}
		}
	}

	private static personV2TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.personV1.id,
		nameCamel: 'person',
		namePascal: 'Person',
		nameReadable: 'Person version 2',
		definition: {
			id: 'person',
			version: '2020_06_01',
			name: 'Person version 2',
			fields: {
				name: {
					type: FieldType.Text
				},
				favoriteVehicle: {
					type: FieldType.Schema,
					options: {
						schemaIds: [{ id: 'vehicle', version: '2020_06_01' }]
					}
				}
			}
		}
	}

	private static personV3: ISchemaDefinition = {
		id: 'person',
		version: '2020_06_03',
		name: 'Person test the 3rd',
		fields: {
			relatedField: {
				type: FieldType.Schema,
				options: {
					schemas: [
						SchemaTemplateItemBuilderTest.cowbellV1,
						SchemaTemplateItemBuilderTest.cowbellV2
					]
				}
			}
		}
	}

	private static personV3TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.personV3.id,
		nameCamel: 'person',
		namePascal: 'Person',
		nameReadable: 'Person test the 3rd',
		definition: {
			id: 'person',
			version: '2020_06_03',
			name: 'Person test the 3rd',
			fields: {
				relatedField: {
					type: FieldType.Schema,
					options: {
						schemaIds: [
							{ id: 'cowbell', version: '2020_06_01' },
							{ id: 'cowbell', version: '2020_06_02' }
						]
					}
				}
			}
		}
	}

	private static vehicleV1TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: 'vehicle',
		nameCamel: 'vehicle',
		namePascal: 'Vehicle',
		nameReadable: 'Vehicle v1',
		definition: {
			id: 'vehicle',
			name: 'Vehicle v1',
			version: '2020_06_01',
			fields: {
				make: {
					type: FieldType.Text
				}
			}
		}
	}

	private static personV4: ISchemaDefinition = {
		id: 'person',
		version: '2020_06_04',
		name: 'Person test the last',
		fields: {
			cowbells: {
				type: FieldType.Schema,
				options: {
					schemaIds: [
						{ id: 'cowbell', version: '2020_06_01' },
						{ id: 'cowbell', version: '2020_06_02' }
					]
				}
			}
		}
	}

	private static personV4TemplateItem: ISchemaTemplateItem = {
		namespace: CORE_NAMESPACE,
		id: SchemaTemplateItemBuilderTest.personV4.id,
		nameCamel: 'person',
		namePascal: 'Person',
		nameReadable: 'Person test the last',
		definition: SchemaTemplateItemBuilderTest.personV4
	}

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
			this.personV1
		])
		const actual = results[0]

		assert.deepEqual(actual, this.personV1TemplateItem)
	}

	@test(
		'turns 2 definitions into 2 template items',
		[
			SchemaTemplateItemBuilderTest.cowbellV1,
			SchemaTemplateItemBuilderTest.personV1
		],
		[
			SchemaTemplateItemBuilderTest.cowbellV1TemplateItem,
			SchemaTemplateItemBuilderTest.personV1TemplateItem
		]
	)
	@test(
		'turns one nested definition into 2 items',
		[SchemaTemplateItemBuilderTest.personV2],
		[
			SchemaTemplateItemBuilderTest.vehicleV1TemplateItem,
			SchemaTemplateItemBuilderTest.personV2TemplateItem
		]
	)
	@test(
		'handles recursion',
		[SchemaTemplateItemBuilderTest.personV3],
		[
			SchemaTemplateItemBuilderTest.cowbellV1TemplateItem,
			SchemaTemplateItemBuilderTest.cowbellV2TemplateItem,
			SchemaTemplateItemBuilderTest.personV3TemplateItem
		]
	)
	@test(
		'handles duplication',
		[
			SchemaTemplateItemBuilderTest.cowbellV1,
			SchemaTemplateItemBuilderTest.cowbellV1,
			SchemaTemplateItemBuilderTest.cowbellV1
		],
		[SchemaTemplateItemBuilderTest.cowbellV1TemplateItem]
	)
	@test(
		'handles resolving by id and version',
		[
			SchemaTemplateItemBuilderTest.personV4,
			SchemaTemplateItemBuilderTest.personV3,
			SchemaTemplateItemBuilderTest.cowbellV1,
			SchemaTemplateItemBuilderTest.cowbellV2
		],
		[
			SchemaTemplateItemBuilderTest.cowbellV1TemplateItem,
			SchemaTemplateItemBuilderTest.cowbellV2TemplateItem,
			SchemaTemplateItemBuilderTest.personV4TemplateItem,
			SchemaTemplateItemBuilderTest.personV3TemplateItem
		]
	)
	protected static async generationTests(
		definitions: ISchemaDefinition[],
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
			assert.deepEqual(match, expected)
		})
	}

	// definitions for reference
	// 	private static async loadTestDefinitions(): Promise<ISchemaDefinition[]> {
	// 		const defs = [
	// 			{
	// 				id: 'acl',
	// 				name: 'Access control list lookup table',
	// 				dynamicKeySignature: {
	// 					type: 'text',
	// 					isArray: true,
	// 					label: 'Permissions grouped by slug',
	// 					key: 'slug'
	// 				}
	// 			},
	// 			{
	// 				id: 'job',
	// 				name: 'Job',
	// 				description:
	// 					'A position at a company. The answer to the question; What is your job?',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id' },
	// 					isDefault: {
	// 						label: 'Is default',
	// 						hint:
	// 							'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).',
	// 						type: 'text',
	// 						isRequired: true
	// 					},
	// 					name: { label: 'Name', type: 'text', isRequired: true },
	// 					role: {
	// 						label: 'Role',
	// 						type: 'select',
	// 						isRequired: true,
	// 						options: {
	// 							choices: [
	// 								{ value: 'owner', label: 'Owner' },
	// 								{ value: 'groupManager', label: 'District/region manager' },
	// 								{ value: 'manager', label: 'Store manager' },
	// 								{ value: 'teammate', label: 'Teammate' },
	// 								{ value: 'guest', label: 'Guest' }
	// 							]
	// 						}
	// 					},
	// 					inStoreAcls: {
	// 						label: 'On work permissions',
	// 						type: 'schema',
	// 						options: { schemaId: { id: 'acl' } }
	// 					},
	// 					acls: {
	// 						label: 'Off work permissions',
	// 						type: 'schema',
	// 						options: { schemaId: { id: 'acl' } }
	// 					}
	// 				}
	// 			},
	// 			{
	// 				id: 'job',
	// 				name: 'Job',
	// 				description:
	// 					'A position at a company. The answer to the question; What is your job?',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id' },
	// 					isDefault: {
	// 						label: 'Is default',
	// 						hint:
	// 							'Is this job one that comes with every org? Mapped to roles (owner, groupManager, manager, guest).',
	// 						type: 'text',
	// 						isRequired: true
	// 					},
	// 					name: { label: 'Name', type: 'text', isRequired: true },
	// 					role: {
	// 						label: 'Role',
	// 						type: 'select',
	// 						isRequired: true,
	// 						options: {
	// 							choices: [
	// 								{ value: 'owner', label: 'Owner' },
	// 								{ value: 'groupManager', label: 'District/region manager' },
	// 								{ value: 'manager', label: 'Store manager' },
	// 								{ value: 'teammate', label: 'Teammate' },
	// 								{ value: 'guest', label: 'Guest' }
	// 							]
	// 						}
	// 					},
	// 					inStoreAcls: {
	// 						label: 'On work permissions',
	// 						type: 'schema',
	// 						options: {
	// 							schema: {
	// 								id: 'acl',
	// 								name: 'Access control list lookup table',
	// 								dynamicKeySignature: {
	// 									type: 'text',
	// 									isArray: true,
	// 									label: 'Permissions grouped by slug',
	// 									key: 'slug'
	// 								}
	// 							}
	// 						}
	// 					},
	// 					acls: {
	// 						label: 'Off work permissions',
	// 						type: 'schema',
	// 						options: {
	// 							schema: {
	// 								id: 'acl',
	// 								name: 'Access control list lookup table',
	// 								dynamicKeySignature: {
	// 									type: 'text',
	// 									isArray: true,
	// 									label: 'Permissions grouped by slug',
	// 									key: 'slug'
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			},
	// 			{
	// 				id: 'location',
	// 				name: 'Location',
	// 				description:
	// 					'A physical location where people meet. An organization has at least one of them.',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id' },
	// 					name: { label: 'Name', type: 'text', isRequired: true },
	// 					num: {
	// 						label: 'Store number',
	// 						type: 'text',
	// 						hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5'
	// 					},
	// 					isPublic: {
	// 						label: 'Public',
	// 						type: 'boolean',
	// 						hint: 'Is this location viewable by guests?',
	// 						defaultValue: false
	// 					},
	// 					phone: { label: 'Main Phone', type: 'phone' },
	// 					timezone: {
	// 						label: 'Timezone',
	// 						type: 'select',
	// 						options: {
	// 							choices: [
	// 								{ value: 'etc/gmt+12', label: 'International Date Line West' },
	// 								{ value: 'pacific/midway', label: 'Midway Island, Samoa' },
	// 								{ value: 'pacific/honolulu', label: 'Hawaii' },
	// 								{ value: 'us/alaska', label: 'Alaska' },
	// 								{
	// 									value: 'america/los_Angeles',
	// 									label: 'Pacific Time (US & Canada)'
	// 								},
	// 								{ value: 'america/tijuana', label: 'Tijuana, Baja California' },
	// 								{ value: 'us/arizona', label: 'Arizona' },
	// 								{
	// 									value: 'america/chihuahua',
	// 									label: 'Chihuahua, La Paz, Mazatlan'
	// 								},
	// 								{ value: 'us/mountain', label: 'Mountain Time (US & Canada)' },
	// 								{ value: 'america/managua', label: 'Central America' },
	// 								{ value: 'us/central', label: 'Central Time (US & Canada)' },
	// 								{
	// 									value: 'america/mexico_City',
	// 									label: 'Guadalajara, Mexico City, Monterrey'
	// 								},
	// 								{ value: 'Canada/Saskatchewan', label: 'Saskatchewan' },
	// 								{
	// 									value: 'america/bogota',
	// 									label: 'Bogota, Lima, Quito, Rio Branco'
	// 								},
	// 								{ value: 'us/eastern', label: 'Eastern Time (US & Canada)' },
	// 								{ value: 'us/east-indiana', label: 'Indiana (East)' },
	// 								{ value: 'Canada/atlantic', label: 'Atlantic Time (Canada)' },
	// 								{ value: 'america/caracas', label: 'Caracas, La Paz' },
	// 								{ value: 'america/manaus', label: 'Manaus' },
	// 								{ value: 'america/Santiago', label: 'Santiago' },
	// 								{ value: 'Canada/Newfoundland', label: 'Newfoundland' },
	// 								{ value: 'america/Sao_Paulo', label: 'Brasilia' },
	// 								{
	// 									value: 'america/argentina/buenos_Aires',
	// 									label: 'Buenos Aires, Georgetown'
	// 								},
	// 								{ value: 'america/godthab', label: 'Greenland' },
	// 								{ value: 'america/montevideo', label: 'Montevideo' },
	// 								{ value: 'america/Noronha', label: 'Mid-Atlantic' },
	// 								{ value: 'atlantic/cape_Verde', label: 'Cape Verde Is.' },
	// 								{ value: 'atlantic/azores', label: 'Azores' },
	// 								{
	// 									value: 'africa/casablanca',
	// 									label: 'Casablanca, Monrovia, Reykjavik'
	// 								},
	// 								{
	// 									value: 'etc/gmt',
	// 									label:
	// 										'Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London'
	// 								},
	// 								{
	// 									value: 'europe/amsterdam',
	// 									label: 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
	// 								},
	// 								{
	// 									value: 'europe/belgrade',
	// 									label: 'Belgrade, Bratislava, Budapest, Ljubljana, Prague'
	// 								},
	// 								{
	// 									value: 'europe/brussels',
	// 									label: 'Brussels, Copenhagen, Madrid, Paris'
	// 								},
	// 								{
	// 									value: 'europe/Sarajevo',
	// 									label: 'Sarajevo, Skopje, Warsaw, Zagreb'
	// 								},
	// 								{ value: 'africa/lagos', label: 'West Central Africa' },
	// 								{ value: 'asia/amman', label: 'Amman' },
	// 								{
	// 									value: 'europe/athens',
	// 									label: 'Athens, Bucharest, Istanbul'
	// 								},
	// 								{ value: 'asia/beirut', label: 'Beirut' },
	// 								{ value: 'africa/cairo', label: 'Cairo' },
	// 								{ value: 'africa/Harare', label: 'Harare, Pretoria' },
	// 								{
	// 									value: 'europe/Helsinki',
	// 									label: 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'
	// 								},
	// 								{ value: 'asia/Jerusalem', label: 'Jerusalem' },
	// 								{ value: 'europe/minsk', label: 'Minsk' },
	// 								{ value: 'africa/Windhoek', label: 'Windhoek' },
	// 								{ value: 'asia/Kuwait', label: 'Kuwait, Riyadh, Baghdad' },
	// 								{
	// 									value: 'europe/moscow',
	// 									label: 'Moscow, St. Petersburg, Volgograd'
	// 								},
	// 								{ value: 'africa/Nairobi', label: 'Nairobi' },
	// 								{ value: 'asia/tbilisi', label: 'Tbilisi' },
	// 								{ value: 'asia/tehran', label: 'Tehran' },
	// 								{ value: 'asia/muscat', label: 'Abu Dhabi, Muscat' },
	// 								{ value: 'asia/baku', label: 'Baku' },
	// 								{ value: 'asia/Yerevan', label: 'Yerevan' },
	// 								{ value: 'asia/Kabul', label: 'Kabul' },
	// 								{ value: 'asia/Yekaterinburg', label: 'Yekaterinburg' },
	// 								{
	// 									value: 'asia/Karachi',
	// 									label: 'Islamabad, Karachi, Tashkent'
	// 								},
	// 								{
	// 									value: 'asia/calcutta',
	// 									label: 'Chennai, Kolkata, Mumbai, New Delhi'
	// 								},
	// 								{ value: 'asia/calcutta', label: 'Sri Jayawardenapura' },
	// 								{ value: 'asia/Katmandu', label: 'Kathmandu' },
	// 								{ value: 'asia/almaty', label: 'Almaty, Novosibirsk' },
	// 								{ value: 'asia/Dhaka', label: 'Astana, Dhaka' },
	// 								{ value: 'asia/Rangoon', label: 'Yangon (Rangoon)' },
	// 								{ value: 'asia/bangkok', label: 'Bangkok, Hanoi, Jakarta' },
	// 								{ value: 'asia/Krasnoyarsk', label: 'Krasnoyarsk' },
	// 								{
	// 									value: 'asia/Hong_Kong',
	// 									label: 'Beijing, Chongqing, Hong Kong, Urumqi'
	// 								},
	// 								{
	// 									value: 'asia/Kuala_Lumpur',
	// 									label: 'Kuala Lumpur, Singapore'
	// 								},
	// 								{ value: 'asia/Irkutsk', label: 'Irkutsk, Ulaan Bataar' },
	// 								{ value: 'Australia/Perth', label: 'Perth' },
	// 								{ value: 'asia/taipei', label: 'Taipei' },
	// 								{ value: 'asia/tokyo', label: 'Osaka, Sapporo, Tokyo' },
	// 								{ value: 'asia/Seoul', label: 'Seoul' },
	// 								{ value: 'asia/Yakutsk', label: 'Yakutsk' },
	// 								{ value: 'Australia/adelaide', label: 'Adelaide' },
	// 								{ value: 'Australia/Darwin', label: 'Darwin' },
	// 								{ value: 'Australia/brisbane', label: 'Brisbane' },
	// 								{
	// 									value: 'Australia/canberra',
	// 									label: 'Canberra, Melbourne, Sydney'
	// 								},
	// 								{ value: 'Australia/Hobart', label: 'Hobart' },
	// 								{ value: 'pacific/guam', label: 'Guam, Port Moresby' },
	// 								{ value: 'asia/Vladivostok', label: 'Vladivostok' },
	// 								{
	// 									value: 'asia/magadan',
	// 									label: 'Magadan, Solomon Is., New Caledonia'
	// 								},
	// 								{ value: 'pacific/auckland', label: 'Auckland, Wellington' },
	// 								{
	// 									value: 'pacific/Fiji',
	// 									label: 'Fiji, Kamchatka, Marshall Is.'
	// 								},
	// 								{ value: 'pacific/tongatapu', label: "Nuku'alofa" }
	// 							]
	// 						}
	// 					},
	// 					address: { label: 'Address', type: 'address', isRequired: true }
	// 				}
	// 			},
	// 			{
	// 				id: 'organization',
	// 				name: 'Organization',
	// 				description:
	// 					'A company or team. Comprises of many people and locations.',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id' },
	// 					name: { label: 'Name', type: 'text', isRequired: true },
	// 					slug: { label: 'Slug', type: 'text', isRequired: true }
	// 				}
	// 			},
	// 			{
	// 				id: 'role',
	// 				name: 'Role',
	// 				description: 'All people in Spruce fall into 5 roles.',
	// 				fields: {
	// 					slug: { label: 'Slug', type: 'text', isRequired: true },
	// 					name: { label: 'Name', type: 'text', isRequired: true }
	// 				}
	// 			},
	// 			{
	// 				id: 'skill',
	// 				name: 'Skill',
	// 				description: 'An ability Sprucebot has learned.',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id', isRequired: true },
	// 					apiKey: {
	// 						label: 'Id',
	// 						isPrivate: true,
	// 						type: 'id',
	// 						isRequired: true
	// 					},
	// 					name: { label: 'Name', type: 'text', isRequired: true },
	// 					description: {
	// 						label: 'Description',
	// 						type: 'text',
	// 						isRequired: false
	// 					},
	// 					slug: { label: 'Slug', type: 'text', isRequired: false },
	// 					icon: { label: 'Icon', type: 'text', isRequired: false }
	// 				}
	// 			},
	// 			{
	// 				id: 'user',
	// 				name: 'User',
	// 				description: 'A human being.',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id', isRequired: true },
	// 					firstName: { label: 'First name', type: 'text', isRequired: false },
	// 					lastName: { label: 'Last name', type: 'text', isRequired: false },
	// 					casualName: {
	// 						label: 'Casual name',
	// 						type: 'text',
	// 						hint: 'Generated name that defaults to Friend!',
	// 						isRequired: true
	// 					},
	// 					phoneNumber: {
	// 						label: 'Phone',
	// 						type: 'phone',
	// 						hint: "The person's phone number!"
	// 					},
	// 					profileImages: {
	// 						label: 'Profile photos',
	// 						type: 'schema',
	// 						options: {
	// 							schema: {
	// 								id: 'profileImage',
	// 								name: 'Profile Image Sizes',
	// 								description:
	// 									'Profile images at various helpful sizes and resolutions.',
	// 								fields: {
	// 									profile60: { label: '60x60', type: 'text', isRequired: true },
	// 									profile150: {
	// 										label: '150x150',
	// 										type: 'text',
	// 										isRequired: true
	// 									},
	// 									'profile60@2x': {
	// 										label: '60x60',
	// 										type: 'text',
	// 										isRequired: true
	// 									},
	// 									'profile150@2x': {
	// 										label: '150x150',
	// 										type: 'text',
	// 										isRequired: true
	// 									}
	// 								}
	// 							}
	// 						}
	// 					},
	// 					defaultProfileImages: {
	// 						label: 'Default profile photos',
	// 						type: 'schema',
	// 						isRequired: true,
	// 						options: {
	// 							schema: {
	// 								id: 'profileImage',
	// 								name: 'Profile Image Sizes',
	// 								description:
	// 									'Profile images at various helpful sizes and resolutions.',
	// 								fields: {
	// 									profile60: { label: '60x60', type: 'text', isRequired: true },
	// 									profile150: {
	// 										label: '150x150',
	// 										type: 'text',
	// 										isRequired: true
	// 									},
	// 									'profile60@2x': {
	// 										label: '60x60',
	// 										type: 'text',
	// 										isRequired: true
	// 									},
	// 									'profile150@2x': {
	// 										label: '150x150',
	// 										type: 'text',
	// 										isRequired: true
	// 									}
	// 								}
	// 							}
	// 						}
	// 					}
	// 				}
	// 			},
	// 			{
	// 				id: 'userLocation',
	// 				name: 'User location',
	// 				description: 'A location a person has given access to themselves.',
	// 				fields: {
	// 					id: { label: 'Id', type: 'id' },
	// 					role: {
	// 						label: 'Name',
	// 						type: 'select',
	// 						isRequired: true,
	// 						options: {
	// 							choices: [
	// 								{ value: 'owner', label: 'Owner' },
	// 								{ value: 'groupManager', label: 'District/region manager' },
	// 								{ value: 'manager', label: 'Store manager' },
	// 								{ value: 'teammate', label: 'Teammate' },
	// 								{ value: 'guest', label: 'Guest' }
	// 							]
	// 						}
	// 					},
	// 					status: { label: 'Status', type: 'text' },
	// 					visits: {
	// 						label: 'Total visits',
	// 						type: 'number',
	// 						isRequired: true,
	// 						options: {
	// 							choices: [
	// 								{ value: 'owner', label: 'Owner' },
	// 								{ value: 'groupManager', label: 'District/region manager' },
	// 								{ value: 'manager', label: 'Store manager' },
	// 								{ value: 'teammate', label: 'Teammate' },
	// 								{ value: 'guest', label: 'Guest' }
	// 							]
	// 						}
	// 					},
	// 					lastRecordedVisit: { label: 'Last visit', type: 'dateTime' },
	// 					job: {
	// 						label: 'Job',
	// 						type: 'schema',
	// 						isRequired: true,
	// 						options: { schemaId: { id: 'job' } }
	// 					},
	// 					location: {
	// 						label: 'Location',
	// 						type: 'schema',
	// 						isRequired: true,
	// 						options: { schemaId: { id: 'location' } }
	// 					},
	// 					user: {
	// 						label: 'User',
	// 						type: 'schema',
	// 						isRequired: true,
	// 						options: { schemaId: { id: 'user' } }
	// 					}
	// 				}
	// 			}
	// 		]
	// 		const root = pathUtil.join(__dirname, '..', '..')
	// 		const definitionFiles = await globby(
	// 			pathUtil.join(root, 'temporary', 'schemas', '*.definition.ts')
	// 		)

	// 		const importService = new ImportService(root)
	// 		const definitions = await Promise.all(
	// 			definitionFiles.map(file =>
	// 				importService.importDefault<ISchemaDefinition>(file)
	// 			)
	// 		)

	// 		return definitions
	// 	}
}
