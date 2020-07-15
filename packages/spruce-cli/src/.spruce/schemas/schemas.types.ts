/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as Schema } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

import FieldType from '#spruce/schemas/fields/fieldTypeEnum'


	export declare namespace SpruceSchemas.Spruce.IProfileImage {
		/**  */
		export interface v2020_07_22 {
			
				/** 60x60. */
				'profile60': string
				/** 150x150. */
				'profile150': string
				/** 60x60. */
				'profile60@2x': string
				/** 150x150. */
				'profile150@2x': string
		}

	}

	export declare namespace SpruceSchemas.Spruce.ProfileImage.v2020_07_22 {
		/** The interface for the schema definition for a Profile Image Sizes */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'profileImage',
			name: 'Profile Image Sizes',
			    fields: {
			            /** 60x60. */
			            'profile60': {
			                label: '60x60',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** 150x150. */
			            'profile150': {
			                label: '150x150',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** 60x60. */
			            'profile60@2x': {
			                label: '60x60',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** 150x150. */
			            'profile150@2x': {
			                label: '150x150',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.ProfileImage.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.IPerson {
		/** A human being. */
		export interface v2020_07_22 {
			
				/** Id. */
				'id': string
				/** First name. */
				'firstName'?: string| undefined | null
				/** Last name. */
				'lastName'?: string| undefined | null
				/** Casual name. The name you can use when talking to this person. */
				'casualName': string
				/** Casual name. The name you can use when talking to this person. */
				'formalName': string
				/** Phone. A number that can be texted */
				'phoneNumber'?: string| undefined | null
				/** Profile photos. */
				'profileImages'?: SpruceSchemas.Spruce.IProfileImage.v2020_07_22| undefined | null
				/** Default profile photos. */
				'defaultProfileImages': SpruceSchemas.Spruce.IProfileImage.v2020_07_22
		}

	}

	export declare namespace SpruceSchemas.Spruce.Person.v2020_07_22 {
		/** The interface for the schema definition for a Person */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'person',
			name: 'Person',
			description: 'A human being.',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: FieldType.Id,
			                isRequired: true,
			                options: undefined
			            },
			            /** First name. */
			            'firstName': {
			                label: 'First name',
			                type: FieldType.Text,
			                options: undefined
			            },
			            /** Last name. */
			            'lastName': {
			                label: 'Last name',
			                type: FieldType.Text,
			                options: undefined
			            },
			            /** Casual name. The name you can use when talking to this person. */
			            'casualName': {
			                label: 'Casual name',
			                type: FieldType.Text,
			                isRequired: true,
			                hint: 'The name you can use when talking to this person.',
			                options: undefined
			            },
			            /** Casual name. The name you can use when talking to this person. */
			            'formalName': {
			                label: 'Casual name',
			                type: FieldType.Text,
			                isRequired: true,
			                hint: 'The name you can use when talking to this person.',
			                options: undefined
			            },
			            /** Phone. A number that can be texted */
			            'phoneNumber': {
			                label: 'Phone',
			                type: FieldType.Phone,
			                hint: 'A number that can be texted',
			                options: undefined
			            },
			            /** Profile photos. */
			            'profileImages': {
			                label: 'Profile photos',
			                type: FieldType.Schema,
			                options: {schemas: SpruceSchemas.Spruce.ProfileImage.v2020_07_22.IDefinition[],}
			            },
			            /** Default profile photos. */
			            'defaultProfileImages': {
			                label: 'Default profile photos',
			                type: FieldType.Schema,
			                isRequired: true,
			                options: {schemas: SpruceSchemas.Spruce.ProfileImage.v2020_07_22.IDefinition[],}
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.Person.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.ISkill {
		/** An ability Sprucebot has learned. */
		export interface v2020_07_22 {
			
				/** Id. */
				'id': string
				/** Id. */
				'apiKey': string
				/** Name. */
				'name': string
				/** Description. */
				'description'?: string| undefined | null
				/** Slug. */
				'slug'?: string| undefined | null
				/** Icon. */
				'icon'?: string| undefined | null
		}

	}

	export declare namespace SpruceSchemas.Spruce.Skill.v2020_07_22 {
		/** The interface for the schema definition for a Skill */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'skill',
			name: 'Skill',
			description: 'An ability Sprucebot has learned.',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: FieldType.Id,
			                isRequired: true,
			                options: undefined
			            },
			            /** Id. */
			            'apiKey': {
			                label: 'Id',
			                type: FieldType.Id,
			                isRequired: true,
			                options: undefined
			            },
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** Description. */
			            'description': {
			                label: 'Description',
			                type: FieldType.Text,
			                options: undefined
			            },
			            /** Slug. */
			            'slug': {
			                label: 'Slug',
			                type: FieldType.Text,
			                options: undefined
			            },
			            /** Icon. */
			            'icon': {
			                label: 'Icon',
			                type: FieldType.Text,
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.Skill.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.ILocation {
		/** A physical location where people meet. An organization has at least one of them. */
		export interface v2020_07_22 {
			
				/** Id. */
				'id'?: string| undefined | null
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
				'address': SpruceSchema.IAddressFieldValue
		}

	}

	export declare namespace SpruceSchemas.Spruce.Location.v2020_07_22 {
		/** The interface for the schema definition for a Location */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'location',
			name: 'Location',
			description: 'A physical location where people meet. An organization has at least one of them.',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: FieldType.Id,
			                options: undefined
			            },
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
			            'num': {
			                label: 'Store number',
			                type: FieldType.Text,
			                hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5',
			                options: undefined
			            },
			            /** Public. Is this location viewable by guests? */
			            'isPublic': {
			                label: 'Public',
			                type: FieldType.Boolean,
			                hint: 'Is this location viewable by guests?',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Main Phone. */
			            'phone': {
			                label: 'Main Phone',
			                type: FieldType.Phone,
			                options: undefined
			            },
			            /** Timezone. */
			            'timezone': {
			                label: 'Timezone',
			                type: FieldType.Select,
			                options: {choices: [{"value":"etc/gmt+12","label":"International Date Line West"},{"value":"pacific/midway","label":"Midway Island, Samoa"},{"value":"pacific/honolulu","label":"Hawaii"},{"value":"us/alaska","label":"Alaska"},{"value":"america/los_Angeles","label":"Pacific Time (US & Canada)"},{"value":"america/tijuana","label":"Tijuana, Baja California"},{"value":"us/arizona","label":"Arizona"},{"value":"america/chihuahua","label":"Chihuahua, La Paz, Mazatlan"},{"value":"us/mountain","label":"Mountain Time (US & Canada)"},{"value":"america/managua","label":"Central America"},{"value":"us/central","label":"Central Time (US & Canada)"},{"value":"america/mexico_City","label":"Guadalajara, Mexico City, Monterrey"},{"value":"Canada/Saskatchewan","label":"Saskatchewan"},{"value":"america/bogota","label":"Bogota, Lima, Quito, Rio Branco"},{"value":"us/eastern","label":"Eastern Time (US & Canada)"},{"value":"us/east-indiana","label":"Indiana (East)"},{"value":"Canada/atlantic","label":"Atlantic Time (Canada)"},{"value":"america/caracas","label":"Caracas, La Paz"},{"value":"america/manaus","label":"Manaus"},{"value":"america/Santiago","label":"Santiago"},{"value":"Canada/Newfoundland","label":"Newfoundland"},{"value":"america/Sao_Paulo","label":"Brasilia"},{"value":"america/argentina/buenos_Aires","label":"Buenos Aires, Georgetown"},{"value":"america/godthab","label":"Greenland"},{"value":"america/montevideo","label":"Montevideo"},{"value":"america/Noronha","label":"Mid-Atlantic"},{"value":"atlantic/cape_Verde","label":"Cape Verde Is."},{"value":"atlantic/azores","label":"Azores"},{"value":"africa/casablanca","label":"Casablanca, Monrovia, Reykjavik"},{"value":"etc/gmt","label":"Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"},{"value":"europe/amsterdam","label":"Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"},{"value":"europe/belgrade","label":"Belgrade, Bratislava, Budapest, Ljubljana, Prague"},{"value":"europe/brussels","label":"Brussels, Copenhagen, Madrid, Paris"},{"value":"europe/Sarajevo","label":"Sarajevo, Skopje, Warsaw, Zagreb"},{"value":"africa/lagos","label":"West Central Africa"},{"value":"asia/amman","label":"Amman"},{"value":"europe/athens","label":"Athens, Bucharest, Istanbul"},{"value":"asia/beirut","label":"Beirut"},{"value":"africa/cairo","label":"Cairo"},{"value":"africa/Harare","label":"Harare, Pretoria"},{"value":"europe/Helsinki","label":"Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"},{"value":"asia/Jerusalem","label":"Jerusalem"},{"value":"europe/minsk","label":"Minsk"},{"value":"africa/Windhoek","label":"Windhoek"},{"value":"asia/Kuwait","label":"Kuwait, Riyadh, Baghdad"},{"value":"europe/moscow","label":"Moscow, St. Petersburg, Volgograd"},{"value":"africa/Nairobi","label":"Nairobi"},{"value":"asia/tbilisi","label":"Tbilisi"},{"value":"asia/tehran","label":"Tehran"},{"value":"asia/muscat","label":"Abu Dhabi, Muscat"},{"value":"asia/baku","label":"Baku"},{"value":"asia/Yerevan","label":"Yerevan"},{"value":"asia/Kabul","label":"Kabul"},{"value":"asia/Yekaterinburg","label":"Yekaterinburg"},{"value":"asia/Karachi","label":"Islamabad, Karachi, Tashkent"},{"value":"asia/calcutta","label":"Chennai, Kolkata, Mumbai, New Delhi"},{"value":"asia/calcutta","label":"Sri Jayawardenapura"},{"value":"asia/Katmandu","label":"Kathmandu"},{"value":"asia/almaty","label":"Almaty, Novosibirsk"},{"value":"asia/Dhaka","label":"Astana, Dhaka"},{"value":"asia/Rangoon","label":"Yangon (Rangoon)"},{"value":"asia/bangkok","label":"Bangkok, Hanoi, Jakarta"},{"value":"asia/Krasnoyarsk","label":"Krasnoyarsk"},{"value":"asia/Hong_Kong","label":"Beijing, Chongqing, Hong Kong, Urumqi"},{"value":"asia/Kuala_Lumpur","label":"Kuala Lumpur, Singapore"},{"value":"asia/Irkutsk","label":"Irkutsk, Ulaan Bataar"},{"value":"Australia/Perth","label":"Perth"},{"value":"asia/taipei","label":"Taipei"},{"value":"asia/tokyo","label":"Osaka, Sapporo, Tokyo"},{"value":"asia/Seoul","label":"Seoul"},{"value":"asia/Yakutsk","label":"Yakutsk"},{"value":"Australia/adelaide","label":"Adelaide"},{"value":"Australia/Darwin","label":"Darwin"},{"value":"Australia/brisbane","label":"Brisbane"},{"value":"Australia/canberra","label":"Canberra, Melbourne, Sydney"},{"value":"Australia/Hobart","label":"Hobart"},{"value":"pacific/guam","label":"Guam, Port Moresby"},{"value":"asia/Vladivostok","label":"Vladivostok"},{"value":"asia/magadan","label":"Magadan, Solomon Is., New Caledonia"},{"value":"pacific/auckland","label":"Auckland, Wellington"},{"value":"pacific/Fiji","label":"Fiji, Kamchatka, Marshall Is."},{"value":"pacific/tongatapu","label":"Nuku'alofa"}],}
			            },
			            /** Address. */
			            'address': {
			                label: 'Address',
			                type: FieldType.Address,
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.Location.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.IJob {
		/** A position at a company. The answer to the question; What is your job? */
		export interface v2020_07_22 {
			
				/** Id. */
				'id'?: string| undefined | null
				/** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, manager, guest). */
				'isDefault': string
				/** Name. */
				'name': string
				/** Role. */
				'role': ("owner" | "groupManager" | "manager" | "teammate" | "guest")
				/** On work permissions. */
				'inStoreAcls'?: SpruceSchemas.Spruce.IAcl.v2020_07_22| undefined | null
				/** Off work permissions. */
				'acls'?: SpruceSchemas.Spruce.IAcl.v2020_07_22| undefined | null
		}

	}

	export declare namespace SpruceSchemas.Spruce.Job.v2020_07_22 {
		/** The interface for the schema definition for a Job */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'job',
			name: 'Job',
			description: 'A position at a company. The answer to the question; What is your job?',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: FieldType.Id,
			                options: undefined
			            },
			            /** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, manager, guest). */
			            'isDefault': {
			                label: 'Is default',
			                type: FieldType.Text,
			                isRequired: true,
			                hint: 'Is this job one that comes with every org? Mapped to roles (owner, groupManager, manager, guest).',
			                options: undefined
			            },
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** Role. */
			            'role': {
			                label: 'Role',
			                type: FieldType.Select,
			                isRequired: true,
			                options: {choices: [{"value":"owner","label":"Owner"},{"value":"groupManager","label":"District/region manager"},{"value":"manager","label":"Manager"},{"value":"teammate","label":"Teammate"},{"value":"guest","label":"Guest"}],}
			            },
			            /** On work permissions. */
			            'inStoreAcls': {
			                label: 'On work permissions',
			                type: FieldType.Schema,
			                options: {schemas: SpruceSchemas.Spruce.Acl.v2020_07_22.IDefinition[],}
			            },
			            /** Off work permissions. */
			            'acls': {
			                label: 'Off work permissions',
			                type: FieldType.Schema,
			                options: {schemas: SpruceSchemas.Spruce.Acl.v2020_07_22.IDefinition[],}
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.Job.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.IPersonLocation {
		/**  */
		export interface v2020_07_22 {
			
				/** Id. */
				'id'?: string| undefined | null
				/** Name. */
				'roles': ("owner" | "groupManager" | "manager" | "teammate" | "guest")
				/** Status. */
				'status'?: string| undefined | null
				/** Total visits. */
				'visits': number
				/** Last visit. */
				'lastRecordedVisit'?: SpruceSchema.IDateTimeFieldValue| undefined | null
				/** Job. */
				'job': SpruceSchemas.Spruce.IJob.v2020_07_22
				/** Location. */
				'location': SpruceSchemas.Spruce.ILocation.v2020_07_22
				/** Person. */
				'person': SpruceSchemas.Spruce.IPerson.v2020_07_22
		}

	}

	export declare namespace SpruceSchemas.Spruce.PersonLocation.v2020_07_22 {
		/** The interface for the schema definition for a Person &lt;-&gt; location relationship */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'personLocation',
			name: 'Person <-> location relationship',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: FieldType.Id,
			                options: undefined
			            },
			            /** Name. */
			            'roles': {
			                label: 'Name',
			                type: FieldType.Select,
			                isRequired: true,
			                isArray: true,
			                options: {choices: [{"value":"owner","label":"Owner"},{"value":"groupManager","label":"District/region manager"},{"value":"manager","label":"Manager"},{"value":"teammate","label":"Teammate"},{"value":"guest","label":"Guest"}],}
			            },
			            /** Status. */
			            'status': {
			                label: 'Status',
			                type: FieldType.Text,
			                options: undefined
			            },
			            /** Total visits. */
			            'visits': {
			                label: 'Total visits',
			                type: FieldType.Number,
			                isRequired: true,
			                options: {choices: [{"value":"owner","label":"Owner"},{"value":"groupManager","label":"District/region manager"},{"value":"manager","label":"Manager"},{"value":"teammate","label":"Teammate"},{"value":"guest","label":"Guest"}],}
			            },
			            /** Last visit. */
			            'lastRecordedVisit': {
			                label: 'Last visit',
			                type: FieldType.DateTime,
			                options: undefined
			            },
			            /** Job. */
			            'job': {
			                label: 'Job',
			                type: FieldType.Schema,
			                isRequired: true,
			                options: {schemas: SpruceSchemas.Spruce.Job.v2020_07_22.IDefinition[],}
			            },
			            /** Location. */
			            'location': {
			                label: 'Location',
			                type: FieldType.Schema,
			                isRequired: true,
			                options: {schemas: SpruceSchemas.Spruce.Location.v2020_07_22.IDefinition[],}
			            },
			            /** Person. */
			            'person': {
			                label: 'Person',
			                type: FieldType.Schema,
			                isRequired: true,
			                options: {schemas: SpruceSchemas.Spruce.Person.v2020_07_22.IDefinition[],}
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.PersonLocation.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Spruce.IAcl {
		/**  */
		export interface v2020_07_22 {
				/** Permissions grouped by slug. */
				[slug:string]: string[]
		}

	}

	export declare namespace SpruceSchemas.Spruce.Acl.v2020_07_22 {
		/** The interface for the schema definition for a Access control list lookup table */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'acl',
			name: 'Access control list lookup table',
			dynamicKeySignature: { 
			    label: 'Permissions grouped by slug',
			    type: FieldType.Text,
			    key: 'slug',
			    isArray: true,
			    options: undefined
			}		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Spruce.Acl.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Local.IOnboarding {
		/** Track onboarding progress and tutorials &amp; quizzes completed. */
		export interface v2020_07_22 {
			
				/** Remote. */
				'isEnabled': boolean
				/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
				'runCount': number
		}

	}

	export declare namespace SpruceSchemas.Local.Onboarding.v2020_07_22 {
		/** The interface for the schema definition for a Onboarding */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'onboarding',
			name: 'Onboarding',
			description: 'Track onboarding progress and tutorials & quizzes completed.',
			    fields: {
			            /** Remote. */
			            'isEnabled': {
			                label: 'Remote',
			                type: FieldType.Boolean,
			                isRequired: true,
			                options: undefined
			            },
			            /** Run count. How many times spruce onboarding has been called (the story changes based on count) */
			            'runCount': {
			                label: 'Run count',
			                type: FieldType.Number,
			                isRequired: true,
			                hint: 'How many times spruce onboarding has been called (the story changes based on count)',
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Local.Onboarding.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Local.ISkillFeature {
		/**  */
		export interface v2020_07_22 {
			
				/** What's the name of your skill?. */
				'name': string
				/** How would you describe your skill?. */
				'description': string
		}

	}

	export declare namespace SpruceSchemas.Local.SkillFeature.v2020_07_22 {
		/** The interface for the schema definition for a Skill Feature */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'skillFeature',
			name: 'Skill Feature',
			    fields: {
			            /** What's the name of your skill?. */
			            'name': {
			                label: 'What\'s the name of your skill?',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			            /** How would you describe your skill?. */
			            'description': {
			                label: 'How would you describe your skill?',
			                type: FieldType.Text,
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Local.SkillFeature.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Local.INamedTemplateItem {
		/** Used to collect input on the names of a class or interface */
		export interface v2020_07_22 {
			
				/** Readable name. The name people will read */
				'nameReadable'?: string| undefined | null
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
				/** Description. */
				'description': string
		}

	}

	export declare namespace SpruceSchemas.Local.NamedTemplateItem.v2020_07_22 {
		/** The interface for the schema definition for a NamedTemplateItem */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'namedTemplateItem',
			name: 'NamedTemplateItem',
			description: 'Used to collect input on the names of a class or interface',
			    fields: {
			            /** Readable name. The name people will read */
			            'nameReadable': {
			                label: 'Readable name',
			                type: FieldType.Text,
			                hint: 'The name people will read',
			                options: undefined
			            },
			            /** Camel case name. camelCase version of the name */
			            'nameCamel': {
			                label: 'Camel case name',
			                type: FieldType.Text,
			                isRequired: true,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Plural camel case name. camelCase version of the name */
			            'nameCamelPlural': {
			                label: 'Plural camel case name',
			                type: FieldType.Text,
			                hint: 'camelCase version of the name',
			                options: undefined
			            },
			            /** Pascal case name. PascalCase of the name */
			            'namePascal': {
			                label: 'Pascal case name',
			                type: FieldType.Text,
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Plural Pascal case name. PascalCase of the name */
			            'namePascalPlural': {
			                label: 'Plural Pascal case name',
			                type: FieldType.Text,
			                hint: 'PascalCase of the name',
			                options: undefined
			            },
			            /** Constant case name. CONST_CASE of the name */
			            'nameConst': {
			                label: 'Constant case name',
			                type: FieldType.Text,
			                hint: 'CONST_CASE of the name',
			                options: undefined
			            },
			            /** Description. */
			            'description': {
			                label: 'Description',
			                type: FieldType.Text,
			                isRequired: true,
			                description: 'Describe a bit more here',
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Local.NamedTemplateItem.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Local.IAutoloader {
		/** A directory that is autoloaded */
		export interface v2020_07_22 {
			
				/** Source directory. */
				'lookupDir': SpruceSchema.IDirectoryFieldValue
				/** Destination. Where the file that does the autoloading is written */
				'destination': SpruceSchema.IFileFieldValue
				/** Pattern. */
				'pattern': string
		}

	}

	export declare namespace SpruceSchemas.Local.Autoloader.v2020_07_22 {
		/** The interface for the schema definition for a Autoloader */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'autoloader',
			name: 'Autoloader',
			description: 'A directory that is autoloaded',
			    fields: {
			            /** Source directory. */
			            'lookupDir': {
			                label: 'Source directory',
			                type: FieldType.Directory,
			                isRequired: true,
			                options: undefined
			            },
			            /** Destination. Where the file that does the autoloading is written */
			            'destination': {
			                label: 'Destination',
			                type: FieldType.File,
			                isRequired: true,
			                hint: 'Where the file that does the autoloading is written',
			                options: undefined
			            },
			            /** Pattern. */
			            'pattern': {
			                label: 'Pattern',
			                type: FieldType.Text,
			                isRequired: true,
			                defaultValue: "**/!(*.test).ts",
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Local.Autoloader.v2020_07_22.IDefinition>

	}


	export declare namespace SpruceSchemas.Local.ITestFeature {
		/**  */
		export interface v2020_07_22 {
			
				/** What file would you like to test?. */
				'target': SpruceSchema.IFileFieldValue
		}

	}

	export declare namespace SpruceSchemas.Local.TestFeature.v2020_07_22 {
		/** The interface for the schema definition for a Test Feature */
		export interface IDefinition extends SpruceSchema.ISchemaDefinition {
			id: 'testFeature',
			name: 'Test Feature',
			    fields: {
			            /** What file would you like to test?. */
			            'target': {
			                label: 'What file would you like to test?',
			                type: FieldType.File,
			                isRequired: true,
			                defaultValue: {"path":""},
			                options: undefined
			            },
			    }
		}

		/** The type of a schema instance built off this definition */
		export type Instance = Schema<SpruceSchemas.Local.TestFeature.v2020_07_22.IDefinition>

	}




