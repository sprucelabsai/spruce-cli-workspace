/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as SchemaEntity } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

import FieldType from '#spruce/schemas/fields/fieldTypeEnum'


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	
	export interface IAcl {
			/** Permissions grouped by slug. */
			[slug:string]: string[]
	}

	export interface IAclSchema extends SpruceSchema.ISchema {
		id: 'acl',
		name: 'Access control list',
		dynamicKeySignature: { 
		    label: 'Permissions grouped by slug',
		    type: FieldType.Text,
		    key: 'slug',
		    isArray: true,
		    options: undefined
		}	}

	export type AclEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.IAclSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** A physical location where people meet. An organization has at least one of them. */
	export interface ILocation {
		
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

	export interface ILocationSchema extends SpruceSchema.ISchema {
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

	export type LocationEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.ILocationSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** A position at a company. The answer to the question; What is your job? */
	export interface IJob {
		
			/** Id. */
			'id'?: string| undefined | null
			/** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, manager, guest). */
			'isDefault': string
			/** Name. */
			'name': string
			/** Role. */
			'role': ("owner" | "groupManager" | "manager" | "teammate" | "guest")
			/** On work permissions. */
			'inStoreAcls'?: SpruceSchemas.Spruce.v2020_07_22.IAcl| undefined | null
			/** Off work permissions. */
			'acls'?: SpruceSchemas.Spruce.v2020_07_22.IAcl| undefined | null
	}

	export interface IJobSchema extends SpruceSchema.ISchema {
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
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.IAclSchema,}
		            },
		            /** Off work permissions. */
		            'acls': {
		                label: 'Off work permissions',
		                type: FieldType.Schema,
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.IAclSchema,}
		            },
		    }
	}

	export type JobEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.IJobSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** A human being. */
	export interface IPerson {
		
			/** Id. */
			'id': string
			/** First name. */
			'firstName'?: string| undefined | null
			/** Last name. */
			'lastName'?: string| undefined | null
			/** Casual name. The name you can use when talking to this person. */
			'casualName': string
			/** Phone. A number that can be texted */
			'phone'?: string| undefined | null
			/** Profile photos. */
			'profileImages'?: SpruceSchemas.Spruce.v2020_07_22.IProfileImage| undefined | null
	}

	export interface IPersonSchema extends SpruceSchema.ISchema {
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
		                isPrivate: true,
		                options: undefined
		            },
		            /** Last name. */
		            'lastName': {
		                label: 'Last name',
		                type: FieldType.Text,
		                isPrivate: true,
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
		            /** Phone. A number that can be texted */
		            'phone': {
		                label: 'Phone',
		                type: FieldType.Phone,
		                isPrivate: true,
		                hint: 'A number that can be texted',
		                options: undefined
		            },
		            /** Profile photos. */
		            'profileImages': {
		                label: 'Profile photos',
		                type: FieldType.Schema,
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.IProfileImageSchema,}
		            },
		    }
	}

	export type PersonEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.IPersonSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** A person&#x27;s visit to a location (business or home). */
	export interface IPersonLocation {
		
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
			'job': SpruceSchemas.Spruce.v2020_07_22.IJob
			/** Location. */
			'location': SpruceSchemas.Spruce.v2020_07_22.ILocation
			/** Person. */
			'person': SpruceSchemas.Spruce.v2020_07_22.IPerson
	}

	export interface IPersonLocationSchema extends SpruceSchema.ISchema {
		id: 'personLocation',
		name: 'Person location',
		description: 'A person\'s visit to a location (business or home).',
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
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.IJobSchema,}
		            },
		            /** Location. */
		            'location': {
		                label: 'Location',
		                type: FieldType.Schema,
		                isRequired: true,
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.ILocationSchema,}
		            },
		            /** Person. */
		            'person': {
		                label: 'Person',
		                type: FieldType.Schema,
		                isRequired: true,
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.IPersonSchema,}
		            },
		    }
	}

	export type PersonLocationEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.IPersonLocationSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** Various sizes that a profile image comes in. */
	export interface IProfileImage {
		
			/** 60x60. */
			'profile60': string
			/** 150x150. */
			'profile150': string
			/** 60x60. */
			'profile60@2x': string
			/** 150x150. */
			'profile150@2x': string
	}

	export interface IProfileImageSchema extends SpruceSchema.ISchema {
		id: 'profileImage',
		name: 'Profile Image Sizes',
		description: 'Various sizes that a profile image comes in.',
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

	export type ProfileImageEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.IProfileImageSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	
	export interface ISkillCreator {
		
			
			'skillId'?: string| undefined | null
			
			'personId'?: string| undefined | null
	}

	export interface ISkillCreatorSchema extends SpruceSchema.ISchema {
		id: 'skillCreator',
		name: 'Skill creator',
		    fields: {
		            /** . */
		            'skillId': {
		                type: FieldType.Text,
		                options: undefined
		            },
		            /** . */
		            'personId': {
		                type: FieldType.Text,
		                options: undefined
		            },
		    }
	}

	export type SkillCreatorEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.ISkillCreatorSchema>

}


export declare namespace SpruceSchemas.Spruce.v2020_07_22 {

	/** An ability Sprucebot has learned. */
	export interface ISkill {
		
			/** Id. */
			'id': string
			/** Id. */
			'apiKey': string
			/** Name. */
			'name': string
			/** Description. */
			'description'?: string| undefined | null
			/** Slug. */
			'slug': string
			/** Creators. The people or skills who created and own this skill. */
			'creators': SpruceSchemas.Spruce.v2020_07_22.ISkillCreator[]
	}

	export interface ISkillSchema extends SpruceSchema.ISchema {
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
		                isPrivate: true,
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
		                isRequired: true,
		                options: undefined
		            },
		            /** Creators. The people or skills who created and own this skill. */
		            'creators': {
		                label: 'Creators',
		                type: FieldType.Schema,
		                isRequired: true,
		                hint: 'The people or skills who created and own this skill.',
		                isArray: true,
		                options: {schema: SpruceSchemas.Spruce.v2020_07_22.ISkillCreatorSchema,}
		            },
		    }
	}

	export type SkillEntity = SchemaEntity<SpruceSchemas.Spruce.v2020_07_22.ISkillSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** A directory that is autoloaded. */
	export interface IAutoloader {
		
			/** Source directory. */
			'lookupDir': SpruceSchema.IDirectoryFieldValue
			/** Destination. Where the file that does the autoloading is written */
			'destination': SpruceSchema.IFileFieldValue
			/** Pattern. */
			'pattern': string
	}

	export interface IAutoloaderSchema extends SpruceSchema.ISchema {
		id: 'autoloader',
		name: 'Autoloader',
		description: 'A directory that is autoloaded.',
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

	export type AutoloaderEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.IAutoloaderSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** The options for skill.boot. */
	export interface IBootSkillAction {
		
			/** Run local. Will run using ts-node and typescript directly. Longer boot times */
			'local'?: boolean| undefined | null
	}

	export interface IBootSkillActionSchema extends SpruceSchema.ISchema {
		id: 'bootSkillAction',
		name: 'Boot skill action',
		description: 'The options for skill.boot.',
		    fields: {
		            /** Run local. Will run using ts-node and typescript directly. Longer boot times */
		            'local': {
		                label: 'Run local',
		                type: FieldType.Boolean,
		                hint: 'Will run using ts-node and typescript directly. Longer boot times',
		                options: undefined
		            },
		    }
	}

	export type BootSkillActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.IBootSkillActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** A stripped down skill for the cli */
	export interface ICliSkill {
		
			/** Id. */
			'id': string
			/** Id. */
			'apiKey': string
			/** Name. */
			'name': string
			/** Slug. */
			'slug'?: string| undefined | null
	}

	export interface ICliSkillSchema extends SpruceSchema.ISchema {
		id: 'cliSkill',
		name: 'Skill',
		description: 'A stripped down skill for the cli',
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
		                isPrivate: true,
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
		            /** Slug. */
		            'slug': {
		                label: 'Slug',
		                type: FieldType.Text,
		                options: undefined
		            },
		    }
	}

	export type CliSkillEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICliSkillSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** A stripped down user for the cli */
	export interface ICliUser {
		
			/** Id. */
			'id': string
			/** Casual name. The name you can use when talking to this person. */
			'casualName': string
	}

	export interface ICliUserSchema extends SpruceSchema.ISchema {
		id: 'cliUser',
		name: 'Person',
		description: 'A stripped down user for the cli',
		    fields: {
		            /** Id. */
		            'id': {
		                label: 'Id',
		                type: FieldType.Id,
		                isRequired: true,
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
		    }
	}

	export type CliUserEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICliUserSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** A stripped down cli user with token details for login */
	export interface ICliUserWithToken {
		
			/** Id. */
			'id': string
			/** Casual name. The name you can use when talking to this person. */
			'casualName': string
			
			'token': string
			/** Logged in. */
			'isLoggedIn'?: boolean| undefined | null
	}

	export interface ICliUserWithTokenSchema extends SpruceSchema.ISchema {
		id: 'cliUserWithToken',
		name: 'Person',
		description: 'A stripped down cli user with token details for login',
		    fields: {
		            /** Id. */
		            'id': {
		                label: 'Id',
		                type: FieldType.Id,
		                isRequired: true,
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
		            /** . */
		            'token': {
		                type: FieldType.Text,
		                isRequired: true,
		                options: undefined
		            },
		            /** Logged in. */
		            'isLoggedIn': {
		                label: 'Logged in',
		                type: FieldType.Boolean,
		                options: undefined
		            },
		    }
	}

	export type CliUserWithTokenEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICliUserWithTokenSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Create a builder for your brand new error!  */
	export interface ICreateErrorAction {
		
			/** Id. Where I'll look for new schema fields to be registered. */
			'addonsLookupDir'?: string| undefined | null
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

	export interface ICreateErrorActionSchema extends SpruceSchema.ISchema {
		id: 'createErrorAction',
		name: 'Create error action',
		description: 'Create a builder for your brand new error! ',
		    fields: {
		            /** Id. Where I'll look for new schema fields to be registered. */
		            'addonsLookupDir': {
		                label: 'Id',
		                type: FieldType.Text,
		                hint: 'Where I\'ll look for new schema fields to be registered.',
		                defaultValue: "src/addons",
		                options: undefined
		            },
		            /** Error class destination. Where I'll save your new Error class file? */
		            'errorClassDestinationDir': {
		                label: 'Error class destination',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'Where I\'ll save your new Error class file?',
		                defaultValue: "src/errors",
		                options: undefined
		            },
		            /** . Where I should look for your error builders? */
		            'errorLookupDir': {
		                type: FieldType.Text,
		                hint: 'Where I should look for your error builders?',
		                defaultValue: "src/errors",
		                options: undefined
		            },
		            /** Types destination dir. This is where error options and type information will be written */
		            'errorTypesDestinationDir': {
		                label: 'Types destination dir',
		                type: FieldType.Text,
		                hint: 'This is where error options and type information will be written',
		                defaultValue: "#spruce/errors",
		                options: undefined
		            },
		            /** Error builder destination directory. Where I'll save your new builder file? */
		            'errorBuilderDestinationDir': {
		                label: 'Error builder destination directory',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'Where I\'ll save your new builder file?',
		                defaultValue: "./src/errors",
		                options: undefined
		            },
		            /** Readable name. The name people will read */
		            'nameReadable': {
		                label: 'Readable name',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'The name people will read',
		                options: undefined
		            },
		            /** Pascal case name. PascalCase of the name */
		            'namePascal': {
		                label: 'Pascal case name',
		                type: FieldType.Text,
		                hint: 'PascalCase of the name',
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
		            /** Description. Describe a bit more here */
		            'description': {
		                label: 'Description',
		                type: FieldType.Text,
		                hint: 'Describe a bit more here',
		                options: undefined
		            },
		    }
	}

	export type CreateErrorActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICreateErrorActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Create the builder to a fresh new schema! */
	export interface ICreateSchemaAction {
		
			/** Schema types destination directory. Where schema types and interfaces will be generated. */
			'schemaTypesDestinationDir'?: string| undefined | null
			/** Field types directory. Where field types and interfaces will be generated. */
			'fieldTypesDestinationDir'?: string| undefined | null
			/** Id. Where I'll look for new schema fields to be registered. */
			'addonsLookupDir'?: string| undefined | null
			/** . Where I should look for your schema builders? */
			'schemaLookupDir'?: string| undefined | null
			/** Enable versioning. */
			'enableVersioning'?: boolean| undefined | null
			/** Global namespace. */
			'globalNamespace'?: string| undefined | null
			/** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
			'fetchRemoteSchemas'?: boolean| undefined | null
			/** Generate field types. Should I generate field types too? */
			'generateFieldTypes'?: boolean| undefined | null
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

	export interface ICreateSchemaActionSchema extends SpruceSchema.ISchema {
		id: 'createSchemaAction',
		name: 'Create schema action',
		description: 'Create the builder to a fresh new schema!',
		    fields: {
		            /** Schema types destination directory. Where schema types and interfaces will be generated. */
		            'schemaTypesDestinationDir': {
		                label: 'Schema types destination directory',
		                type: FieldType.Text,
		                hint: 'Where schema types and interfaces will be generated.',
		                defaultValue: "#spruce/schemas",
		                options: undefined
		            },
		            /** Field types directory. Where field types and interfaces will be generated. */
		            'fieldTypesDestinationDir': {
		                label: 'Field types directory',
		                type: FieldType.Text,
		                isPrivate: true,
		                hint: 'Where field types and interfaces will be generated.',
		                defaultValue: "#spruce/schemas",
		                options: undefined
		            },
		            /** Id. Where I'll look for new schema fields to be registered. */
		            'addonsLookupDir': {
		                label: 'Id',
		                type: FieldType.Text,
		                hint: 'Where I\'ll look for new schema fields to be registered.',
		                defaultValue: "src/addons",
		                options: undefined
		            },
		            /** . Where I should look for your schema builders? */
		            'schemaLookupDir': {
		                type: FieldType.Text,
		                hint: 'Where I should look for your schema builders?',
		                defaultValue: "src/schemas",
		                options: undefined
		            },
		            /** Enable versioning. */
		            'enableVersioning': {
		                label: 'Enable versioning',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                defaultValue: true,
		                options: undefined
		            },
		            /** Global namespace. */
		            'globalNamespace': {
		                label: 'Global namespace',
		                type: FieldType.Text,
		                isPrivate: true,
		                options: undefined
		            },
		            /** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
		            'fetchRemoteSchemas': {
		                label: 'Fetch remote schemas',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                hint: 'I will check the server and your contracts to pull down schemas you need.',
		                defaultValue: true,
		                options: undefined
		            },
		            /** Generate field types. Should I generate field types too? */
		            'generateFieldTypes': {
		                label: 'Generate field types',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                hint: 'Should I generate field types too?',
		                defaultValue: true,
		                options: undefined
		            },
		            /** Schema builder destination directory. Where I'll save the new schema builder. */
		            'schemaBuilderDestinationDir': {
		                label: 'Schema builder destination directory',
		                type: FieldType.Text,
		                hint: 'Where I\'ll save the new schema builder.',
		                defaultValue: "src/schemas",
		                options: undefined
		            },
		            /** Builder function. The function that builds this schema */
		            'builderFunction': {
		                label: 'Builder function',
		                type: FieldType.Text,
		                isPrivate: true,
		                hint: 'The function that builds this schema',
		                defaultValue: "buildSchema",
		                options: undefined
		            },
		            /** Sync after creation. This will ensure types and schemas are in sync after you create your builder. */
		            'syncAfterCreate': {
		                label: 'Sync after creation',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                hint: 'This will ensure types and schemas are in sync after you create your builder.',
		                defaultValue: true,
		                options: undefined
		            },
		            /** Version. Set a version yourself instead of letting me generate one for you */
		            'version': {
		                label: 'Version',
		                type: FieldType.Text,
		                isPrivate: true,
		                hint: 'Set a version yourself instead of letting me generate one for you',
		                options: undefined
		            },
		            /** Readable name. The name people will read */
		            'nameReadable': {
		                label: 'Readable name',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'The name people will read',
		                options: undefined
		            },
		            /** Pascal case name. PascalCase of the name */
		            'namePascal': {
		                label: 'Pascal case name',
		                type: FieldType.Text,
		                hint: 'PascalCase of the name',
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
		            /** Description. Describe a bit more here */
		            'description': {
		                label: 'Description',
		                type: FieldType.Text,
		                hint: 'Describe a bit more here',
		                options: undefined
		            },
		    }
	}

	export type CreateSchemaActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICreateSchemaActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Options for creating a new test. */
	export interface ICreateTestAction {
		
			/** Type. */
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

	export interface ICreateTestActionSchema extends SpruceSchema.ISchema {
		id: 'createTestAction',
		name: 'Create test action',
		description: 'Options for creating a new test.',
		    fields: {
		            /** Type. */
		            'type': {
		                label: 'Type',
		                type: FieldType.Select,
		                isRequired: true,
		                options: {choices: [{"value":"behavioral","label":"Behavioral"},{"value":"implementation","label":"Implementation"}],}
		            },
		            /** What are you testing?. E.g. Booking an appointment or turning on a light */
		            'nameReadable': {
		                label: 'What are you testing?',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'E.g. Booking an appointment or turning on a light',
		                options: undefined
		            },
		            /** Test destination directory. Where I'll save your new test. */
		            'testDestinationDir': {
		                label: 'Test destination directory',
		                type: FieldType.Text,
		                hint: 'Where I\'ll save your new test.',
		                defaultValue: "src/__tests__",
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
		            /** Pascal case name. PascalCase of the name */
		            'namePascal': {
		                label: 'Pascal case name',
		                type: FieldType.Text,
		                hint: 'PascalCase of the name',
		                options: undefined
		            },
		    }
	}

	export type CreateTestActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ICreateTestActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Options for event.listen. */
	export interface IListenEventAction {
		
			/** Namespace. */
			'eventNamespace': string
			/** Event name. */
			'eventName': string
			/** Events destination directory. Where should I add your listeners? */
			'eventsDestinationDir'?: string| undefined | null
			/** Version. Set a version yourself instead of letting me generate one for you */
			'version'?: string| undefined | null
	}

	export interface IListenEventActionSchema extends SpruceSchema.ISchema {
		id: 'listenEventAction',
		name: 'Listen to event action',
		description: 'Options for event.listen.',
		    fields: {
		            /** Namespace. */
		            'eventNamespace': {
		                label: 'Namespace',
		                type: FieldType.Text,
		                isRequired: true,
		                options: undefined
		            },
		            /** Event name. */
		            'eventName': {
		                label: 'Event name',
		                type: FieldType.Text,
		                isRequired: true,
		                options: undefined
		            },
		            /** Events destination directory. Where should I add your listeners? */
		            'eventsDestinationDir': {
		                label: 'Events destination directory',
		                type: FieldType.Text,
		                hint: 'Where should I add your listeners?',
		                defaultValue: "src/events",
		                options: undefined
		            },
		            /** Version. Set a version yourself instead of letting me generate one for you */
		            'version': {
		                label: 'Version',
		                type: FieldType.Text,
		                isPrivate: true,
		                hint: 'Set a version yourself instead of letting me generate one for you',
		                options: undefined
		            },
		    }
	}

	export type ListenEventActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.IListenEventActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Used to collect input on the names of a class or interface */
	export interface INamedTemplateItem {
		
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
			/** Description. Describe a bit more here */
			'description'?: string| undefined | null
	}

	export interface INamedTemplateItemSchema extends SpruceSchema.ISchema {
		id: 'namedTemplateItem',
		name: 'NamedTemplateItem',
		description: 'Used to collect input on the names of a class or interface',
		    fields: {
		            /** Readable name. The name people will read */
		            'nameReadable': {
		                label: 'Readable name',
		                type: FieldType.Text,
		                isRequired: true,
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
		            /** Description. Describe a bit more here */
		            'description': {
		                label: 'Description',
		                type: FieldType.Text,
		                hint: 'Describe a bit more here',
		                options: undefined
		            },
		    }
	}

	export type NamedTemplateItemEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.INamedTemplateItemSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Track onboarding progress and tutorials &amp; quizzes completed. */
	export interface IOnboarding {
		
			/** Remote. */
			'isEnabled': boolean
			/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
			'runCount': number
	}

	export interface IOnboardingSchema extends SpruceSchema.ISchema {
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

	export type OnboardingEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.IOnboardingSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Install vscode extensions the Spruce team recommends! */
	export interface ISetupVscodeAction {
		
			/** Install everything. */
			'all'?: boolean| undefined | null
	}

	export interface ISetupVscodeActionSchema extends SpruceSchema.ISchema {
		id: 'setupVscodeAction',
		name: 'Setup vscode action',
		description: 'Install vscode extensions the Spruce team recommends!',
		    fields: {
		            /** Install everything. */
		            'all': {
		                label: 'Install everything',
		                type: FieldType.Boolean,
		                options: undefined
		            },
		    }
	}

	export type SetupVscodeActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ISetupVscodeActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	
	export interface ISkillFeature {
		
			/** What's the name of your skill?. */
			'name': string
			/** How would you describe your skill?. */
			'description': string
	}

	export interface ISkillFeatureSchema extends SpruceSchema.ISchema {
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

	export type SkillFeatureEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ISkillFeatureSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Keep your errors types in sync with your builders */
	export interface ISyncErrorAction {
		
			/** Id. Where I'll look for new schema fields to be registered. */
			'addonsLookupDir'?: string| undefined | null
			/** Error class destination. Where I'll save your new Error class file? */
			'errorClassDestinationDir': string
			/** . Where I should look for your error builders? */
			'errorLookupDir'?: string| undefined | null
			/** Types destination dir. This is where error options and type information will be written */
			'errorTypesDestinationDir'?: string| undefined | null
	}

	export interface ISyncErrorActionSchema extends SpruceSchema.ISchema {
		id: 'syncErrorAction',
		name: 'Sync error action',
		description: 'Keep your errors types in sync with your builders',
		    fields: {
		            /** Id. Where I'll look for new schema fields to be registered. */
		            'addonsLookupDir': {
		                label: 'Id',
		                type: FieldType.Text,
		                hint: 'Where I\'ll look for new schema fields to be registered.',
		                defaultValue: "src/addons",
		                options: undefined
		            },
		            /** Error class destination. Where I'll save your new Error class file? */
		            'errorClassDestinationDir': {
		                label: 'Error class destination',
		                type: FieldType.Text,
		                isRequired: true,
		                hint: 'Where I\'ll save your new Error class file?',
		                defaultValue: "src/errors",
		                options: undefined
		            },
		            /** . Where I should look for your error builders? */
		            'errorLookupDir': {
		                type: FieldType.Text,
		                hint: 'Where I should look for your error builders?',
		                defaultValue: "src/errors",
		                options: undefined
		            },
		            /** Types destination dir. This is where error options and type information will be written */
		            'errorTypesDestinationDir': {
		                label: 'Types destination dir',
		                type: FieldType.Text,
		                hint: 'This is where error options and type information will be written',
		                defaultValue: "#spruce/errors",
		                options: undefined
		            },
		    }
	}

	export type SyncErrorActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ISyncErrorActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Options for schema.sync. */
	export interface ISyncSchemasAction {
		
			/** Schema types destination directory. Where schema types and interfaces will be generated. */
			'schemaTypesDestinationDir'?: string| undefined | null
			/** Field types directory. Where field types and interfaces will be generated. */
			'fieldTypesDestinationDir'?: string| undefined | null
			/** Id. Where I'll look for new schema fields to be registered. */
			'addonsLookupDir'?: string| undefined | null
			/** . Where I should look for your schema builders? */
			'schemaLookupDir'?: string| undefined | null
			/** Enable versioning. */
			'enableVersioning'?: boolean| undefined | null
			/** Global namespace. */
			'globalNamespace'?: string| undefined | null
			/** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
			'fetchRemoteSchemas'?: boolean| undefined | null
			/** Generate field types. Should I generate field types too? */
			'generateFieldTypes'?: boolean| undefined | null
	}

	export interface ISyncSchemasActionSchema extends SpruceSchema.ISchema {
		id: 'syncSchemasAction',
		name: 'Sync schemas action',
		description: 'Options for schema.sync.',
		    fields: {
		            /** Schema types destination directory. Where schema types and interfaces will be generated. */
		            'schemaTypesDestinationDir': {
		                label: 'Schema types destination directory',
		                type: FieldType.Text,
		                hint: 'Where schema types and interfaces will be generated.',
		                defaultValue: "#spruce/schemas",
		                options: undefined
		            },
		            /** Field types directory. Where field types and interfaces will be generated. */
		            'fieldTypesDestinationDir': {
		                label: 'Field types directory',
		                type: FieldType.Text,
		                isPrivate: true,
		                hint: 'Where field types and interfaces will be generated.',
		                defaultValue: "#spruce/schemas",
		                options: undefined
		            },
		            /** Id. Where I'll look for new schema fields to be registered. */
		            'addonsLookupDir': {
		                label: 'Id',
		                type: FieldType.Text,
		                hint: 'Where I\'ll look for new schema fields to be registered.',
		                defaultValue: "src/addons",
		                options: undefined
		            },
		            /** . Where I should look for your schema builders? */
		            'schemaLookupDir': {
		                type: FieldType.Text,
		                hint: 'Where I should look for your schema builders?',
		                defaultValue: "src/schemas",
		                options: undefined
		            },
		            /** Enable versioning. */
		            'enableVersioning': {
		                label: 'Enable versioning',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                defaultValue: true,
		                options: undefined
		            },
		            /** Global namespace. */
		            'globalNamespace': {
		                label: 'Global namespace',
		                type: FieldType.Text,
		                isPrivate: true,
		                options: undefined
		            },
		            /** Fetch remote schemas. I will check the server and your contracts to pull down schemas you need. */
		            'fetchRemoteSchemas': {
		                label: 'Fetch remote schemas',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                hint: 'I will check the server and your contracts to pull down schemas you need.',
		                defaultValue: true,
		                options: undefined
		            },
		            /** Generate field types. Should I generate field types too? */
		            'generateFieldTypes': {
		                label: 'Generate field types',
		                type: FieldType.Boolean,
		                isPrivate: true,
		                hint: 'Should I generate field types too?',
		                defaultValue: true,
		                options: undefined
		            },
		    }
	}

	export type SyncSchemasActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.ISyncSchemasActionSchema>

}


export declare namespace SpruceSchemas.Local.v2020_07_22 {

	/** Options skill.upgrade. */
	export interface IUpgradeSkillAction {
		
			/** Force. This will force overwrite each file */
			'force'?: boolean| undefined | null
	}

	export interface IUpgradeSkillActionSchema extends SpruceSchema.ISchema {
		id: 'upgradeSkillAction',
		name: 'Upgrade skill action',
		description: 'Options skill.upgrade.',
		    fields: {
		            /** Force. This will force overwrite each file */
		            'force': {
		                label: 'Force',
		                type: FieldType.Boolean,
		                hint: 'This will force overwrite each file',
		                options: undefined
		            },
		    }
	}

	export type UpgradeSkillActionEntity = SchemaEntity<SpruceSchemas.Local.v2020_07_22.IUpgradeSkillActionSchema>

}




