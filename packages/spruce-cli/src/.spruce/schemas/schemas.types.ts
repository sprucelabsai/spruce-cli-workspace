/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import '@sprucelabs/mercury-types'
import '@sprucelabs/mercury-types'
import { BaseWidget } from '#spruce/../widgets/types/widgets.types'

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {














	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DidMessageEmitPayload {
			
				
				'message': SpruceSchemas.Spruce.v2020_07_22.Message
				
				'conversationState'?: string| undefined | null
				
				'topic'?: string| undefined | null
		}

		interface DidMessageEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'didMessageEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'message': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.MessageSchema,}
			            },
			            /** . */
			            'conversationState': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'topic': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type DidMessageEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DidMessageEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DidMessageEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.DidMessageEmitPayload
		}

		interface DidMessageEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'didMessageEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.DidMessageEmitPayloadSchema,}
			            },
			    }
		}

		type DidMessageEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DidMessageEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ConversationTopic {
			
				
				'key': string
				
				'confidence': number
				
				'label': string
		}

		interface ConversationTopicSchema extends SpruceSchema.Schema {
			id: 'conversationTopic',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'key': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'confidence': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'label': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type ConversationTopicEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ConversationTopicSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DidMessageResponsePayload {
			
				
				'transitionConversationTo'?: ("greeting" | "discovery" | "topic" | "closing")| undefined | null
				
				'suggestedTopics'?: SpruceSchemas.MercuryApi.v2020_12_25.ConversationTopic[]| undefined | null
		}

		interface DidMessageResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'didMessageResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'transitionConversationTo': {
			                type: 'select',
			                options: {choices: [{"label":"Greeting","value":"greeting"},{"label":"Discovery","value":"discovery"},{"label":"Topic","value":"topic"},{"label":"Closing","value":"closing"}],}
			            },
			            /** . */
			            'suggestedTopics': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.ConversationTopicSchema,}
			            },
			    }
		}

		type DidMessageResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DidMessageResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface AuthenticateEmitPayload {
			
				
				'token'?: string| undefined | null
				
				'skillId'?: string| undefined | null
				
				'apiKey'?: string| undefined | null
		}

		interface AuthenticateEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateEmitPayload',
			version: 'v2020_12_25',
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

		type AuthenticateEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface AuthenticateEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitPayload
		}

		interface AuthenticateEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitPayloadSchema,}
			            },
			    }
		}

		type AuthenticateEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface AuthSchema {
			
				
				'person'?: SpruceSchemas.Spruce.v2020_07_22.Person| undefined | null
				
				'skill'?: SpruceSchemas.Spruce.v2020_07_22.Skill| undefined | null
		}

		interface AuthSchemaSchema extends SpruceSchema.Schema {
			id: 'authSchema',
			version: 'v2020_12_25',
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

		type AuthSchemaEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.AuthSchemaSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface AuthenticateResponsePayload {
			
				
				'type': ("authenticated" | "anonymous")
				
				'auth': SpruceSchemas.MercuryApi.v2020_12_25.AuthSchema
		}

		interface AuthenticateResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'authenticateResponsePayload',
			version: 'v2020_12_25',
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
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.AuthSchemaSchema,}
			            },
			    }
		}

		type AuthenticateResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.AuthenticateResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CanListenEmitPayload {
			
				
				'authorizerStatuses'?: ("clockedIn" | "clockedOut" | "onPrem" | "offPrem")| undefined | null
				
				'fullyQualifiedEventName': string
		}

		interface CanListenEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'canListenEmitPayload',
			version: 'v2020_12_25',
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

		type CanListenEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CanListenEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitPayload
		}

		interface CanListenEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'canListenEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitPayloadSchema,}
			            },
			    }
		}

		type CanListenEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CanListenEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CanListenResponsePayload {
			
				
				'can'?: boolean| undefined | null
		}

		interface CanListenResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'canListenResponsePayload',
			version: 'v2020_12_25',
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

		type CanListenResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CanListenResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ConfirmPinEmitPayload {
			
				
				'challenge': string
				
				'pin': string
		}

		interface ConfirmPinEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinEmitPayload',
			version: 'v2020_12_25',
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

		type ConfirmPinEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ConfirmPinEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitPayload
		}

		interface ConfirmPinEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitPayloadSchema,}
			            },
			    }
		}

		type ConfirmPinEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ConfirmPinRespondPayload {
			
				
				'person': SpruceSchemas.Spruce.v2020_07_22.Person
				
				'token': string
		}

		interface ConfirmPinRespondPayloadSchema extends SpruceSchema.Schema {
			id: 'confirmPinRespondPayload',
			version: 'v2020_12_25',
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

		type ConfirmPinRespondPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ConfirmPinRespondPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type CreateLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateLocationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationEmitPayload
		}

		interface CreateLocationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createLocationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationEmitPayloadSchema,}
			            },
			    }
		}

		type CreateLocationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface CreateLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createLocationResponsePayload',
			version: 'v2020_12_25',
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

		type CreateLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateOrgEmitPayload {
			
				/** Name. */
				'name': string
				
				'slug'?: string| undefined | null
				
				'dateDeleted'?: number| undefined | null
		}

		interface CreateOrgEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'createOrgEmitPayload',
			version: 'v2020_12_25',
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

		type CreateOrgEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateOrgEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateOrganizationEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.CreateOrgEmitPayload
		}

		interface CreateOrganizationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createOrganizationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.CreateOrgEmitPayloadSchema,}
			            },
			    }
		}

		type CreateOrganizationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateOrganizationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface CreateOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createOrgResponsePayload',
			version: 'v2020_12_25',
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

		type CreateOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type CreateRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateRoleEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleEmitPayload
		}

		interface CreateRoleEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'createRoleEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleEmitPayloadSchema,}
			            },
			    }
		}

		type CreateRoleEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface CreateRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface CreateRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'createRoleResponsePayload',
			version: 'v2020_12_25',
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

		type CreateRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.CreateRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteLocationEmitPayload {
			
				
				'id': string
		}

		interface DeleteLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationEmitPayload',
			version: 'v2020_12_25',
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

		type DeleteLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteLocationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationEmitPayload
		}

		interface DeleteLocationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationEmitPayloadSchema,}
			            },
			    }
		}

		type DeleteLocationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface DeleteLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteLocationResponsePayload',
			version: 'v2020_12_25',
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

		type DeleteLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteOrganizationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
		}

		interface DeleteOrganizationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteOrganizationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			    }
		}

		type DeleteOrganizationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteOrganizationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface DeleteOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteOrgResponsePayload',
			version: 'v2020_12_25',
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

		type DeleteOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteRoleEmitPayload {
			
				
				'id': string
				
				'organizationId'?: string| undefined | null
		}

		interface DeleteRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleEmitPayload',
			version: 'v2020_12_25',
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

		type DeleteRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteRoleEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleEmitPayload
		}

		interface DeleteRoleEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleEmitPayloadSchema,}
			            },
			    }
		}

		type DeleteRoleEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface DeleteRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface DeleteRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'deleteRoleResponsePayload',
			version: 'v2020_12_25',
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

		type DeleteRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.DeleteRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetConversationTopicsTopic {
			
				
				'key': string
		}

		interface GetConversationTopicsTopicSchema extends SpruceSchema.Schema {
			id: 'getConversationTopicsTopic',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'key': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type GetConversationTopicsTopicEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsTopicSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetConversationTopicsResponsePayload {
			
				
				'topics': SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsTopic[]
		}

		interface GetConversationTopicsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getConversationTopicsResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'topics': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsTopicSchema,}
			            },
			    }
		}

		type GetConversationTopicsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetConversationTopicsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetEventContractsResponsePayload {
			
				
				'contracts': SpruceSchemas.MercuryTypes.v2020_09_01.EventContract[]
		}

		interface GetEventContractsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getEventContractsResponsePayload',
			version: 'v2020_12_25',
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

		type GetEventContractsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetEventContractsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetLocationEmitPayload {
			
				
				'id': string
		}

		interface GetLocationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationEmitPayload',
			version: 'v2020_12_25',
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

		type GetLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetLocationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.GetLocationEmitPayload
		}

		interface GetLocationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.GetLocationEmitPayloadSchema,}
			            },
			    }
		}

		type GetLocationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetLocationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface GetLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getLocationResponsePayload',
			version: 'v2020_12_25',
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

		type GetLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetOrganizationEmitPayload {
			
				
				'id': string
		}

		interface GetOrganizationEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getOrganizationEmitPayload',
			version: 'v2020_12_25',
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

		type GetOrganizationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetOrganizationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetOrganizationEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.GetOrganizationEmitPayload
		}

		interface GetOrganizationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getOrganizationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.GetOrganizationEmitPayloadSchema,}
			            },
			    }
		}

		type GetOrganizationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetOrganizationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetOrgResponsePayload {
			
				
				'organization': SpruceSchemas.Spruce.v2020_07_22.Organization
		}

		interface GetOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getOrgResponsePayload',
			version: 'v2020_12_25',
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

		type GetOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetRoleEmitPayload {
			
				
				'id': string
		}

		interface GetRoleEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleEmitPayload',
			version: 'v2020_12_25',
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

		type GetRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetRoleEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.GetRoleEmitPayload
		}

		interface GetRoleEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.GetRoleEmitPayloadSchema,}
			            },
			    }
		}

		type GetRoleEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetRoleEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface GetRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getRoleResponsePayload',
			version: 'v2020_12_25',
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

		type GetRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetRoleResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetSkillEmitPayload {
			
				
				'id': string
		}

		interface GetSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillEmitPayload',
			version: 'v2020_12_25',
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

		type GetSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetSkillEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitPayload
		}

		interface GetSkillEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitPayloadSchema,}
			            },
			    }
		}

		type GetSkillEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetSkillEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface GetSkillResponsePayload {
			
				
				'skill': SpruceSchemas.Spruce.v2020_07_22.Skill
		}

		interface GetSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'getSkillResponsePayload',
			version: 'v2020_12_25',
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

		type GetSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.GetSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface HealthCheckItem {
			
				
				'status'?: ("passed")| undefined | null
		}

		interface HealthCheckItemSchema extends SpruceSchema.Schema {
			id: 'healthCheckItem',
			version: 'v2020_12_25',
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

		type HealthCheckItemEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.HealthCheckItemSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface HealthResponsePayload {
			
				
				'skill'?: SpruceSchemas.MercuryApi.v2020_12_25.HealthCheckItem| undefined | null
				
				'mercury'?: SpruceSchemas.MercuryApi.v2020_12_25.HealthCheckItem| undefined | null
		}

		interface HealthResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'healthResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'skill': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.HealthCheckItemSchema,}
			            },
			            /** . */
			            'mercury': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.HealthCheckItemSchema,}
			            },
			    }
		}

		type HealthResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.HealthResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface InstallSkillEmitPayload {
			
				
				'skillId': string
		}

		interface InstallSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillEmitPayload',
			version: 'v2020_12_25',
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

		type InstallSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface InstallSkillEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitPayload
		}

		interface InstallSkillEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitPayloadSchema,}
			            },
			    }
		}

		type InstallSkillEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface InstallSkillResponsePayload {
			
		}

		interface InstallSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'installSkillResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type InstallSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.InstallSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface IsSkillInstalledEmitPayload {
			
				
				'skillId': string
		}

		interface IsSkillInstalledEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledEmitPayload',
			version: 'v2020_12_25',
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

		type IsSkillInstalledEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface IsSkillInstalledEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledEmitPayload
		}

		interface IsSkillInstalledEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledEmitPayloadSchema,}
			            },
			    }
		}

		type IsSkillInstalledEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface IsSkillInstalledResponsePayload {
			
				
				'isInstalled'?: boolean| undefined | null
		}

		interface IsSkillInstalledResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'isSkillInstalledResponsePayload',
			version: 'v2020_12_25',
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

		type IsSkillInstalledResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.IsSkillInstalledResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListLocationsEmitPayload {
			
				
				'includePrivateLocations'?: boolean| undefined | null
		}

		interface ListLocationsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsEmitPayload',
			version: 'v2020_12_25',
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

		type ListLocationsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListLocationsEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsEmitPayload
		}

		interface ListLocationsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsEmitPayloadSchema,}
			            },
			    }
		}

		type ListLocationsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListLocationsResponsePayload {
			
				
				'locations': SpruceSchemas.Spruce.v2020_07_22.Location[]
		}

		interface ListLocationsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listLocationsResponsePayload',
			version: 'v2020_12_25',
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

		type ListLocationsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListLocationsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListOrgsEmitPayload {
			
				
				'showMineOnly'?: boolean| undefined | null
		}

		interface ListOrgsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listOrgsEmitPayload',
			version: 'v2020_12_25',
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

		type ListOrgsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListOrganizationsEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsEmitPayload
		}

		interface ListOrganizationsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listOrganizationsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsEmitPayloadSchema,}
			            },
			    }
		}

		type ListOrganizationsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListOrganizationsEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListOrgsResponsePayload {
			
				
				'organizations': SpruceSchemas.Spruce.v2020_07_22.Organization[]
		}

		interface ListOrgsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listOrgsResponsePayload',
			version: 'v2020_12_25',
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

		type ListOrgsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListOrgsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListRolesEmitPayload {
			
				
				'includePrivateRoles'?: boolean| undefined | null
		}

		interface ListRolesEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesEmitPayload',
			version: 'v2020_12_25',
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

		type ListRolesEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListRolesEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListRolesEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.ListRolesEmitPayload
		}

		interface ListRolesEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.ListRolesEmitPayloadSchema,}
			            },
			    }
		}

		type ListRolesEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListRolesEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ListRolesResponsePayload {
			
				
				'roles': SpruceSchemas.Spruce.v2020_07_22.Role[]
		}

		interface ListRolesResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'listRolesResponsePayload',
			version: 'v2020_12_25',
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

		type ListRolesResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ListRolesResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface LogoutResponsePayload {
			
		}

		interface LogoutResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'logoutResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type LogoutResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.LogoutResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterConversationTopicsEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsEmitPayload
		}

		interface RegisterConversationTopicsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerConversationTopicsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterConversationTopicsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterConversationTopicEmitPayloadTopic {
			
				/** Key. A way to identify this topic, must be unique for your skill. */
				'key': string
		}

		interface RegisterConversationTopicEmitPayloadTopicSchema extends SpruceSchema.Schema {
			id: 'registerConversationTopicEmitPayloadTopic',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** Key. A way to identify this topic, must be unique for your skill. */
			            'key': {
			                label: 'Key',
			                type: 'text',
			                isRequired: true,
			                hint: 'A way to identify this topic, must be unique for your skill.',
			                options: undefined
			            },
			    }
		}

		type RegisterConversationTopicEmitPayloadTopicEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicEmitPayloadTopicSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterConversationTopicsEmitPayload {
			
				
				'topics': SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicEmitPayloadTopic[]
		}

		interface RegisterConversationTopicsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerConversationTopicsEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'topics': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicEmitPayloadTopicSchema,}
			            },
			    }
		}

		type RegisterConversationTopicsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterConversationTopicsResponsePayload {
			
		}

		interface RegisterConversationTopicsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'registerConversationTopicsResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type RegisterConversationTopicsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterConversationTopicsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterEventsEmitPayload {
			
				
				'contract': SpruceSchemas.MercuryTypes.v2020_09_01.EventContract
		}

		interface RegisterEventsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsEmitPayload',
			version: 'v2020_12_25',
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

		type RegisterEventsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterEventsEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitPayload
		}

		interface RegisterEventsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterEventsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsEmitTargetAndPayloadSchema>

	}




	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterEventsResponsePayload {
			
		}

		interface RegisterEventsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'registerEventsResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type RegisterEventsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterEventsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterListenersEmitPayload {
			
				
				'fullyQualifiedEventNames': string[]
		}

		interface RegisterListenersEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'registerListenersEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'fullyQualifiedEventNames': {
			                type: 'text',
			                isRequired: true,
			                isArray: true,
			                options: undefined
			            },
			    }
		}

		type RegisterListenersEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterListenersEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitPayload
		}

		interface RegisterListenersEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerListenersEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterListenersEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterListenersEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type RegisterSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterSkillEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillEmitPayload
		}

		interface RegisterSkillEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'registerSkillEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillEmitPayloadSchema,}
			            },
			    }
		}

		type RegisterSkillEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RegisterSkillResponsePayload {
			
				
				'skill': SpruceSchemas.Spruce.v2020_07_22.Skill
		}

		interface RegisterSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'registerSkillResponsePayload',
			version: 'v2020_12_25',
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

		type RegisterSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RegisterSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RequestPinEmitPayload {
			
				
				'phone': string
		}

		interface RequestPinEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinEmitPayload',
			version: 'v2020_12_25',
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

		type RequestPinEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RequestPinEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RequestPinEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.RequestPinEmitPayload
		}

		interface RequestPinEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.RequestPinEmitPayloadSchema,}
			            },
			    }
		}

		type RequestPinEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RequestPinEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface RequestPinResponsePayload {
			
				
				'challenge': string
		}

		interface RequestPinResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'requestPinResponsePayload',
			version: 'v2020_12_25',
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

		type RequestPinResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.RequestPinResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface ScrambleAccountResponsePayload {
			
		}

		interface ScrambleAccountResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'scrambleAccountResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type ScrambleAccountResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.ScrambleAccountResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface SendMessageEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitPayload
		}

		interface SendMessageEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'sendMessageEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitPayloadSchema,}
			            },
			    }
		}

		type SendMessageEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface SendMessageMessagePayload {
			
				
				'classification': ("auth" | "transactional" | "promotional" | "incoming")
				
				'body': string
				
				'context'?: (Record<string, any>)| undefined | null
				
				'topicId'?: string| undefined | null
				
				'choices'?: SpruceSchemas.Spruce.v2020_07_22.FullMessageChoices[]| undefined | null
		}

		interface SendMessageMessagePayloadSchema extends SpruceSchema.Schema {
			id: 'sendMessageMessagePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'classification': {
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"auth","label":"Auth"},{"value":"transactional","label":"transactional"},{"value":"promotional","label":"Promotional"},{"value":"incoming","label":"incoming"}],}
			            },
			            /** . */
			            'body': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'context': {
			                type: 'raw',
			                isPrivate: true,
			                options: {valueType: `Record<string, any>`,}
			            },
			            /** . */
			            'topicId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'choices': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.FullMessageChoicesSchema,}
			            },
			    }
		}

		type SendMessageMessagePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.SendMessageMessagePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface SendMessageEmitPayload {
			
				
				'message': SpruceSchemas.MercuryApi.v2020_12_25.SendMessageMessagePayload
		}

		interface SendMessageEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'sendMessageEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'message': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.SendMessageMessagePayloadSchema,}
			            },
			    }
		}

		type SendMessageEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.SendMessageEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface SendMessageResponsePayload {
			
				
				'message': SpruceSchemas.Spruce.v2020_07_22.Message
		}

		interface SendMessageResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'sendMessageResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'message': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.MessageSchema,}
			            },
			    }
		}

		type SendMessageResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.SendMessageResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnInstallSkillEmitPayload {
			
				
				'skillId': string
		}

		interface UnInstallSkillEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unInstallSkillEmitPayload',
			version: 'v2020_12_25',
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

		type UnInstallSkillEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnInstallSkillEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UninstallSkillEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UnInstallSkillEmitPayload
		}

		interface UninstallSkillEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'uninstallSkillEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UnInstallSkillEmitPayloadSchema,}
			            },
			    }
		}

		type UninstallSkillEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UninstallSkillEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnInstallSkillResponsePayload {
			
		}

		interface UnInstallSkillResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unInstallSkillResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type UnInstallSkillResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnInstallSkillResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterConversationTopicsEmitPayload {
			
				
				'topics'?: string[]| undefined | null
				
				'shouldUnregisterAll'?: boolean| undefined | null
		}

		interface UnregisterConversationTopicsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterConversationTopicsEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'topics': {
			                type: 'text',
			                isArray: true,
			                options: undefined
			            },
			            /** . */
			            'shouldUnregisterAll': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type UnregisterConversationTopicsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterConversationTopicsEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitPayload
		}

		interface UnregisterConversationTopicsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterConversationTopicsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitPayloadSchema,}
			            },
			    }
		}

		type UnregisterConversationTopicsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterConversationTopicsResponsePayload {
			
		}

		interface UnregisterConversationTopicsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterConversationTopicsResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type UnregisterConversationTopicsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterConversationTopicsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterEventsEmitPayload {
			
				
				'eventNames'?: string[]| undefined | null
				
				'shouldUnregisterAll'?: boolean| undefined | null
		}

		interface UnregisterEventsEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterEventsEmitPayload',
			version: 'v2020_12_25',
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
			            'shouldUnregisterAll': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type UnregisterEventsEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterEventsEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitPayload
		}

		interface UnregisterEventsEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterEventsEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitPayloadSchema,}
			            },
			    }
		}

		type UnregisterEventsEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterEventsResponsePayload {
			
		}

		interface UnregisterEventsResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterEventsResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			    }
		}

		type UnregisterEventsResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterEventsResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterListenersEmitPayload {
			
				
				'fullyQualifiedEventNames'?: string[]| undefined | null
				
				'shouldUnregisterAll'?: boolean| undefined | null
		}

		interface UnregisterListenersEmitPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterListenersEmitPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'fullyQualifiedEventNames': {
			                type: 'text',
			                isArray: true,
			                options: undefined
			            },
			            /** . */
			            'shouldUnregisterAll': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type UnregisterListenersEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterListenersEmitTargetAndPayload {
			
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitPayload
		}

		interface UnregisterListenersEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterListenersEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitPayloadSchema,}
			            },
			    }
		}

		type UnregisterListenersEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UnregisterListenersResponsePayload {
			
				
				'unregisterCount': number
		}

		interface UnregisterListenersResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'unregisterListenersResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'unregisterCount': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type UnregisterListenersResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UnregisterListenersResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type UpdateLocationEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateLocationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationEmitPayload
		}

		interface UpdateLocationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateLocationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationEmitPayloadSchema,}
			            },
			    }
		}

		type UpdateLocationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateLocationResponsePayload {
			
				
				'location': SpruceSchemas.Spruce.v2020_07_22.Location
		}

		interface UpdateLocationResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateLocationResponsePayload',
			version: 'v2020_12_25',
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

		type UpdateLocationResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateLocationResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateOrgWithoutSlugSchema {
			
				/** Name. */
				'name'?: string| undefined | null
				
				'dateCreated'?: number| undefined | null
				
				'dateDeleted'?: number| undefined | null
		}

		interface UpdateOrgWithoutSlugSchemaSchema extends SpruceSchema.Schema {
			id: 'updateOrgWithoutSlugSchema',
			version: 'v2020_12_25',
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

		type UpdateOrgWithoutSlugSchemaEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgWithoutSlugSchemaSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type UpdateOrgEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateOrgResponsePayload {
			
				
				'organization': SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrg
		}

		interface UpdateOrgResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateOrgResponsePayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'organization': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgSchema,}
			            },
			    }
		}

		type UpdateOrgResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgResponsePayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface EventTarget {
			
				
				'locationId'?: string| undefined | null
				
				'personId'?: string| undefined | null
				
				'organizationId'?: string| undefined | null
				
				'skillId'?: string| undefined | null
		}

		interface EventTargetSchema extends SpruceSchema.Schema {
			id: 'eventTarget',
			version: 'v2020_12_25',
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
			            'skillId': {
			                type: 'id',
			                options: undefined
			            },
			    }
		}

		type EventTargetEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateOrganizationEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgWithoutSlugSchema
		}

		interface UpdateOrganizationEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateOrganizationEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrgWithoutSlugSchemaSchema,}
			            },
			    }
		}

		type UpdateOrganizationEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateOrganizationEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
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
			version: 'v2020_12_25',
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

		type UpdateRoleEmitPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleEmitPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateRoleEmitTargetAndPayload {
			
				
				'target': SpruceSchemas.MercuryApi.v2020_12_25.EventTarget
				
				'payload': SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleEmitPayload
		}

		interface UpdateRoleEmitTargetAndPayloadSchema extends SpruceSchema.Schema {
			id: 'updateRoleEmitTargetAndPayload',
			version: 'v2020_12_25',
			namespace: 'MercuryApi',
			name: '',
			    fields: {
			            /** . */
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.EventTargetSchema,}
			            },
			            /** . */
			            'payload': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleEmitPayloadSchema,}
			            },
			    }
		}

		type UpdateRoleEmitTargetAndPayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleEmitTargetAndPayloadSchema>

	}


	namespace SpruceSchemas.MercuryApi.v2020_12_25 {

		
		interface UpdateRoleResponsePayload {
			
				
				'role': SpruceSchemas.Spruce.v2020_07_22.Role
		}

		interface UpdateRoleResponsePayloadSchema extends SpruceSchema.Schema {
			id: 'updateRoleResponsePayload',
			version: 'v2020_12_25',
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

		type UpdateRoleResponsePayloadEntity = SchemaEntity<SpruceSchemas.MercuryApi.v2020_12_25.UpdateRoleResponsePayloadSchema>

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

		
		interface TestOptions {
			
				/** Report while running. Should I output the test results while they are running? */
				'shouldReportWhileRunning'?: boolean| undefined | null
				/** Pattern. I'll filter all tests that match this pattern */
				'pattern'?: string| undefined | null
				/** Inspect. Pass --inspect related args to test process. */
				'inspect'?: number| undefined | null
				/** Should wait for manual start?. */
				'shouldHoldAtStart'?: boolean| undefined | null
				/** Wait until tests are finished. For testing. Returns immediately after executing test so the running process can be managed programatically. */
				'shouldWaitUntilTestsAreFinished'?: boolean| undefined | null
				/** Watch. */
				'watchMode'?: ("off" | "standard" | "smart")| undefined | null
		}

		interface TestOptionsSchema extends SpruceSchema.Schema {
			id: 'testOptions',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Test skill',
			    fields: {
			            /** Report while running. Should I output the test results while they are running? */
			            'shouldReportWhileRunning': {
			                label: 'Report while running',
			                type: 'boolean',
			                hint: 'Should I output the test results while they are running?',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Pattern. I'll filter all tests that match this pattern */
			            'pattern': {
			                label: 'Pattern',
			                type: 'text',
			                hint: 'I\'ll filter all tests that match this pattern',
			                options: undefined
			            },
			            /** Inspect. Pass --inspect related args to test process. */
			            'inspect': {
			                label: 'Inspect',
			                type: 'number',
			                hint: 'Pass --inspect related args to test process.',
			                options: undefined
			            },
			            /** Should wait for manual start?. */
			            'shouldHoldAtStart': {
			                label: 'Should wait for manual start?',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Wait until tests are finished. For testing. Returns immediately after executing test so the running process can be managed programatically. */
			            'shouldWaitUntilTestsAreFinished': {
			                label: 'Wait until tests are finished',
			                type: 'boolean',
			                isPrivate: true,
			                hint: 'For testing. Returns immediately after executing test so the running process can be managed programatically.',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Watch. */
			            'watchMode': {
			                label: 'Watch',
			                type: 'select',
			                options: {choices: [{"value":"off","label":"Off"},{"value":"standard","label":"Standard"},{"value":"smart","label":"Smart"}],}
			            },
			    }
		}

		type TestOptionsEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.TestOptionsSchema>

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

		
		interface CreateConversationTopicOptions {
			
				/** Readable name. The name people will read */
				'nameReadable': string
				/** Camel case name. camelCase version of the name */
				'nameCamel': string
		}

		interface CreateConversationTopicOptionsSchema extends SpruceSchema.Schema {
			id: 'createConversationTopicOptions',
			version: 'v2020_07_22',
			namespace: 'SpruceCli',
			name: 'Define a topic you want to discuss.',
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
			    }
		}

		type CreateConversationTopicOptionsEntity = SchemaEntity<SpruceSchemas.SpruceCli.v2020_07_22.CreateConversationTopicOptionsSchema>

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
