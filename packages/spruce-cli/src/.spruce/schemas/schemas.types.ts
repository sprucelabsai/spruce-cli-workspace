/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import '@sprucelabs/mercury-types'
import '@sprucelabs/mercury-types'
import { BaseWidget } from '#spruce/../widgets/types/widgets.types'

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {














	namespace SpruceSchemas.MercuryApi {

		
		interface AuthenticateEmitPayload {
			
				
				'token'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'apiKey'?: string| undefined | null
		}

		interface AuthenticateEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'token': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'skillId': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'apiKey': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type AuthenticateEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.AuthenticateEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface AuthenticateTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.AuthenticateEmitPayload
		}

		interface AuthenticateTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.AuthenticateEmitPayloadSchema,}
			            },
			    }
		}

		type AuthenticateTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.AuthenticateTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface AuthSchema {
			
				
				'person'?: SpruceSchemas.Spruce.v2020_07_22.Person| undefined | null
				
				'skill'?: SpruceSchemas.Spruce.v2020_07_22.Skill| undefined | null
		}

		interface AuthSchemaSchema extends SpruceSchema.Schema {
			id: 'authSchema',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'person': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.PersonSchema,}
			            },
			            /** . */
			            'skill': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.SkillSchema,}
			            },
			    }
		}

		type AuthSchemaEntity = SchemaEntity<SpruceSchemas.MercuryApi.AuthSchemaSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface AuthenticateResponsePayload {
			
				
				'type': ("authenticated" | "anonymous")
				
				'auth': SpruceSchemas.MercuryApi.AuthSchema
		}

		interface AuthenticateResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'type': {
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"authenticated","label":"Authenticated"},{"value":"anonymous","label":"Anonymous"}],}
			            },
			            /** . */
			            'auth': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.AuthSchemaSchema,}
			            },
			    }
		}

		type AuthenticateResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.AuthenticateResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CanListenEmitPayload {
			
				
				'authorizerStatuses'?: ("clockedIn" | "clockedOut" | "onPrem" | "offPrem")| undefined | null
				
				'fullyQualifiedEventName': string
		}

		interface CanListenEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'canListenEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'authorizerStatuses': {
			                type: 'select',
			                options: {choices: [{"label":"Clocked in","value":"clockedIn"},{"label":"Clocked out","value":"clockedOut"},{"label":"On premise","value":"onPrem"},{"label":"Off premise","value":"offPrem"}],}
			            },
			            /** . */
			            'fullyQualifiedEventName': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type CanListenEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CanListenEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CanListenTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.CanListenEmitPayload
		}

		interface CanListenTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'canListenTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.CanListenEmitPayloadSchema,}
			            },
			    }
		}

		type CanListenTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CanListenTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CanListenResponsePayload {
			
				
				'can'?: boolean| undefined | null
		}

		interface CanListenResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'canListenResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'can': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type CanListenResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CanListenResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ConfirmPinEmitPayload {
			
				
				'challenge': string
				
				'pin': string
		}

		interface ConfirmPinEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'challenge': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'pin': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type ConfirmPinEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ConfirmPinEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ConfirmPinTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.ConfirmPinEmitPayload
		}

		interface ConfirmPinTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.ConfirmPinEmitPayloadSchema,}
			            },
			    }
		}

		type ConfirmPinTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ConfirmPinTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ConfirmPinRespondPayload {
			
				
				'person': SpruceSchemas.Spruce.v2020_07_22.Person
				
				'token': string
		}

		interface ConfirmPinRespondPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinRespondPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'person': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.PersonSchema,}
			            },
			            /** . */
			            'token': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type ConfirmPinRespondPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ConfirmPinRespondPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateLocationEmitPayload {
			
				/** Name. */
				'name': string
				/** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
				'num'?: string| undefined | null
				/** Public. Is this location viewable by guests? */
				'isPublic'?: boolean| undefined | null
				/** Main Phone. */
				'phone'?: string| undefined | null
				/** Timezone. */
				'timezone'?: ("etc/gmt+12" | "pacific/midway" | "pacific/honolulu" | "us/alaska" | "america/los_Angeles" | "america/tijuana" | "us/arizona" | "america/chihuahua" | "us/mountain" | "america/managua" | "us/central" | "america/mexico_City" | "Canada/Saskatchewan" | "america/bogota" | "us/eastern" | "us/east-indiana" | "Canada/atlantic" | "america/caracas" | "america/manaus" | "america/Santiago" | "Canada/Newfoundland" | "america/Sao_Paulo" | "america/argentina/buenos_Aires" | "america/godthab" | "america/montevideo" | "america/Noronha" | "atlantic/cape_Verde" | "atlantic/azores" | "africa/casablanca" | "etc/gmt" | "europe/amsterdam" | "europe/belgrade" | "europe/brussels" | "europe/Sarajevo" | "africa/lagos" | "asia/amman" | "europe/athens" | "asia/beirut" | "africa/cairo" | "africa/Harare" | "europe/Helsinki" | "asia/Jerusalem" | "europe/minsk" | "africa/Windhoek" | "asia/Kuwait" | "europe/moscow" | "africa/Nairobi" | "asia/tbilisi" | "asia/tehran" | "asia/muscat" | "asia/baku" | "asia/Yerevan" | "asia/Kabul" | "asia/Yekaterinburg" | "asia/Karachi" | "asia/calcutta" | "asia/calcutta" | "asia/Katmandu" | "asia/almaty" | "asia/Dhaka" | "asia/Rangoon" | "asia/bangkok" | "asia/Krasnoyarsk" | "asia/Hong_Kong" | "asia/Kuala_Lumpur" | "asia/Irkutsk" | "Australia/Perth" | "asia/taipei" | "asia/tokyo" | "asia/Seoul" | "asia/Yakutsk" | "Australia/adelaide" | "Australia/Darwin" | "Australia/brisbane" | "Australia/canberra" | "Australia/Hobart" | "pacific/guam" | "asia/Vladivostok" | "asia/magadan" | "pacific/auckland" | "pacific/Fiji" | "pacific/tongatapu")| undefined | null
				/** Address. */
				'address': SpruceSchema.AddressFieldValue
				
				'dateDeleted'?: number| undefined | null
				
				'slug'?: string| undefined | null
		}

		interface CreateLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'createLocationEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
			            'num': {
			                label: 'Store number',
			                type: 'text',
			                hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5',
			                options: undefined
			            },
			            /** Public. Is this location viewable by guests? */
			            'isPublic': {
			                label: 'Public',
			                type: 'boolean',
			                hint: 'Is this location viewable by guests?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Main Phone. */
			            'phone': {
			                label: 'Main Phone',
			                type: 'phone',
			                options: undefined
			            },
			            /** Timezone. */
			            'timezone': {
			                label: 'Timezone',
			                type: 'select',
			                options: {choices: [{"value":"etc/gmt+12","label":"International Date Line West"},{"value":"pacific/midway","label":"Midway Island, Samoa"},{"value":"pacific/honolulu","label":"Hawaii"},{"value":"us/alaska","label":"Alaska"},{"value":"america/los_Angeles","label":"Pacific Time (US & Canada)"},{"value":"america/tijuana","label":"Tijuana, Baja California"},{"value":"us/arizona","label":"Arizona"},{"value":"america/chihuahua","label":"Chihuahua, La Paz, Mazatlan"},{"value":"us/mountain","label":"Mountain Time (US & Canada)"},{"value":"america/managua","label":"Central America"},{"value":"us/central","label":"Central Time (US & Canada)"},{"value":"america/mexico_City","label":"Guadalajara, Mexico City, Monterrey"},{"value":"Canada/Saskatchewan","label":"Saskatchewan"},{"value":"america/bogota","label":"Bogota, Lima, Quito, Rio Branco"},{"value":"us/eastern","label":"Eastern Time (US & Canada)"},{"value":"us/east-indiana","label":"Indiana (East)"},{"value":"Canada/atlantic","label":"Atlantic Time (Canada)"},{"value":"america/caracas","label":"Caracas, La Paz"},{"value":"america/manaus","label":"Manaus"},{"value":"america/Santiago","label":"Santiago"},{"value":"Canada/Newfoundland","label":"Newfoundland"},{"value":"america/Sao_Paulo","label":"Brasilia"},{"value":"america/argentina/buenos_Aires","label":"Buenos Aires, Georgetown"},{"value":"america/godthab","label":"Greenland"},{"value":"america/montevideo","label":"Montevideo"},{"value":"america/Noronha","label":"Mid-Atlantic"},{"value":"atlantic/cape_Verde","label":"Cape Verde Is."},{"value":"atlantic/azores","label":"Azores"},{"value":"africa/casablanca","label":"Casablanca, Monrovia, Reykjavik"},{"value":"etc/gmt","label":"Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},{"value":"europe/amsterdam","label":"Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},{"value":"europe/belgrade","label":"Belgrade, Bratislava, Budapest, Ljubljana, Prague"},{"value":"europe/brussels","label":"Brussels, Copenhagen, Madrid, Paris"},{"value":"europe/Sarajevo","label":"Sarajevo, Skopje, Warsaw, Zagreb"},{"value":"africa/lagos","label":"West Central Africa"},{"value":"asia/amman","label":"Amman"},{"value":"europe/athens","label":"Athens, Bucharest, Istanbul"},{"value":"asia/beirut","label":"Beirut"},{"value":"africa/cairo","label":"Cairo"},{"value":"africa/Harare","label":"Harare, Pretoria"},{"value":"europe/Helsinki","label":"Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"},{"value":"asia/Jerusalem","label":"Jerusalem"},{"value":"europe/minsk","label":"Minsk"},{"value":"africa/Windhoek","label":"Windhoek"},{"value":"asia/Kuwait","label":"Kuwait, Riyadh, Baghdad"},{"value":"europe/moscow","label":"Moscow, St. Petersburg, Volgograd"},{"value":"africa/Nairobi","label":"Nairobi"},{"value":"asia/tbilisi","label":"Tbilisi"},{"value":"asia/tehran","label":"Tehran"},{"value":"asia/muscat","label":"Abu Dhabi, Muscat"},{"value":"asia/baku","label":"Baku"},{"value":"asia/Yerevan","label":"Yerevan"},{"value":"asia/Kabul","label":"Kabul"},{"value":"asia/Yekaterinburg","label":"Yekaterinburg"},{"value":"asia/Karachi","label":"Islamabad, Karachi, Tashkent"},{"value":"asia/calcutta","label":"Chennai, Kolkata, Mumbai, New Delhi"},{"value":"asia/calcutta","label":"Sri Jayawardenapura"},{"value":"asia/Katmandu","label":"Kathmandu"},{"value":"asia/almaty","label":"Almaty, Novosibirsk"},{"value":"asia/Dhaka","label":"Astana, Dhaka"},{"value":"asia/Rangoon","label":"Yangon (Rangoon)"},{"value":"asia/bangkok","label":"Bangkok, Hanoi, Jakarta"},{"value":"asia/Krasnoyarsk","label":"Krasnoyarsk"},{"value":"asia/Hong_Kong","label":"Beijing, Chongqing, Hong Kong, Urumqi"},{"value":"asia/Kuala_Lumpur","label":"Kuala Lumpur, Singapore"},{"value":"asia/Irkutsk","label":"Irkutsk, Ulaan Bataar"},{"value":"Australia/Perth","label":"Perth"},{"value":"asia/taipei","label":"Taipei"},{"value":"asia/tokyo","label":"Osaka, Sapporo, Tokyo"},{"value":"asia/Seoul","label":"Seoul"},{"value":"asia/Yakutsk","label":"Yakutsk"},{"value":"Australia/adelaide","label":"Adelaide"},{"value":"Australia/Darwin","label":"Darwin"},{"value":"Australia/brisbane","label":"Brisbane"},{"value":"Australia/canberra","label":"Canberra, Melbourne, Sydney"},{"value":"Australia/Hobart","label":"Hobart"},{"value":"pacific/guam","label":"Guam, Port Moresby"},{"value":"asia/Vladivostok","label":"Vladivostok"},{"value":"asia/magadan","label":"Magadan, Solomon Is., New Caledonia"},{"value":"pacific/auckland","label":"Auckland, Wellington"},{"value":"pacific/Fiji","label":"Fiji, Kamchatka, Marshall Is."},{"value":"pacific/tongatapu","label":"Nuku'alofa"}],}
			            },
			            /** Address. */
			            'address': {
			                label: 'Address',
			                type: 'address',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'slug': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type CreateLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateLocationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.CreateLocationEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface CreateLocationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createLocationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.CreateLocationEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type CreateLocationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateLocationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteRoleTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.DeleteRoleEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface DeleteRoleTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.DeleteRoleEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type DeleteRoleTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteRoleTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface CreateLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createLocationResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'location': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.LocationSchema,}
			            },
			    }
		}

		type CreateLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateOrgEmitPayload {
			
				/** Name. */
				'name': string
				
				'slug'?: string| undefined | null
				
				'dateDeleted'?: number| undefined | null
		}

		interface CreateOrgEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'createOrgEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'slug': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			    }
		}

		type CreateOrgEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateOrgEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateOrganizationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.CreateOrgEmitPayload
		}

		interface CreateOrganizationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createOrganizationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.CreateOrgEmitPayloadSchema,}
			            },
			    }
		}

		type CreateOrganizationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateOrganizationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface CreateOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createOrgResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organization': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.OrganizationSchema,}
			            },
			    }
		}

		type CreateOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateRoleEmitPayload {
			
				/** Name. */
				'name': string
				/** Base. Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role. */
				'base'?: ("owner" | "groupManager" | "manager" | "teammate" | "guest" | "anonymous")| undefined | null
				/** Description. */
				'description'?: string| undefined | null
				
				'dateDeleted'?: number| undefined | null
				/** Public. Should I let people that are not part of this organization this role? */
				'isPublic'?: boolean| undefined | null
		}

		interface CreateRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'createRoleEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Base. Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role. */
			            'base': {
			                label: 'Base',
			                type: 'select',
			                hint: 'Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role.',
			                options: {choices: [{"label":"Owner","value":"owner"},{"label":"Group manager","value":"groupManager"},{"label":"Manager","value":"manager"},{"label":"Teammate","value":"teammate"},{"label":"Guest","value":"guest"},{"label":"Anonymous","value":"anonymous"}],}
			            },
			            /** Description. */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			            /** Public. Should I let people that are not part of this organization this role? */
			            'isPublic': {
			                label: 'Public',
			                type: 'boolean',
			                hint: 'Should I let people that are not part of this organization this role?',
			                options: undefined
			            },
			    }
		}

		type CreateRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateRoleTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.CreateRoleEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface CreateRoleTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createRoleTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.CreateRoleEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type CreateRoleTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateRoleTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface CreateRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface CreateRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createRoleResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'role': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.RoleSchema,}
			            },
			    }
		}

		type CreateRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.CreateRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteLocationEmitPayload {
			
				
				'id': string
		}

		interface DeleteLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type DeleteLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteLocationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.DeleteLocationEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface DeleteLocationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.DeleteLocationEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type DeleteLocationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteLocationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface DeleteLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'location': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.LocationSchema,}
			            },
			    }
		}

		type DeleteLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteOrganizationTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface DeleteOrganizationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteOrganizationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type DeleteOrganizationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteOrganizationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface DeleteOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteOrgResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organization': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.OrganizationSchema,}
			            },
			    }
		}

		type DeleteOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteRoleEmitPayload {
			
				
				'id': string
				
				'organizationId'?: string| undefined | null
		}

		interface DeleteRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'organizationId': {
			                type: 'id',
			                options: undefined
			            },
			    }
		}

		type DeleteRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface DeleteRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface DeleteRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'role': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.RoleSchema,}
			            },
			    }
		}

		type DeleteRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.DeleteRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetEventContractsResponsePayload {
			
				
				'contracts': SpruceSchemas.MercuryTypes.v2020_09_01.EventContract[]
		}

		interface GetEventContractsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getEventContractsResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'contracts': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.MercuryTypes.v2020_09_01.EventContractSchema,}
			            },
			    }
		}

		type GetEventContractsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetEventContractsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetLocationEmitPayload {
			
				
				'id': string
		}

		interface GetLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type GetLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetLocationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.GetLocationEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface GetLocationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.GetLocationEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type GetLocationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetLocationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface GetLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'location': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.LocationSchema,}
			            },
			    }
		}

		type GetLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetOrganizationEmitPayload {
			
				
				'id': string
		}

		interface GetOrganizationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getOrganizationEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type GetOrganizationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetOrganizationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetOrganizationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.GetOrganizationEmitPayload
		}

		interface GetOrganizationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getOrganizationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.GetOrganizationEmitPayloadSchema,}
			            },
			    }
		}

		type GetOrganizationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetOrganizationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface GetOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getOrgResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organization': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.OrganizationSchema,}
			            },
			    }
		}

		type GetOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetRoleEmitPayload {
			
				
				'id': string
		}

		interface GetRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type GetRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetRoleTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.GetRoleEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface GetRoleTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.GetRoleEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type GetRoleTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetRoleTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface GetRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'role': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.RoleSchema,}
			            },
			    }
		}

		type GetRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetSkillEmitPayload {
			
				
				'id': string
		}

		interface GetSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'id': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type GetSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetSkillTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.GetSkillEmitPayload
		}

		interface GetSkillTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.GetSkillEmitPayloadSchema,}
			            },
			    }
		}

		type GetSkillTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetSkillTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface GetSkillResponsePayload {
			
				
				'skill': SpruceSchemas.Spruce.v2020_07_22.Skill
		}

		interface GetSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skill': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.SkillSchema,}
			            },
			    }
		}

		type GetSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.GetSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface HealthCheckItem {
			
				
				'status'?: ("passed")| undefined | null
		}

		interface HealthCheckItemSchema extends SpruceSchema.Schema {
			id: 'healthCheckItem',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'status': {
			                type: 'select',
			                options: {choices: [{"value":"passed","label":"Passed"}],}
			            },
			    }
		}

		type HealthCheckItemEntity = SchemaEntity<SpruceSchemas.MercuryApi.HealthCheckItemSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface HealthResponsePayload {
			
				
				'skill'?: SpruceSchemas.MercuryApi.HealthCheckItem| undefined | null
				
				'mercury'?: SpruceSchemas.MercuryApi.HealthCheckItem| undefined | null
		}

		interface HealthResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'healthResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skill': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.MercuryApi.HealthCheckItemSchema,}
			            },
			            /** . */
			            'mercury': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.MercuryApi.HealthCheckItemSchema,}
			            },
			    }
		}

		type HealthResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.HealthResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface InstallSkillEmitPayload {
			
				
				'skillId': string
		}

		interface InstallSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skillId': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type InstallSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.InstallSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface InstallSkillTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.InstallSkillEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface InstallSkillTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.InstallSkillEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type InstallSkillTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.InstallSkillTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface InstallSkillResponsePayload {
			
		}

		interface InstallSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type InstallSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.InstallSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface IsSkillInstalledEmitPayload {
			
				
				'skillId': string
		}

		interface IsSkillInstalledEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skillId': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type IsSkillInstalledEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.IsSkillInstalledEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface IsSkillInstalledTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.IsSkillInstalledEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface IsSkillInstalledTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.IsSkillInstalledEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type IsSkillInstalledTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.IsSkillInstalledTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface IsSkillInstalledResponsePayload {
			
				
				'isInstalled'?: boolean| undefined | null
		}

		interface IsSkillInstalledResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'isInstalled': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type IsSkillInstalledResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.IsSkillInstalledResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {


		
		interface ListLocationsEmitPayload {
			
				
				'includePrivateLocations'?: boolean| undefined | null
		}

		interface ListLocationsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'includePrivateLocations': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type ListLocationsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListLocationsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListLocationsTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.ListLocationsEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface ListLocationsTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.ListLocationsEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type ListLocationsTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListLocationsTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListLocationsResponsePayload {
			
				
				'locations': SpruceSchemas.Spruce.v2020_07_22.Location[]
		}

		interface ListLocationsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'locations': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.LocationSchema,}
			            },
			    }
		}

		type ListLocationsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListLocationsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListOrgsEmitPayload {
			
				
				'showMineOnly'?: boolean| undefined | null
		}

		interface ListOrgsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listOrgsEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'showMineOnly': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type ListOrgsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListOrgsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListOrganizationsTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.ListOrgsEmitPayload
		}

		interface ListOrganizationsTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listOrganizationsTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.ListOrgsEmitPayloadSchema,}
			            },
			    }
		}

		type ListOrganizationsTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListOrganizationsTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListOrgsResponsePayload {
			
				
				'organizations': SpruceSchemas.Spruce.v2020_07_22.Organization[]
		}

		interface ListOrgsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listOrgsResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organizations': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.OrganizationSchema,}
			            },
			    }
		}

		type ListOrgsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListOrgsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListRolesEmitPayload {
			
				
				'includePrivateRoles'?: boolean| undefined | null
		}

		interface ListRolesEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'includePrivateRoles': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type ListRolesEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListRolesEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListRolesTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.ListRolesEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface ListRolesTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.ListRolesEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type ListRolesTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListRolesTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ListRolesResponsePayload {
			
				
				'roles': SpruceSchemas.Spruce.v2020_07_22.Role[]
		}

		interface ListRolesResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'roles': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.RoleSchema,}
			            },
			    }
		}

		type ListRolesResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ListRolesResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface LogoutResponsePayload {
			
		}

		interface LogoutResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'logoutResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type LogoutResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.LogoutResponsePayloadSchema>

	}




	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterEventsEmitPayload {
			
				
				'contract': SpruceSchemas.MercuryTypes.v2020_09_01.EventContract
		}

		interface RegisterEventsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'contract': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryTypes.v2020_09_01.EventContractSchema,}
			            },
			    }
		}

		type RegisterEventsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterEventsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterEventsTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.RegisterEventsEmitPayload
		}

		interface RegisterEventsTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.RegisterEventsEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterEventsTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterEventsTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterEventsResponsePayload {
			
		}

		interface RegisterEventsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type RegisterEventsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterEventsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterListenersEmitPayload {
			
				
				'eventNamesWithOptionalNamespace': string[]
		}

		interface RegisterListenersEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerListenersEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'eventNamesWithOptionalNamespace': {
			                type: 'text',
			                isRequired: true,
			                isArray: true,
			                options: undefined
			            },
			    }
		}

		type RegisterListenersEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterListenersEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterListenersTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.RegisterListenersEmitPayload
		}

		interface RegisterListenersTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerListenersTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.RegisterListenersEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterListenersTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterListenersTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterSkillEmitPayload {
			
				/** Name. */
				'name': string
				/** Description. */
				'description'?: string| undefined | null
				/** Slug. */
				'slug'?: string| undefined | null
		}

		interface RegisterSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerSkillEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Description. */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                options: undefined
			            },
			            /** Slug. */
			            'slug': {
			                label: 'Slug',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type RegisterSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterSkillTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.RegisterSkillEmitPayload
		}

		interface RegisterSkillTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerSkillTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.RegisterSkillEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterSkillTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterSkillTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RegisterSkillResponsePayload {
			
				
				'skill': SpruceSchemas.Spruce.v2020_07_22.Skill
		}

		interface RegisterSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'registerSkillResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skill': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.SkillSchema,}
			            },
			    }
		}

		type RegisterSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RegisterSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RequestPinEmitPayload {
			
				
				'phone': string
		}

		interface RequestPinEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'phone': {
			                type: 'phone',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type RequestPinEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RequestPinEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RequestPinTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.RequestPinEmitPayload
		}

		interface RequestPinTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.RequestPinEmitPayloadSchema,}
			            },
			    }
		}

		type RequestPinTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RequestPinTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface RequestPinResponsePayload {
			
				
				'challenge': string
		}

		interface RequestPinResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'challenge': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type RequestPinResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.RequestPinResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface ScrambleAccountResponsePayload {
			
		}

		interface ScrambleAccountResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'scrambleAccountResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type ScrambleAccountResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.ScrambleAccountResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterEventsEmitPayload {
			
				
				'eventNames'?: string[]| undefined | null
				
				'shouldUnRegisterAll'?: boolean| undefined | null
		}

		interface UnRegisterEventsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterEventsEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'eventNames': {
			                type: 'text',
			                isArray: true,
			                options: undefined
			            },
			            /** . */
			            'shouldUnRegisterAll': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type UnRegisterEventsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterEventsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterEventsTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UnRegisterEventsEmitPayload
		}

		interface UnRegisterEventsTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterEventsTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UnRegisterEventsEmitPayloadSchema,}
			            },
			    }
		}

		type UnRegisterEventsTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterEventsTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterEventsResponsePayload {
			
		}

		interface UnRegisterEventsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterEventsResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type UnRegisterEventsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterEventsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterListenersEmitPayload {
			
				
				'eventNamesWithOptionalNamespace'?: string[]| undefined | null
				
				'shouldUnRegisterAll'?: boolean| undefined | null
		}

		interface UnRegisterListenersEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterListenersEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'eventNamesWithOptionalNamespace': {
			                type: 'text',
			                isArray: true,
			                options: undefined
			            },
			            /** . */
			            'shouldUnRegisterAll': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type UnRegisterListenersEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterListenersEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterListenersTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UnRegisterListenersEmitPayload
		}

		interface UnRegisterListenersTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterListenersTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UnRegisterListenersEmitPayloadSchema,}
			            },
			    }
		}

		type UnRegisterListenersTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterListenersTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnRegisterListenersResponsePayload {
			
				
				'unRegisterCount': number
		}

		interface UnRegisterListenersResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unRegisterListenersResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'unRegisterCount': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type UnRegisterListenersResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnRegisterListenersResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnInstallSkillEmitPayload {
			
				
				'skillId': string
		}

		interface UnInstallSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unInstallSkillEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skillId': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type UnInstallSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnInstallSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UninstallSkillTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UnInstallSkillEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface UninstallSkillTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'uninstallSkillTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UnInstallSkillEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type UninstallSkillTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UninstallSkillTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UnInstallSkillResponsePayload {
			
		}

		interface UnInstallSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unInstallSkillResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type UnInstallSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UnInstallSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateLocationEmitPayload {
			
				/** Name. */
				'name'?: string| undefined | null
				/** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
				'num'?: string| undefined | null
				/** Slug. */
				'slug'?: string| undefined | null
				/** Public. Is this location viewable by guests? */
				'isPublic'?: boolean| undefined | null
				/** Main Phone. */
				'phone'?: string| undefined | null
				/** Timezone. */
				'timezone'?: ("etc/gmt+12" | "pacific/midway" | "pacific/honolulu" | "us/alaska" | "america/los_Angeles" | "america/tijuana" | "us/arizona" | "america/chihuahua" | "us/mountain" | "america/managua" | "us/central" | "america/mexico_City" | "Canada/Saskatchewan" | "america/bogota" | "us/eastern" | "us/east-indiana" | "Canada/atlantic" | "america/caracas" | "america/manaus" | "america/Santiago" | "Canada/Newfoundland" | "america/Sao_Paulo" | "america/argentina/buenos_Aires" | "america/godthab" | "america/montevideo" | "america/Noronha" | "atlantic/cape_Verde" | "atlantic/azores" | "africa/casablanca" | "etc/gmt" | "europe/amsterdam" | "europe/belgrade" | "europe/brussels" | "europe/Sarajevo" | "africa/lagos" | "asia/amman" | "europe/athens" | "asia/beirut" | "africa/cairo" | "africa/Harare" | "europe/Helsinki" | "asia/Jerusalem" | "europe/minsk" | "africa/Windhoek" | "asia/Kuwait" | "europe/moscow" | "africa/Nairobi" | "asia/tbilisi" | "asia/tehran" | "asia/muscat" | "asia/baku" | "asia/Yerevan" | "asia/Kabul" | "asia/Yekaterinburg" | "asia/Karachi" | "asia/calcutta" | "asia/calcutta" | "asia/Katmandu" | "asia/almaty" | "asia/Dhaka" | "asia/Rangoon" | "asia/bangkok" | "asia/Krasnoyarsk" | "asia/Hong_Kong" | "asia/Kuala_Lumpur" | "asia/Irkutsk" | "Australia/Perth" | "asia/taipei" | "asia/tokyo" | "asia/Seoul" | "asia/Yakutsk" | "Australia/adelaide" | "Australia/Darwin" | "Australia/brisbane" | "Australia/canberra" | "Australia/Hobart" | "pacific/guam" | "asia/Vladivostok" | "asia/magadan" | "pacific/auckland" | "pacific/Fiji" | "pacific/tongatapu")| undefined | null
				/** Address. */
				'address'?: SpruceSchema.AddressFieldValue| undefined | null
				
				'dateCreated'?: number| undefined | null
				
				'dateDeleted'?: number| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'id': string
		}

		interface UpdateLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'updateLocationEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                options: undefined
			            },
			            /** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
			            'num': {
			                label: 'Store number',
			                type: 'text',
			                hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5',
			                options: undefined
			            },
			            /** Slug. */
			            'slug': {
			                label: 'Slug',
			                type: 'text',
			                options: undefined
			            },
			            /** Public. Is this location viewable by guests? */
			            'isPublic': {
			                label: 'Public',
			                type: 'boolean',
			                hint: 'Is this location viewable by guests?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Main Phone. */
			            'phone': {
			                label: 'Main Phone',
			                type: 'phone',
			                options: undefined
			            },
			            /** Timezone. */
			            'timezone': {
			                label: 'Timezone',
			                type: 'select',
			                options: {choices: [{"value":"etc/gmt+12","label":"International Date Line West"},{"value":"pacific/midway","label":"Midway Island, Samoa"},{"value":"pacific/honolulu","label":"Hawaii"},{"value":"us/alaska","label":"Alaska"},{"value":"america/los_Angeles","label":"Pacific Time (US & Canada)"},{"value":"america/tijuana","label":"Tijuana, Baja California"},{"value":"us/arizona","label":"Arizona"},{"value":"america/chihuahua","label":"Chihuahua, La Paz, Mazatlan"},{"value":"us/mountain","label":"Mountain Time (US & Canada)"},{"value":"america/managua","label":"Central America"},{"value":"us/central","label":"Central Time (US & Canada)"},{"value":"america/mexico_City","label":"Guadalajara, Mexico City, Monterrey"},{"value":"Canada/Saskatchewan","label":"Saskatchewan"},{"value":"america/bogota","label":"Bogota, Lima, Quito, Rio Branco"},{"value":"us/eastern","label":"Eastern Time (US & Canada)"},{"value":"us/east-indiana","label":"Indiana (East)"},{"value":"Canada/atlantic","label":"Atlantic Time (Canada)"},{"value":"america/caracas","label":"Caracas, La Paz"},{"value":"america/manaus","label":"Manaus"},{"value":"america/Santiago","label":"Santiago"},{"value":"Canada/Newfoundland","label":"Newfoundland"},{"value":"america/Sao_Paulo","label":"Brasilia"},{"value":"america/argentina/buenos_Aires","label":"Buenos Aires, Georgetown"},{"value":"america/godthab","label":"Greenland"},{"value":"america/montevideo","label":"Montevideo"},{"value":"america/Noronha","label":"Mid-Atlantic"},{"value":"atlantic/cape_Verde","label":"Cape Verde Is."},{"value":"atlantic/azores","label":"Azores"},{"value":"africa/casablanca","label":"Casablanca, Monrovia, Reykjavik"},{"value":"etc/gmt","label":"Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},{"value":"europe/amsterdam","label":"Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},{"value":"europe/belgrade","label":"Belgrade, Bratislava, Budapest, Ljubljana, Prague"},{"value":"europe/brussels","label":"Brussels, Copenhagen, Madrid, Paris"},{"value":"europe/Sarajevo","label":"Sarajevo, Skopje, Warsaw, Zagreb"},{"value":"africa/lagos","label":"West Central Africa"},{"value":"asia/amman","label":"Amman"},{"value":"europe/athens","label":"Athens, Bucharest, Istanbul"},{"value":"asia/beirut","label":"Beirut"},{"value":"africa/cairo","label":"Cairo"},{"value":"africa/Harare","label":"Harare, Pretoria"},{"value":"europe/Helsinki","label":"Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"},{"value":"asia/Jerusalem","label":"Jerusalem"},{"value":"europe/minsk","label":"Minsk"},{"value":"africa/Windhoek","label":"Windhoek"},{"value":"asia/Kuwait","label":"Kuwait, Riyadh, Baghdad"},{"value":"europe/moscow","label":"Moscow, St. Petersburg, Volgograd"},{"value":"africa/Nairobi","label":"Nairobi"},{"value":"asia/tbilisi","label":"Tbilisi"},{"value":"asia/tehran","label":"Tehran"},{"value":"asia/muscat","label":"Abu Dhabi, Muscat"},{"value":"asia/baku","label":"Baku"},{"value":"asia/Yerevan","label":"Yerevan"},{"value":"asia/Kabul","label":"Kabul"},{"value":"asia/Yekaterinburg","label":"Yekaterinburg"},{"value":"asia/Karachi","label":"Islamabad, Karachi, Tashkent"},{"value":"asia/calcutta","label":"Chennai, Kolkata, Mumbai, New Delhi"},{"value":"asia/calcutta","label":"Sri Jayawardenapura"},{"value":"asia/Katmandu","label":"Kathmandu"},{"value":"asia/almaty","label":"Almaty, Novosibirsk"},{"value":"asia/Dhaka","label":"Astana, Dhaka"},{"value":"asia/Rangoon","label":"Yangon (Rangoon)"},{"value":"asia/bangkok","label":"Bangkok, Hanoi, Jakarta"},{"value":"asia/Krasnoyarsk","label":"Krasnoyarsk"},{"value":"asia/Hong_Kong","label":"Beijing, Chongqing, Hong Kong, Urumqi"},{"value":"asia/Kuala_Lumpur","label":"Kuala Lumpur, Singapore"},{"value":"asia/Irkutsk","label":"Irkutsk, Ulaan Bataar"},{"value":"Australia/Perth","label":"Perth"},{"value":"asia/taipei","label":"Taipei"},{"value":"asia/tokyo","label":"Osaka, Sapporo, Tokyo"},{"value":"asia/Seoul","label":"Seoul"},{"value":"asia/Yakutsk","label":"Yakutsk"},{"value":"Australia/adelaide","label":"Adelaide"},{"value":"Australia/Darwin","label":"Darwin"},{"value":"Australia/brisbane","label":"Brisbane"},{"value":"Australia/canberra","label":"Canberra, Melbourne, Sydney"},{"value":"Australia/Hobart","label":"Hobart"},{"value":"pacific/guam","label":"Guam, Port Moresby"},{"value":"asia/Vladivostok","label":"Vladivostok"},{"value":"asia/magadan","label":"Magadan, Solomon Is., New Caledonia"},{"value":"pacific/auckland","label":"Auckland, Wellington"},{"value":"pacific/Fiji","label":"Fiji, Kamchatka, Marshall Is."},{"value":"pacific/tongatapu","label":"Nuku'alofa"}],}
			            },
			            /** Address. */
			            'address': {
			                label: 'Address',
			                type: 'address',
			                options: undefined
			            },
			            /** . */
			            'dateCreated': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'organizationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type UpdateLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateLocationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UpdateLocationEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface UpdateLocationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateLocationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UpdateLocationEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type UpdateLocationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateLocationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface UpdateLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateLocationResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'location': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.LocationSchema,}
			            },
			    }
		}

		type UpdateLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateOrgWithoutSlugSchema {
			
				/** Name. */
				'name'?: string| undefined | null
				
				'dateCreated'?: number| undefined | null
				
				'dateDeleted'?: number| undefined | null
		}

		interface UpdateOrgWithoutSlugSchemaSchema extends SpruceSchema.Schema {
			id: 'updateOrgWithoutSlugSchema',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dateCreated': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			    }
		}

		type UpdateOrgWithoutSlugSchemaEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateOrgWithoutSlugSchemaSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateOrganizationTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UpdateOrgWithoutSlugSchema
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface UpdateOrganizationTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateOrganizationTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UpdateOrgWithoutSlugSchemaSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type UpdateOrganizationTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateOrganizationTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateOrg {
			
				/** Name. */
				'name'?: string| undefined | null
				/** Slug. */
				'slug'?: string| undefined | null
				
				'dateCreated'?: number| undefined | null
				
				'dateDeleted'?: number| undefined | null
		}

		interface UpdateOrgSchema extends SpruceSchema.Schema {
			id: 'updateOrg',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                options: undefined
			            },
			            /** Slug. */
			            'slug': {
			                label: 'Slug',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dateCreated': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			    }
		}

		type UpdateOrgEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateOrgSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateOrgResponsePayload {
			
				
				'organization': SpruceSchemas.MercuryApi.UpdateOrg
		}

		interface UpdateOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateOrgResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organization': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UpdateOrgSchema,}
			            },
			    }
		}

		type UpdateOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface EventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillSlug'?: string| undefined | null
		}

		interface EventTargetSchema extends SpruceSchema.Schema {
			id: 'eventTarget',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'locationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'personId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'organizationId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'skillSlug': {
			                type: 'id',
			                options: undefined
			            },
			    }
		}

		type EventTargetEntity = SchemaEntity<SpruceSchemas.MercuryApi.EventTargetSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateRoleEmitPayload {
			
				/** Name. */
				'name'?: string| undefined | null
				/** Base. Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role. */
				'base'?: ("owner" | "groupManager" | "manager" | "teammate" | "guest" | "anonymous")| undefined | null
				/** Description. */
				'description'?: string| undefined | null
				
				'dateDeleted'?: number| undefined | null
				/** Public. Should I let people that are not part of this organization this role? */
				'isPublic'?: boolean| undefined | null
				
				'id': string
		}

		interface UpdateRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'updateRoleEmitPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                options: undefined
			            },
			            /** Base. Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role. */
			            'base': {
			                label: 'Base',
			                type: 'select',
			                hint: 'Used to determine the default permissions when this role is created and the fallback for when a permission is not set on this role.',
			                options: {choices: [{"label":"Owner","value":"owner"},{"label":"Group manager","value":"groupManager"},{"label":"Manager","value":"manager"},{"label":"Teammate","value":"teammate"},{"label":"Guest","value":"guest"},{"label":"Anonymous","value":"anonymous"}],}
			            },
			            /** Description. */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dateDeleted': {
			                type: 'number',
			                options: undefined
			            },
			            /** Public. Should I let people that are not part of this organization this role? */
			            'isPublic': {
			                label: 'Public',
			                type: 'boolean',
			                hint: 'Should I let people that are not part of this organization this role?',
			                options: undefined
			            },
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type UpdateRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateRoleTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.UpdateRoleEmitPayload
				
				'target': SpruceSchemas.MercuryApi.EventTarget
		}

		interface UpdateRoleTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateRoleTargetAndPayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.UpdateRoleEmitPayloadSchema,}
			            },
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.EventTargetSchema,}
			            },
			    }
		}

		type UpdateRoleTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateRoleTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi {

		
		interface UpdateRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface UpdateRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateRoleResponsePayload',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'role': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.RoleSchema,}
			            },
			    }
		}

		type UpdateRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.UpdateRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Options for schema.sync. */
		interface SyncSchemasAction {
			
				/** Field types directory. Where field types and interfaces will be generated. */
				'fieldTypesDestinationDir'?: string| undefined | null
				/** Addons lookup directory. Where I'll look for new schema fields to be registered. */
				'addonsLookupDir'?: string| undefined | null
				/** Generate field types. Should I generate field types too? */
				'generateFieldTypes'?: boolean| undefined | null
				/** Schema types destination directory. Where I will generate schema types and interfaces. */
				'schemaTypesDestinationDirOrFile'?: string| undefined | null
				/** . Where I should look for your schema builders? */
				'schemaLookupDir'?: string| undefined | null
				/** Enable versioning. Should we use versioning? */
				'enableVersioning'?: boolean| undefined | null
				/** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
				'globalSchemaNamespace'?: string| undefined | null
				/** Fetch remote schemas. I will pull in schemas from other features. */
				'fetchRemoteSchemas'?: boolean| undefined | null
				/** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
				'fetchLocalSchemas'?: boolean| undefined | null
				/** Fetch core schemas. Should I pull in core schemas too? */
				'fetchCoreSchemas'?: boolean| undefined | null
				/** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
				'generateCoreSchemaTypes'?: boolean| undefined | null
				/** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
				'registerBuiltSchemas'?: boolean| undefined | null
				/** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
				'deleteDestinationDirIfNoSchemas'?: boolean| undefined | null
				/** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
				'generateStandaloneTypesFile'?: boolean| undefined | null
				/**  message. */
				'syncingMessage'?: string| undefined | null
		}

		interface SyncSchemasActionSchema extends SpruceSchema.Schema {
			id: 'syncSchemasAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Sync schemas action',
			description: 'Options for schema.sync.',
			    fields: {
			            /** Field types directory. Where field types and interfaces will be generated. */
			            'fieldTypesDestinationDir': {
			                label: 'Field types directory',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Where field types and interfaces will be generated.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
			            'addonsLookupDir': {
			                label: 'Addons lookup directory',
			                type: 'text',
			                hint: 'Where I\'ll look for new schema fields to be registered.',
			                defaultValue: "src/addons",
			                options: undefined
			            },
			            /** Generate field types. Should I generate field types too? */
			            'generateFieldTypes': {
			                label: 'Generate field types',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I generate field types too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Schema types destination directory. Where I will generate schema types and interfaces. */
			            'schemaTypesDestinationDirOrFile': {
			                label: 'Schema types destination directory',
			                type: 'text',
			                hint: 'Where I will generate schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** . Where I should look for your schema builders? */
			            'schemaLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your schema builders?',
			                defaultValue: "src/schemas",
			                options: undefined
			            },
			            /** Enable versioning. Should we use versioning? */
			            'enableVersioning': {
			                label: 'Enable versioning',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should we use versioning?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
			            'globalSchemaNamespace': {
			                label: 'Global namespace',
			                type: 'text',
			                isPrivate: true,
			                hint: 'The name you\'ll use when accessing these schemas, e.g. SpruceSchemas',
			                defaultValue: "SpruceSchemas",
			                options: undefined
			            },
			            /** Fetch remote schemas. I will pull in schemas from other features. */
			            'fetchRemoteSchemas': {
			                label: 'Fetch remote schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will pull in schemas from other features.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
			            'fetchLocalSchemas': {
			                label: 'Fetch local schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will look in schemaLookupDir to load local schemas.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch core schemas. Should I pull in core schemas too? */
			            'fetchCoreSchemas': {
			                label: 'Fetch core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I pull in core schemas too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
			            'generateCoreSchemaTypes': {
			                label: 'Generate core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile.',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
			            'registerBuiltSchemas': {
			                label: 'Register built schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should the schemas use the SchemaRegistry for tracking?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
			            'deleteDestinationDirIfNoSchemas': {
			                label: 'Delete directory if no schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I delete the schema directory if no schemas are found?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
			            'generateStandaloneTypesFile': {
			                label: 'Generate standalone types file',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file.',
			                defaultValue: false,
			                options: undefined
			            },
			            /**  message. */
			            'syncingMessage': {
			                label: ' message',
			                type: 'text',
			                isPrivate: true,
			                defaultValue: "Syncing schemas...",
			                options: undefined
			            },
			    }
		}

		type SyncSchemasActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemasActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Create the builder to a fresh new schema! */
		interface CreateSchemaAction {
			
				/** Field types directory. Where field types and interfaces will be generated. */
				'fieldTypesDestinationDir'?: string| undefined | null
				/** Addons lookup directory. Where I'll look for new schema fields to be registered. */
				'addonsLookupDir'?: string| undefined | null
				/** Generate field types. Should I generate field types too? */
				'generateFieldTypes'?: boolean| undefined | null
				/** Schema types destination directory. Where I will generate schema types and interfaces. */
				'schemaTypesDestinationDirOrFile'?: string| undefined | null
				/** . Where I should look for your schema builders? */
				'schemaLookupDir'?: string| undefined | null
				/** Enable versioning. Should we use versioning? */
				'enableVersioning'?: boolean| undefined | null
				/** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
				'globalSchemaNamespace'?: string| undefined | null
				/** Fetch remote schemas. I will pull in schemas from other features. */
				'fetchRemoteSchemas'?: boolean| undefined | null
				/** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
				'fetchLocalSchemas'?: boolean| undefined | null
				/** Fetch core schemas. Should I pull in core schemas too? */
				'fetchCoreSchemas'?: boolean| undefined | null
				/** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
				'generateCoreSchemaTypes'?: boolean| undefined | null
				/** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
				'registerBuiltSchemas'?: boolean| undefined | null
				/** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
				'deleteDestinationDirIfNoSchemas'?: boolean| undefined | null
				/** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
				'generateStandaloneTypesFile'?: boolean| undefined | null
				/**  message. */
				'syncingMessage'?: string| undefined | null
				/** Schema builder destination directory. Where I'll save the new schema builder. */
				'schemaBuilderDestinationDir'?: string| undefined | null
				/** Builder function. The function that builds this schema */
				'builderFunction'?: string| undefined | null
				/** Sync after creation. This will ensure types and schemas are in sync after you create your builder. */
				'syncAfterCreate'?: boolean| undefined | null
				/** Version. Set a version yourself instead of letting me generate one for you */
				'version'?: string| undefined | null
				/** Readable name. The name people will read */
				'nameReadable': string
				/** Pascal case name. PascalCase of the name */
				'namePascal'?: string| undefined | null
				/** Camel case name. camelCase version of the name */
				'nameCamel': string
				/** Description. Describe a bit more here */
				'description'?: string| undefined | null
		}

		interface CreateSchemaActionSchema extends SpruceSchema.Schema {
			id: 'createSchemaAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Create schema',
			description: 'Create the builder to a fresh new schema!',
			    fields: {
			            /** Field types directory. Where field types and interfaces will be generated. */
			            'fieldTypesDestinationDir': {
			                label: 'Field types directory',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Where field types and interfaces will be generated.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
			            'addonsLookupDir': {
			                label: 'Addons lookup directory',
			                type: 'text',
			                hint: 'Where I\'ll look for new schema fields to be registered.',
			                defaultValue: "src/addons",
			                options: undefined
			            },
			            /** Generate field types. Should I generate field types too? */
			            'generateFieldTypes': {
			                label: 'Generate field types',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I generate field types too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Schema types destination directory. Where I will generate schema types and interfaces. */
			            'schemaTypesDestinationDirOrFile': {
			                label: 'Schema types destination directory',
			                type: 'text',
			                hint: 'Where I will generate schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** . Where I should look for your schema builders? */
			            'schemaLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your schema builders?',
			                defaultValue: "src/schemas",
			                options: undefined
			            },
			            /** Enable versioning. Should we use versioning? */
			            'enableVersioning': {
			                label: 'Enable versioning',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should we use versioning?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
			            'globalSchemaNamespace': {
			                label: 'Global namespace',
			                type: 'text',
			                isPrivate: true,
			                hint: 'The name you\'ll use when accessing these schemas, e.g. SpruceSchemas',
			                defaultValue: "SpruceSchemas",
			                options: undefined
			            },
			            /** Fetch remote schemas. I will pull in schemas from other features. */
			            'fetchRemoteSchemas': {
			                label: 'Fetch remote schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will pull in schemas from other features.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
			            'fetchLocalSchemas': {
			                label: 'Fetch local schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will look in schemaLookupDir to load local schemas.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch core schemas. Should I pull in core schemas too? */
			            'fetchCoreSchemas': {
			                label: 'Fetch core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I pull in core schemas too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
			            'generateCoreSchemaTypes': {
			                label: 'Generate core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile.',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
			            'registerBuiltSchemas': {
			                label: 'Register built schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should the schemas use the SchemaRegistry for tracking?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
			            'deleteDestinationDirIfNoSchemas': {
			                label: 'Delete directory if no schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I delete the schema directory if no schemas are found?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
			            'generateStandaloneTypesFile': {
			                label: 'Generate standalone types file',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file.',
			                defaultValue: false,
			                options: undefined
			            },
			            /**  message. */
			            'syncingMessage': {
			                label: ' message',
			                type: 'text',
			                isPrivate: true,
			                defaultValue: "Syncing schemas...",
			                options: undefined
			            },
			            /** Schema builder destination directory. Where I'll save the new schema builder. */
			            'schemaBuilderDestinationDir': {
			                label: 'Schema builder destination directory',
			                type: 'text',
			                hint: 'Where I\'ll save the new schema builder.',
			                defaultValue: "src/schemas",
			                options: undefined
			            },
			            /** Builder function. The function that builds this schema */
			            'builderFunction': {
			                label: 'Builder function',
			                type: 'text',
			                isPrivate: true,
			                hint: 'The function that builds this schema',
			                defaultValue: "buildSchema",
			                options: undefined
			            },
			            /** Sync after creation. This will ensure types and schemas are in sync after you create your builder. */
			            'syncAfterCreate': {
			                label: 'Sync after creation',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'This will ensure types and schemas are in sync after you create your builder.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Version. Set a version yourself instead of letting me generate one for you */
			            'version': {
			                label: 'Version',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Set a version yourself instead of letting me generate one for you',
			                options: undefined
			            },
			            /** Readable name. The name people will read */
			            'nameReadable': {
			                label: 'Readable name',
			                type: 'text',
			                isRequired: true,
			                hint: 'The name people will read',
			                options: undefined
			            },
			            /** Pascal case name. PascalCase of the name */
			            'namePascal': {
			                label: 'Pascal case name',
			                type: 'text',
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Camel case name. camelCase version of the name */
			            'nameCamel': {
			                label: 'Camel case name',
			                type: 'text',
			                isRequired: true,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Description. Describe a bit more here */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                hint: 'Describe a bit more here',
			                options: undefined
			            },
			    }
		}

		type CreateSchemaActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.CreateSchemaActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Create a builder for your brand new error!  */
		interface CreateErrorAction {
			
				/** Field types directory. Where field types and interfaces will be generated. */
				'fieldTypesDestinationDir'?: string| undefined | null
				/** Addons lookup directory. Where I'll look for new schema fields to be registered. */
				'addonsLookupDir'?: string| undefined | null
				/** Generate field types. Should I generate field types too? */
				'generateFieldTypes'?: boolean| undefined | null
				/** Schema types destination directory. Where I will generate schema types and interfaces. */
				'schemaTypesDestinationDirOrFile'?: string| undefined | null
				/** . Where I should look for your schema builders? */
				'schemaLookupDir'?: string| undefined | null
				/** Enable versioning. Should we use versioning? */
				'enableVersioning'?: boolean| undefined | null
				/** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
				'globalSchemaNamespace'?: string| undefined | null
				/** Fetch remote schemas. I will pull in schemas from other features. */
				'fetchRemoteSchemas'?: boolean| undefined | null
				/** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
				'fetchLocalSchemas'?: boolean| undefined | null
				/** Fetch core schemas. Should I pull in core schemas too? */
				'fetchCoreSchemas'?: boolean| undefined | null
				/** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
				'generateCoreSchemaTypes'?: boolean| undefined | null
				/** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
				'registerBuiltSchemas'?: boolean| undefined | null
				/** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
				'deleteDestinationDirIfNoSchemas'?: boolean| undefined | null
				/** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
				'generateStandaloneTypesFile'?: boolean| undefined | null
				/**  message. */
				'syncingMessage'?: string| undefined | null
				/** Error class destination. Where I'll save your new Error class file? */
				'errorClassDestinationDir': string
				/** . Where I should look for your error builders? */
				'errorLookupDir'?: string| undefined | null
				/** Types destination dir. This is where error options and type information will be written */
				'errorTypesDestinationDir'?: string| undefined | null
				/** Error builder destination directory. Where I'll save your new builder file? */
				'errorBuilderDestinationDir': string
				/** Readable name. The name people will read */
				'nameReadable': string
				/** Pascal case name. PascalCase of the name */
				'namePascal'?: string| undefined | null
				/** Camel case name. camelCase version of the name */
				'nameCamel': string
				/** Description. Describe a bit more here */
				'description'?: string| undefined | null
		}

		interface CreateErrorActionSchema extends SpruceSchema.Schema {
			id: 'createErrorAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Create error action',
			description: 'Create a builder for your brand new error! ',
			    fields: {
			            /** Field types directory. Where field types and interfaces will be generated. */
			            'fieldTypesDestinationDir': {
			                label: 'Field types directory',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Where field types and interfaces will be generated.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
			            'addonsLookupDir': {
			                label: 'Addons lookup directory',
			                type: 'text',
			                hint: 'Where I\'ll look for new schema fields to be registered.',
			                defaultValue: "src/addons",
			                options: undefined
			            },
			            /** Generate field types. Should I generate field types too? */
			            'generateFieldTypes': {
			                label: 'Generate field types',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I generate field types too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Schema types destination directory. Where I will generate schema types and interfaces. */
			            'schemaTypesDestinationDirOrFile': {
			                label: 'Schema types destination directory',
			                type: 'text',
			                hint: 'Where I will generate schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** . Where I should look for your schema builders? */
			            'schemaLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your schema builders?',
			                defaultValue: "src/schemas",
			                options: undefined
			            },
			            /** Enable versioning. Should we use versioning? */
			            'enableVersioning': {
			                label: 'Enable versioning',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should we use versioning?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
			            'globalSchemaNamespace': {
			                label: 'Global namespace',
			                type: 'text',
			                isPrivate: true,
			                hint: 'The name you\'ll use when accessing these schemas, e.g. SpruceSchemas',
			                defaultValue: "SpruceSchemas",
			                options: undefined
			            },
			            /** Fetch remote schemas. I will pull in schemas from other features. */
			            'fetchRemoteSchemas': {
			                label: 'Fetch remote schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will pull in schemas from other features.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
			            'fetchLocalSchemas': {
			                label: 'Fetch local schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will look in schemaLookupDir to load local schemas.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch core schemas. Should I pull in core schemas too? */
			            'fetchCoreSchemas': {
			                label: 'Fetch core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I pull in core schemas too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
			            'generateCoreSchemaTypes': {
			                label: 'Generate core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile.',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
			            'registerBuiltSchemas': {
			                label: 'Register built schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should the schemas use the SchemaRegistry for tracking?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
			            'deleteDestinationDirIfNoSchemas': {
			                label: 'Delete directory if no schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I delete the schema directory if no schemas are found?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
			            'generateStandaloneTypesFile': {
			                label: 'Generate standalone types file',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file.',
			                defaultValue: false,
			                options: undefined
			            },
			            /**  message. */
			            'syncingMessage': {
			                label: ' message',
			                type: 'text',
			                isPrivate: true,
			                defaultValue: "Syncing schemas...",
			                options: undefined
			            },
			            /** Error class destination. Where I'll save your new Error class file? */
			            'errorClassDestinationDir': {
			                label: 'Error class destination',
			                type: 'text',
			                isPrivate: true,
			                isRequired: true,
			                hint: 'Where I\'ll save your new Error class file?',
			                defaultValue: "src/errors",
			                options: undefined
			            },
			            /** . Where I should look for your error builders? */
			            'errorLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your error builders?',
			                defaultValue: "src/errors",
			                options: undefined
			            },
			            /** Types destination dir. This is where error options and type information will be written */
			            'errorTypesDestinationDir': {
			                label: 'Types destination dir',
			                type: 'text',
			                hint: 'This is where error options and type information will be written',
			                defaultValue: "#spruce/errors",
			                options: undefined
			            },
			            /** Error builder destination directory. Where I'll save your new builder file? */
			            'errorBuilderDestinationDir': {
			                label: 'Error builder destination directory',
			                type: 'text',
			                isPrivate: true,
			                isRequired: true,
			                hint: 'Where I\'ll save your new builder file?',
			                defaultValue: "./src/errors",
			                options: undefined
			            },
			            /** Readable name. The name people will read */
			            'nameReadable': {
			                label: 'Readable name',
			                type: 'text',
			                isRequired: true,
			                hint: 'The name people will read',
			                options: undefined
			            },
			            /** Pascal case name. PascalCase of the name */
			            'namePascal': {
			                label: 'Pascal case name',
			                type: 'text',
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Camel case name. camelCase version of the name */
			            'nameCamel': {
			                label: 'Camel case name',
			                type: 'text',
			                isRequired: true,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Description. Describe a bit more here */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                hint: 'Describe a bit more here',
			                options: undefined
			            },
			    }
		}

		type CreateErrorActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.CreateErrorActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface SyncEventAction {
			
				/** Contract destination. Where I will generate event contracts. */
				'contractDestinationDir'?: string| undefined | null
				/** Schema types lookup directory. Where I will lookup schema types and interfaces. */
				'schemaTypesLookupDir'?: string| undefined | null
		}

		interface SyncEventActionSchema extends SpruceSchema.Schema {
			id: 'syncEventAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'sync event action',
			    fields: {
			            /** Contract destination. Where I will generate event contracts. */
			            'contractDestinationDir': {
			                label: 'Contract destination',
			                type: 'text',
			                hint: 'Where I will generate event contracts.',
			                defaultValue: "#spruce/events",
			                options: undefined
			            },
			            /** Schema types lookup directory. Where I will lookup schema types and interfaces. */
			            'schemaTypesLookupDir': {
			                label: 'Schema types lookup directory',
			                type: 'text',
			                hint: 'Where I will lookup schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			    }
		}

		type SyncEventActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SyncEventActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Options for event.listen. */
		interface ListenEventAction {
			
				/** Contract destination. Where I will generate event contracts. */
				'contractDestinationDir'?: string| undefined | null
				/** Schema types lookup directory. Where I will lookup schema types and interfaces. */
				'schemaTypesLookupDir'?: string| undefined | null
				/** Namespace. */
				'eventNamespace'?: string| undefined | null
				/** Event name. */
				'eventName'?: string| undefined | null
				/** Events destination directory. Where should I add your listeners? */
				'listenerDestinationDir'?: string| undefined | null
				/** Version. Set a version yourself instead of letting me generate one for you */
				'version'?: string| undefined | null
		}

		interface ListenEventActionSchema extends SpruceSchema.Schema {
			id: 'listenEventAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Listen to event action',
			description: 'Options for event.listen.',
			    fields: {
			            /** Contract destination. Where I will generate event contracts. */
			            'contractDestinationDir': {
			                label: 'Contract destination',
			                type: 'text',
			                hint: 'Where I will generate event contracts.',
			                defaultValue: "#spruce/events",
			                options: undefined
			            },
			            /** Schema types lookup directory. Where I will lookup schema types and interfaces. */
			            'schemaTypesLookupDir': {
			                label: 'Schema types lookup directory',
			                type: 'text',
			                hint: 'Where I will lookup schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Namespace. */
			            'eventNamespace': {
			                label: 'Namespace',
			                type: 'text',
			                options: undefined
			            },
			            /** Event name. */
			            'eventName': {
			                label: 'Event name',
			                type: 'text',
			                options: undefined
			            },
			            /** Events destination directory. Where should I add your listeners? */
			            'listenerDestinationDir': {
			                label: 'Events destination directory',
			                type: 'text',
			                hint: 'Where should I add your listeners?',
			                defaultValue: "src/listeners",
			                options: undefined
			            },
			            /** Version. Set a version yourself instead of letting me generate one for you */
			            'version': {
			                label: 'Version',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Set a version yourself instead of letting me generate one for you',
			                options: undefined
			            },
			    }
		}

		type ListenEventActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.ListenEventActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Keep your errors types in sync with your builders */
		interface SyncErrorAction {
			
				/** Field types directory. Where field types and interfaces will be generated. */
				'fieldTypesDestinationDir'?: string| undefined | null
				/** Addons lookup directory. Where I'll look for new schema fields to be registered. */
				'addonsLookupDir'?: string| undefined | null
				/** Generate field types. Should I generate field types too? */
				'generateFieldTypes'?: boolean| undefined | null
				/** Schema types destination directory. Where I will generate schema types and interfaces. */
				'schemaTypesDestinationDirOrFile'?: string| undefined | null
				/** . Where I should look for your schema builders? */
				'schemaLookupDir'?: string| undefined | null
				/** Enable versioning. Should we use versioning? */
				'enableVersioning'?: boolean| undefined | null
				/** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
				'globalSchemaNamespace'?: string| undefined | null
				/** Fetch remote schemas. I will pull in schemas from other features. */
				'fetchRemoteSchemas'?: boolean| undefined | null
				/** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
				'fetchLocalSchemas'?: boolean| undefined | null
				/** Fetch core schemas. Should I pull in core schemas too? */
				'fetchCoreSchemas'?: boolean| undefined | null
				/** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
				'generateCoreSchemaTypes'?: boolean| undefined | null
				/** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
				'registerBuiltSchemas'?: boolean| undefined | null
				/** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
				'deleteDestinationDirIfNoSchemas'?: boolean| undefined | null
				/** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
				'generateStandaloneTypesFile'?: boolean| undefined | null
				/**  message. */
				'syncingMessage'?: string| undefined | null
				/** Error class destination. Where I'll save your new Error class file? */
				'errorClassDestinationDir': string
				/** . Where I should look for your error builders? */
				'errorLookupDir'?: string| undefined | null
				/** Types destination dir. This is where error options and type information will be written */
				'errorTypesDestinationDir'?: string| undefined | null
		}

		interface SyncErrorActionSchema extends SpruceSchema.Schema {
			id: 'syncErrorAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Sync error action',
			description: 'Keep your errors types in sync with your builders',
			    fields: {
			            /** Field types directory. Where field types and interfaces will be generated. */
			            'fieldTypesDestinationDir': {
			                label: 'Field types directory',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Where field types and interfaces will be generated.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
			            'addonsLookupDir': {
			                label: 'Addons lookup directory',
			                type: 'text',
			                hint: 'Where I\'ll look for new schema fields to be registered.',
			                defaultValue: "src/addons",
			                options: undefined
			            },
			            /** Generate field types. Should I generate field types too? */
			            'generateFieldTypes': {
			                label: 'Generate field types',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I generate field types too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Schema types destination directory. Where I will generate schema types and interfaces. */
			            'schemaTypesDestinationDirOrFile': {
			                label: 'Schema types destination directory',
			                type: 'text',
			                hint: 'Where I will generate schema types and interfaces.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** . Where I should look for your schema builders? */
			            'schemaLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your schema builders?',
			                defaultValue: "src/schemas",
			                options: undefined
			            },
			            /** Enable versioning. Should we use versioning? */
			            'enableVersioning': {
			                label: 'Enable versioning',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should we use versioning?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Global namespace. The name you'll use when accessing these schemas, e.g. SpruceSchemas */
			            'globalSchemaNamespace': {
			                label: 'Global namespace',
			                type: 'text',
			                isPrivate: true,
			                hint: 'The name you\'ll use when accessing these schemas, e.g. SpruceSchemas',
			                defaultValue: "SpruceSchemas",
			                options: undefined
			            },
			            /** Fetch remote schemas. I will pull in schemas from other features. */
			            'fetchRemoteSchemas': {
			                label: 'Fetch remote schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will pull in schemas from other features.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch local schemas. I will look in schemaLookupDir to load local schemas. */
			            'fetchLocalSchemas': {
			                label: 'Fetch local schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'I will look in schemaLookupDir to load local schemas.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Fetch core schemas. Should I pull in core schemas too? */
			            'fetchCoreSchemas': {
			                label: 'Fetch core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I pull in core schemas too?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Generate core schemas. Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile. */
			            'generateCoreSchemaTypes': {
			                label: 'Generate core schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Used only for updating the @sprucelabs/spruce-core-schemas. Ensures core schemas are generated like local schemas. Also an alias for `--fetchRemoteSchemas=false --fetchCoreSchemas=false --generateStandaloneTypesFile.',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Register built schemas. Should the schemas use the SchemaRegistry for tracking? */
			            'registerBuiltSchemas': {
			                label: 'Register built schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should the schemas use the SchemaRegistry for tracking?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Delete directory if no schemas. Should I delete the schema directory if no schemas are found? */
			            'deleteDestinationDirIfNoSchemas': {
			                label: 'Delete directory if no schemas',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I delete the schema directory if no schemas are found?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Generate standalone types file. By default, I'll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file. */
			            'generateStandaloneTypesFile': {
			                label: 'Generate standalone types file',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'By default, I\'ll generate a types file that augments core types from @sprucelabs/spruce-core-schemas. Setting this to true will generate a stand alone types file.',
			                defaultValue: false,
			                options: undefined
			            },
			            /**  message. */
			            'syncingMessage': {
			                label: ' message',
			                type: 'text',
			                isPrivate: true,
			                defaultValue: "Syncing schemas...",
			                options: undefined
			            },
			            /** Error class destination. Where I'll save your new Error class file? */
			            'errorClassDestinationDir': {
			                label: 'Error class destination',
			                type: 'text',
			                isPrivate: true,
			                isRequired: true,
			                hint: 'Where I\'ll save your new Error class file?',
			                defaultValue: "src/errors",
			                options: undefined
			            },
			            /** . Where I should look for your error builders? */
			            'errorLookupDir': {
			                type: 'text',
			                hint: 'Where I should look for your error builders?',
			                defaultValue: "src/errors",
			                options: undefined
			            },
			            /** Types destination dir. This is where error options and type information will be written */
			            'errorTypesDestinationDir': {
			                label: 'Types destination dir',
			                type: 'text',
			                hint: 'This is where error options and type information will be written',
			                defaultValue: "#spruce/errors",
			                options: undefined
			            },
			    }
		}

		type SyncErrorActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SyncErrorActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Options for creating a new test. */
		interface CreateTestAction {
			
				/** Type of test. */
				'type': ("behavioral" | "implementation")
				/** What are you testing?. E.g. Booking an appointment or turning on a light */
				'nameReadable': string
				/** Test destination directory. Where I'll save your new test. */
				'testDestinationDir'?: string| undefined | null
				/** Camel case name. camelCase version of the name */
				'nameCamel': string
				/** Pascal case name. PascalCase of the name */
				'namePascal'?: string| undefined | null
		}

		interface CreateTestActionSchema extends SpruceSchema.Schema {
			id: 'createTestAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Create test action',
			description: 'Options for creating a new test.',
			    fields: {
			            /** Type of test. */
			            'type': {
			                label: 'Type of test',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"behavioral","label":"Behavioral"},{"value":"implementation","label":"Implementation"}],}
			            },
			            /** What are you testing?. E.g. Booking an appointment or turning on a light */
			            'nameReadable': {
			                label: 'What are you testing?',
			                type: 'text',
			                isRequired: true,
			                hint: 'E.g. Booking an appointment or turning on a light',
			                options: undefined
			            },
			            /** Test destination directory. Where I'll save your new test. */
			            'testDestinationDir': {
			                label: 'Test destination directory',
			                type: 'text',
			                hint: 'Where I\'ll save your new test.',
			                defaultValue: "src/__tests__",
			                options: undefined
			            },
			            /** Camel case name. camelCase version of the name */
			            'nameCamel': {
			                label: 'Camel case name',
			                type: 'text',
			                isRequired: true,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Pascal case name. PascalCase of the name */
			            'namePascal': {
			                label: 'Pascal case name',
			                type: 'text',
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			    }
		}

		type CreateTestActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.CreateTestActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface CreateOrganizationAction {
			
				/** Name. The name people will read */
				'nameReadable': string
				/** Slug. kebab-case of the name */
				'nameKebab'?: string| undefined | null
		}

		interface CreateOrganizationActionSchema extends SpruceSchema.Schema {
			id: 'createOrganizationAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'create organization action',
			    fields: {
			            /** Name. The name people will read */
			            'nameReadable': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                hint: 'The name people will read',
			                options: undefined
			            },
			            /** Slug. kebab-case of the name */
			            'nameKebab': {
			                label: 'Slug',
			                type: 'text',
			                hint: 'kebab-case of the name',
			                options: undefined
			            },
			    }
		}

		type CreateOrganizationActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.CreateOrganizationActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface GeneratedDir {
			
				
				'name': string
				
				'path': string
				
				'description'?: string| undefined | null
				
				'action': ("skipped" | "generated" | "updated" | "deleted")
		}

		interface GeneratedDirSchema extends SpruceSchema.Schema {
			id: 'generatedDir',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: '',
			    fields: {
			            /** . */
			            'name': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'path': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'description': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'action': {
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"label":"Skipped","value":"skipped"},{"label":"Generated","value":"generated"},{"label":"Updated","value":"updated"},{"label":"Deleted","value":"deleted"}],}
			            },
			    }
		}

		type GeneratedDirEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.GeneratedDirSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface GeneratedFile {
			
				
				'name': string
				
				'path': string
				
				'description'?: string| undefined | null
				
				'action': ("skipped" | "generated" | "updated" | "deleted")
		}

		interface GeneratedFileSchema extends SpruceSchema.Schema {
			id: 'generatedFile',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: '',
			    fields: {
			            /** . */
			            'name': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'path': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'description': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'action': {
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"label":"Skipped","value":"skipped"},{"label":"Generated","value":"generated"},{"label":"Updated","value":"updated"},{"label":"Deleted","value":"deleted"}],}
			            },
			    }
		}

		type GeneratedFileEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.GeneratedFileSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface WatcherDidDetectChangesEmitPayload {
			
				
				'changes': ({ schemaId: 'generatedFile', version: 'v2020_07_22', values: SpruceSchemas.SpruceCli.v2020_07_22.GeneratedFile } | { schemaId: 'generatedDir', version: 'v2020_07_22', values: SpruceSchemas.SpruceCli.v2020_07_22.GeneratedDir })[]
		}

		interface WatcherDidDetectChangesEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'watcherDidDetectChangesEmitPayload',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Watcher did detect changes emit payload',
			    fields: {
			            /** . */
			            'changes': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schemas: (SpruceSchemas.SpruceCli.v2020_07_22.GeneratedFileSchema | SpruceSchemas.SpruceCli.v2020_07_22.GeneratedDirSchema)[],}
			            },
			    }
		}

		type WatcherDidDetectChangesEmitPayloadEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.WatcherDidDetectChangesEmitPayloadSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Options skill.upgrade. */
		interface UpgradeSkillAction {
			
				/** Upgrade mode. */
				'upgradeMode'?: ("askEverything" | "forceEverything" | "forceRequiredSkipRest")| undefined | null
		}

		interface UpgradeSkillActionSchema extends SpruceSchema.Schema {
			id: 'upgradeSkillAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Upgrade skill action',
			description: 'Options skill.upgrade.',
			    fields: {
			            /** Upgrade mode. */
			            'upgradeMode': {
			                label: 'Upgrade mode',
			                type: 'select',
			                defaultValue: "forceRequiredSkipRest",
			                options: {choices: [{"value":"askEverything","label":"Ask for everything"},{"value":"forceEverything","label":"Force everything"},{"value":"forceRequiredSkipRest","label":"Force required (skipping all non-essential)"}],}
			            },
			    }
		}

		type UpgradeSkillActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.UpgradeSkillActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Sync schema fields so you can use schemas! */
		interface SyncSchemaFieldsAction {
			
				/** Field types directory. Where field types and interfaces will be generated. */
				'fieldTypesDestinationDir'?: string| undefined | null
				/** Addons lookup directory. Where I'll look for new schema fields to be registered. */
				'addonsLookupDir'?: string| undefined | null
				/** Generate field types. Should I generate field types too? */
				'generateFieldTypes'?: boolean| undefined | null
		}

		interface SyncSchemaFieldsActionSchema extends SpruceSchema.Schema {
			id: 'syncSchemaFieldsAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'syncSchemaFieldsAction',
			description: 'Sync schema fields so you can use schemas!',
			    fields: {
			            /** Field types directory. Where field types and interfaces will be generated. */
			            'fieldTypesDestinationDir': {
			                label: 'Field types directory',
			                type: 'text',
			                isPrivate: true,
			                hint: 'Where field types and interfaces will be generated.',
			                defaultValue: "#spruce/schemas",
			                options: undefined
			            },
			            /** Addons lookup directory. Where I'll look for new schema fields to be registered. */
			            'addonsLookupDir': {
			                label: 'Addons lookup directory',
			                type: 'text',
			                hint: 'Where I\'ll look for new schema fields to be registered.',
			                defaultValue: "src/addons",
			                options: undefined
			            },
			            /** Generate field types. Should I generate field types too? */
			            'generateFieldTypes': {
			                label: 'Generate field types',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'Should I generate field types too?',
			                defaultValue: true,
			                options: undefined
			            },
			    }
		}

		type SyncSchemaFieldsActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SyncSchemaFieldsActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface SkillFeature {
			
				/** What's the name of your skill?. */
				'name': string
				/** How would you describe your skill?. */
				'description': string
		}

		interface SkillFeatureSchema extends SpruceSchema.Schema {
			id: 'skillFeature',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Skill feature options',
			    fields: {
			            /** What's the name of your skill?. */
			            'name': {
			                label: 'What\'s the name of your skill?',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** How would you describe your skill?. */
			            'description': {
			                label: 'How would you describe your skill?',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type SkillFeatureEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SkillFeatureSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Install vscode extensions, launch configs, and settings the Spruce team uses in-house! */
		interface SetupVscodeAction {
			
				/** Install everything. */
				'all'?: boolean| undefined | null
		}

		interface SetupVscodeActionSchema extends SpruceSchema.Schema {
			id: 'setupVscodeAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Setup vscode action',
			description: 'Install vscode extensions, launch configs, and settings the Spruce team uses in-house!',
			    fields: {
			            /** Install everything. */
			            'all': {
			                label: 'Install everything',
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type SetupVscodeActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.SetupVscodeActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface RegisterDashboardWidgetsEmitPayloadSchema {
			
				
				'widgets'?: (BaseWidget)| undefined | null
		}

		interface RegisterDashboardWidgetsEmitPayloadSchemaSchema extends SpruceSchema.Schema {
			id: 'registerDashboardWidgetsEmitPayloadSchema',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'register dashboard widgets emit payload schema',
			    fields: {
			            /** . */
			            'widgets': {
			                type: 'raw',
			                options: {valueType: `BaseWidget`,}
			            },
			    }
		}

		type RegisterDashboardWidgetsEmitPayloadSchemaEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.RegisterDashboardWidgetsEmitPayloadSchemaSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** A stripped down cli user with token details for login */
		interface PersonWithToken {
			
				/** Id. */
				'id': string
				/** Casual name. The name you can use when talking to this person. */
				'casualName': string
				
				'token': string
				/** Logged in. */
				'isLoggedIn'?: boolean| undefined | null
		}

		interface PersonWithTokenSchema extends SpruceSchema.Schema {
			id: 'personWithToken',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: '',
			description: 'A stripped down cli user with token details for login',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** Casual name. The name you can use when talking to this person. */
			            'casualName': {
			                label: 'Casual name',
			                type: 'text',
			                isRequired: true,
			                hint: 'The name you can use when talking to this person.',
			                options: undefined
			            },
			            /** . */
			            'token': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Logged in. */
			            'isLoggedIn': {
			                label: 'Logged in',
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type PersonWithTokenEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.PersonWithTokenSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Track onboarding progress and tutorials &amp; quizzes completed. */
		interface Onboarding {
			
				/** mode. */
				'mode': ("short" | "immersive" | "off")
				/** Stage. */
				'stage'?: ("test.create")| undefined | null
		}

		interface OnboardingSchema extends SpruceSchema.Schema {
			id: 'onboarding',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Onboarding',
			description: 'Track onboarding progress and tutorials & quizzes completed.',
			    fields: {
			            /** mode. */
			            'mode': {
			                label: 'mode',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"label":"Short","value":"short"},{"label":"Immersive","value":"immersive"},{"label":"Off","value":"off"}],}
			            },
			            /** Stage. */
			            'stage': {
			                label: 'Stage',
			                type: 'select',
			                options: {choices: [{"label":"Create test","value":"test.create"}],}
			            },
			    }
		}

		type OnboardingEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.OnboardingSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface OnboardAction {
			
		}

		interface OnboardActionSchema extends SpruceSchema.Schema {
			id: 'onboardAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Onboard action',
			    fields: {
			    }
		}

		type OnboardActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.OnboardActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** Used to collect input on the names of a class or interface */
		interface NamedTemplateItem {
			
				/** Readable name. The name people will read */
				'nameReadable': string
				/** Camel case name. camelCase version of the name */
				'nameCamel': string
				/** Plural camel case name. camelCase version of the name */
				'nameCamelPlural'?: string| undefined | null
				/** Pascal case name. PascalCase of the name */
				'namePascal'?: string| undefined | null
				/** Plural Pascal case name. PascalCase of the name */
				'namePascalPlural'?: string| undefined | null
				/** Constant case name. CONST_CASE of the name */
				'nameConst'?: string| undefined | null
				/** Kebab case name. kebab-case of the name */
				'nameKebab'?: string| undefined | null
				/** Description. Describe a bit more here */
				'description'?: string| undefined | null
		}

		interface NamedTemplateItemSchema extends SpruceSchema.Schema {
			id: 'namedTemplateItem',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'NamedTemplateItem',
			description: 'Used to collect input on the names of a class or interface',
			    fields: {
			            /** Readable name. The name people will read */
			            'nameReadable': {
			                label: 'Readable name',
			                type: 'text',
			                isRequired: true,
			                hint: 'The name people will read',
			                options: undefined
			            },
			            /** Camel case name. camelCase version of the name */
			            'nameCamel': {
			                label: 'Camel case name',
			                type: 'text',
			                isRequired: true,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Plural camel case name. camelCase version of the name */
			            'nameCamelPlural': {
			                label: 'Plural camel case name',
			                type: 'text',
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Pascal case name. PascalCase of the name */
			            'namePascal': {
			                label: 'Pascal case name',
			                type: 'text',
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Plural Pascal case name. PascalCase of the name */
			            'namePascalPlural': {
			                label: 'Plural Pascal case name',
			                type: 'text',
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Constant case name. CONST_CASE of the name */
			            'nameConst': {
			                label: 'Constant case name',
			                type: 'text',
			                hint: 'CONST_CASE of the name',
			                options: undefined
			            },
			            /** Kebab case name. kebab-case of the name */
			            'nameKebab': {
			                label: 'Kebab case name',
			                type: 'text',
			                hint: 'kebab-case of the name',
			                options: undefined
			            },
			            /** Description. Describe a bit more here */
			            'description': {
			                label: 'Description',
			                type: 'text',
			                hint: 'Describe a bit more here',
			                options: undefined
			            },
			    }
		}

		type NamedTemplateItemEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.NamedTemplateItemSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		
		interface InstallSkillAtOrganizationAction {
			
				/** Organization id. */
				'organizationId'?: string| undefined | null
		}

		interface InstallSkillAtOrganizationActionSchema extends SpruceSchema.Schema {
			id: 'installSkillAtOrganizationAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'install skill at organization action',
			    fields: {
			            /** Organization id. */
			            'organizationId': {
			                label: 'Organization id',
			                type: 'id',
			                options: undefined
			            },
			    }
		}

		type InstallSkillAtOrganizationActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.InstallSkillAtOrganizationActionSchema>

	}


	namespace SpruceSchemas.SpruceCli.v2020_07_22 {

		/** The options for skill.boot. */
		interface BootSkillAction {
			
				/** Run local. Will run using ts-node and typescript directly. Longer boot times */
				'local'?: boolean| undefined | null
		}

		interface BootSkillActionSchema extends SpruceSchema.Schema {
			id: 'bootSkillAction',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Boot skill action',
			description: 'The options for skill.boot.',
			    fields: {
			            /** Run local. Will run using ts-node and typescript directly. Longer boot times */
			            'local': {
			                label: 'Run local',
			                type: 'boolean',
			                hint: 'Will run using ts-node and typescript directly. Longer boot times',
			                options: undefined
			            },
			    }
		}

		type BootSkillActionEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.BootSkillActionSchema>

	}



















}
