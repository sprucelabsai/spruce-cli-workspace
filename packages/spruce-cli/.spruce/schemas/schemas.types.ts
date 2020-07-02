/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

import { default as Schema } from '@sprucelabs/schema'
import * as SpruceSchema from '@sprucelabs/schema'

import FieldType from '#spruce/schemas/fields/fieldTypeEnum'

export declare namespace SpruceSchemas.Core {
	/** Profile images at various helpful sizes and resolutions. */
	export interface IProfileImage {
		/** 60x60. */
		profile60: string
		/** 150x150. */
		profile150: string
		/** 60x60. */
		'profile60@2x': string
		/** 150x150. */
		'profile150@2x': string
	}
}

export declare namespace SpruceSchemas.Core.ProfileImage {
	/** The interface for the schema definition for a Profile Image Sizes */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'profileImage'
		name: 'Profile Image Sizes'
		description: 'Profile images at various helpful sizes and resolutions.'
		fields: {
			/** 60x60. */
			profile60: {
				label: '60x60'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** 150x150. */
			profile150: {
				label: '150x150'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** 60x60. */
			'profile60@2x': {
				label: '60x60'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** 150x150. */
			'profile150@2x': {
				label: '150x150'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.ProfileImage.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/** A human being. */
	export interface IUser {
		/** Id. */
		id: string
		/** First name. */
		firstName?: string | undefined | null
		/** Last name. */
		lastName?: string | undefined | null
		/** Casual name. Generated name that defaults to Friend! */
		casualName: string
		/** Phone. The person's phone number! */
		phoneNumber?: string | undefined | null
		/** Profile photos. */
		profileImages?: SpruceSchemas.Core.IProfileImage | undefined | null
		/** Default profile photos. */
		defaultProfileImages: SpruceSchemas.Core.IProfileImage
	}
}

export declare namespace SpruceSchemas.Core.User {
	/** The interface for the schema definition for a User */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'user'
		name: 'User'
		description: 'A human being.'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** First name. */
			firstName: {
				label: 'First name'
				type: FieldType.Text
				options: undefined
			}
			/** Last name. */
			lastName: {
				label: 'Last name'
				type: FieldType.Text
				options: undefined
			}
			/** Casual name. Generated name that defaults to Friend! */
			casualName: {
				label: 'Casual name'
				type: FieldType.Text
				isRequired: true
				hint: 'Generated name that defaults to Friend!'
				options: undefined
			}
			/** Phone. The person's phone number! */
			phoneNumber: {
				label: 'Phone'
				type: FieldType.Phone
				hint: "The person's phone number!"
				options: undefined
			}
			/** Profile photos. */
			profileImages: {
				label: 'Profile photos'
				type: FieldType.Schema
				options: { schemas: SpruceSchemas.Core.ProfileImage.IDefinition[] }
			}
			/** Default profile photos. */
			defaultProfileImages: {
				label: 'Default profile photos'
				type: FieldType.Schema
				isRequired: true
				options: { schemas: SpruceSchemas.Core.ProfileImage.IDefinition[] }
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.User.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/** An ability Sprucebot has learned. */
	export interface ISkill {
		/** Id. */
		id: string
		/** Id. */
		apiKey: string
		/** Name. */
		name: string
		/** Description. */
		description?: string | undefined | null
		/** Slug. */
		slug?: string | undefined | null
		/** Icon. */
		icon?: string | undefined | null
	}
}

export declare namespace SpruceSchemas.Core.Skill {
	/** The interface for the schema definition for a Skill */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'skill'
		name: 'Skill'
		description: 'An ability Sprucebot has learned.'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Id. */
			apiKey: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Name. */
			name: {
				label: 'Name'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** Description. */
			description: {
				label: 'Description'
				type: FieldType.Text
				options: undefined
			}
			/** Slug. */
			slug: {
				label: 'Slug'
				type: FieldType.Text
				options: undefined
			}
			/** Icon. */
			icon: {
				label: 'Icon'
				type: FieldType.Text
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.Skill.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/** A physical location where people meet. An organization has at least one of them. */
	export interface ILocation {
		/** Id. */
		id?: string | undefined | null
		/** Name. */
		name: string
		/** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
		num?: string | undefined | null
		/** Public. Is this location viewable by guests? */
		isPublic?: boolean | undefined | null
		/** Main Phone. */
		phone?: string | undefined | null
		/** Timezone. */
		timezone?:
			| (
					| 'etc/gmt+12'
					| 'pacific/midway'
					| 'pacific/honolulu'
					| 'us/alaska'
					| 'america/los_Angeles'
					| 'america/tijuana'
					| 'us/arizona'
					| 'america/chihuahua'
					| 'us/mountain'
					| 'america/managua'
					| 'us/central'
					| 'america/mexico_City'
					| 'Canada/Saskatchewan'
					| 'america/bogota'
					| 'us/eastern'
					| 'us/east-indiana'
					| 'Canada/atlantic'
					| 'america/caracas'
					| 'america/manaus'
					| 'america/Santiago'
					| 'Canada/Newfoundland'
					| 'america/Sao_Paulo'
					| 'america/argentina/buenos_Aires'
					| 'america/godthab'
					| 'america/montevideo'
					| 'america/Noronha'
					| 'atlantic/cape_Verde'
					| 'atlantic/azores'
					| 'africa/casablanca'
					| 'etc/gmt'
					| 'europe/amsterdam'
					| 'europe/belgrade'
					| 'europe/brussels'
					| 'europe/Sarajevo'
					| 'africa/lagos'
					| 'asia/amman'
					| 'europe/athens'
					| 'asia/beirut'
					| 'africa/cairo'
					| 'africa/Harare'
					| 'europe/Helsinki'
					| 'asia/Jerusalem'
					| 'europe/minsk'
					| 'africa/Windhoek'
					| 'asia/Kuwait'
					| 'europe/moscow'
					| 'africa/Nairobi'
					| 'asia/tbilisi'
					| 'asia/tehran'
					| 'asia/muscat'
					| 'asia/baku'
					| 'asia/Yerevan'
					| 'asia/Kabul'
					| 'asia/Yekaterinburg'
					| 'asia/Karachi'
					| 'asia/calcutta'
					| 'asia/calcutta'
					| 'asia/Katmandu'
					| 'asia/almaty'
					| 'asia/Dhaka'
					| 'asia/Rangoon'
					| 'asia/bangkok'
					| 'asia/Krasnoyarsk'
					| 'asia/Hong_Kong'
					| 'asia/Kuala_Lumpur'
					| 'asia/Irkutsk'
					| 'Australia/Perth'
					| 'asia/taipei'
					| 'asia/tokyo'
					| 'asia/Seoul'
					| 'asia/Yakutsk'
					| 'Australia/adelaide'
					| 'Australia/Darwin'
					| 'Australia/brisbane'
					| 'Australia/canberra'
					| 'Australia/Hobart'
					| 'pacific/guam'
					| 'asia/Vladivostok'
					| 'asia/magadan'
					| 'pacific/auckland'
					| 'pacific/Fiji'
					| 'pacific/tongatapu'
			  )
			| undefined
			| null
		/** Address. */
		address: SpruceSchema.IAddressFieldValue
	}
}

export declare namespace SpruceSchemas.Core.Location {
	/** The interface for the schema definition for a Location */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'location'
		name: 'Location'
		description: 'A physical location where people meet. An organization has at least one of them.'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				options: undefined
			}
			/** Name. */
			name: {
				label: 'Name'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
			num: {
				label: 'Store number'
				type: FieldType.Text
				hint: 'You can use other symbols, like # or dashes. #123 or 32-US-5'
				options: undefined
			}
			/** Public. Is this location viewable by guests? */
			isPublic: {
				label: 'Public'
				type: FieldType.Boolean
				hint: 'Is this location viewable by guests?'
				defaultValue: false
				options: undefined
			}
			/** Main Phone. */
			phone: {
				label: 'Main Phone'
				type: FieldType.Phone
				options: undefined
			}
			/** Timezone. */
			timezone: {
				label: 'Timezone'
				type: FieldType.Select
				options: {
					choices: [
						{ value: 'etc/gmt+12'; label: 'International Date Line West' },
						{ value: 'pacific/midway'; label: 'Midway Island, Samoa' },
						{ value: 'pacific/honolulu'; label: 'Hawaii' },
						{ value: 'us/alaska'; label: 'Alaska' },
						{
							value: 'america/los_Angeles'
							label: 'Pacific Time (US & Canada)'
						},
						{ value: 'america/tijuana'; label: 'Tijuana, Baja California' },
						{ value: 'us/arizona'; label: 'Arizona' },
						{
							value: 'america/chihuahua'
							label: 'Chihuahua, La Paz, Mazatlan'
						},
						{ value: 'us/mountain'; label: 'Mountain Time (US & Canada)' },
						{ value: 'america/managua'; label: 'Central America' },
						{ value: 'us/central'; label: 'Central Time (US & Canada)' },
						{
							value: 'america/mexico_City'
							label: 'Guadalajara, Mexico City, Monterrey'
						},
						{ value: 'Canada/Saskatchewan'; label: 'Saskatchewan' },
						{
							value: 'america/bogota'
							label: 'Bogota, Lima, Quito, Rio Branco'
						},
						{ value: 'us/eastern'; label: 'Eastern Time (US & Canada)' },
						{ value: 'us/east-indiana'; label: 'Indiana (East)' },
						{ value: 'Canada/atlantic'; label: 'Atlantic Time (Canada)' },
						{ value: 'america/caracas'; label: 'Caracas, La Paz' },
						{ value: 'america/manaus'; label: 'Manaus' },
						{ value: 'america/Santiago'; label: 'Santiago' },
						{ value: 'Canada/Newfoundland'; label: 'Newfoundland' },
						{ value: 'america/Sao_Paulo'; label: 'Brasilia' },
						{
							value: 'america/argentina/buenos_Aires'
							label: 'Buenos Aires, Georgetown'
						},
						{ value: 'america/godthab'; label: 'Greenland' },
						{ value: 'america/montevideo'; label: 'Montevideo' },
						{ value: 'america/Noronha'; label: 'Mid-Atlantic' },
						{ value: 'atlantic/cape_Verde'; label: 'Cape Verde Is.' },
						{ value: 'atlantic/azores'; label: 'Azores' },
						{
							value: 'africa/casablanca'
							label: 'Casablanca, Monrovia, Reykjavik'
						},
						{
							value: 'etc/gmt'
							label: 'Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London'
						},
						{
							value: 'europe/amsterdam'
							label: 'Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna'
						},
						{
							value: 'europe/belgrade'
							label: 'Belgrade, Bratislava, Budapest, Ljubljana, Prague'
						},
						{
							value: 'europe/brussels'
							label: 'Brussels, Copenhagen, Madrid, Paris'
						},
						{
							value: 'europe/Sarajevo'
							label: 'Sarajevo, Skopje, Warsaw, Zagreb'
						},
						{ value: 'africa/lagos'; label: 'West Central Africa' },
						{ value: 'asia/amman'; label: 'Amman' },
						{ value: 'europe/athens'; label: 'Athens, Bucharest, Istanbul' },
						{ value: 'asia/beirut'; label: 'Beirut' },
						{ value: 'africa/cairo'; label: 'Cairo' },
						{ value: 'africa/Harare'; label: 'Harare, Pretoria' },
						{
							value: 'europe/Helsinki'
							label: 'Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius'
						},
						{ value: 'asia/Jerusalem'; label: 'Jerusalem' },
						{ value: 'europe/minsk'; label: 'Minsk' },
						{ value: 'africa/Windhoek'; label: 'Windhoek' },
						{ value: 'asia/Kuwait'; label: 'Kuwait, Riyadh, Baghdad' },
						{
							value: 'europe/moscow'
							label: 'Moscow, St. Petersburg, Volgograd'
						},
						{ value: 'africa/Nairobi'; label: 'Nairobi' },
						{ value: 'asia/tbilisi'; label: 'Tbilisi' },
						{ value: 'asia/tehran'; label: 'Tehran' },
						{ value: 'asia/muscat'; label: 'Abu Dhabi, Muscat' },
						{ value: 'asia/baku'; label: 'Baku' },
						{ value: 'asia/Yerevan'; label: 'Yerevan' },
						{ value: 'asia/Kabul'; label: 'Kabul' },
						{ value: 'asia/Yekaterinburg'; label: 'Yekaterinburg' },
						{ value: 'asia/Karachi'; label: 'Islamabad, Karachi, Tashkent' },
						{
							value: 'asia/calcutta'
							label: 'Chennai, Kolkata, Mumbai, New Delhi'
						},
						{ value: 'asia/calcutta'; label: 'Sri Jayawardenapura' },
						{ value: 'asia/Katmandu'; label: 'Kathmandu' },
						{ value: 'asia/almaty'; label: 'Almaty, Novosibirsk' },
						{ value: 'asia/Dhaka'; label: 'Astana, Dhaka' },
						{ value: 'asia/Rangoon'; label: 'Yangon (Rangoon)' },
						{ value: 'asia/bangkok'; label: 'Bangkok, Hanoi, Jakarta' },
						{ value: 'asia/Krasnoyarsk'; label: 'Krasnoyarsk' },
						{
							value: 'asia/Hong_Kong'
							label: 'Beijing, Chongqing, Hong Kong, Urumqi'
						},
						{ value: 'asia/Kuala_Lumpur'; label: 'Kuala Lumpur, Singapore' },
						{ value: 'asia/Irkutsk'; label: 'Irkutsk, Ulaan Bataar' },
						{ value: 'Australia/Perth'; label: 'Perth' },
						{ value: 'asia/taipei'; label: 'Taipei' },
						{ value: 'asia/tokyo'; label: 'Osaka, Sapporo, Tokyo' },
						{ value: 'asia/Seoul'; label: 'Seoul' },
						{ value: 'asia/Yakutsk'; label: 'Yakutsk' },
						{ value: 'Australia/adelaide'; label: 'Adelaide' },
						{ value: 'Australia/Darwin'; label: 'Darwin' },
						{ value: 'Australia/brisbane'; label: 'Brisbane' },
						{
							value: 'Australia/canberra'
							label: 'Canberra, Melbourne, Sydney'
						},
						{ value: 'Australia/Hobart'; label: 'Hobart' },
						{ value: 'pacific/guam'; label: 'Guam, Port Moresby' },
						{ value: 'asia/Vladivostok'; label: 'Vladivostok' },
						{
							value: 'asia/magadan'
							label: 'Magadan, Solomon Is., New Caledonia'
						},
						{ value: 'pacific/auckland'; label: 'Auckland, Wellington' },
						{ value: 'pacific/Fiji'; label: 'Fiji, Kamchatka, Marshall Is.' },
						{ value: 'pacific/tongatapu'; label: "Nuku'alofa" }
					]
				}
			}
			/** Address. */
			address: {
				label: 'Address'
				type: FieldType.Address
				isRequired: true
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.Location.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/**  */
	export interface IAcl {
		/** Permissions grouped by slug. */
		[slug: string]: string[]
	}
}

export declare namespace SpruceSchemas.Core.Acl {
	/** The interface for the schema definition for a Access control list lookup table */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'acl'
		name: 'Access control list lookup table'
		dynamicKeySignature: {
			label: 'Permissions grouped by slug'
			type: FieldType.Text
			key: 'slug'
			isArray: true
			options: undefined
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.Acl.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/** A position at a company. The answer to the question; What is your job? */
	export interface IJob {
		/** Id. */
		id?: string | undefined | null
		/** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest). */
		isDefault: string
		/** Name. */
		name: string
		/** Role. */
		role: 'owner' | 'groupManager' | 'manager' | 'teammate' | 'guest'
		/** On work permissions. */
		inStoreAcls?: SpruceSchemas.Core.IAcl | undefined | null
		/** Off work permissions. */
		acls?: SpruceSchemas.Core.IAcl | undefined | null
	}
}

export declare namespace SpruceSchemas.Core.Job {
	/** The interface for the schema definition for a Job */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'job'
		name: 'Job'
		description: 'A position at a company. The answer to the question; What is your job?'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				options: undefined
			}
			/** Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest). */
			isDefault: {
				label: 'Is default'
				type: FieldType.Text
				isRequired: true
				hint: 'Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest).'
				options: undefined
			}
			/** Name. */
			name: {
				label: 'Name'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** Role. */
			role: {
				label: 'Role'
				type: FieldType.Select
				isRequired: true
				options: {
					choices: [
						{ value: 'owner'; label: 'Owner' },
						{ value: 'groupManager'; label: 'District/region manager' },
						{ value: 'manager'; label: 'Store manager' },
						{ value: 'teammate'; label: 'Teammate' },
						{ value: 'guest'; label: 'Guest' }
					]
				}
			}
			/** On work permissions. */
			inStoreAcls: {
				label: 'On work permissions'
				type: FieldType.Schema
				options: { schemas: SpruceSchemas.Core.Acl.IDefinition[] }
			}
			/** Off work permissions. */
			acls: {
				label: 'Off work permissions'
				type: FieldType.Schema
				options: { schemas: SpruceSchemas.Core.Acl.IDefinition[] }
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.Job.IDefinition>
}

export declare namespace SpruceSchemas.Core {
	/** A location a person has given access to themselves. */
	export interface IUserLocation {
		/** Id. */
		id?: string | undefined | null
		/** Name. */
		role: 'owner' | 'groupManager' | 'manager' | 'teammate' | 'guest'
		/** Status. */
		status?: string | undefined | null
		/** Total visits. */
		visits: number
		/** Last visit. */
		lastRecordedVisit?: SpruceSchema.IDateTimeFieldValue | undefined | null
		/** Job. */
		job: SpruceSchemas.Core.IJob
		/** Location. */
		location: SpruceSchemas.Core.ILocation
		/** User. */
		user: SpruceSchemas.Core.IUser
	}
}

export declare namespace SpruceSchemas.Core.UserLocation {
	/** The interface for the schema definition for a User location */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'userLocation'
		name: 'User location'
		description: 'A location a person has given access to themselves.'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				options: undefined
			}
			/** Name. */
			role: {
				label: 'Name'
				type: FieldType.Select
				isRequired: true
				options: {
					choices: [
						{ value: 'owner'; label: 'Owner' },
						{ value: 'groupManager'; label: 'District/region manager' },
						{ value: 'manager'; label: 'Store manager' },
						{ value: 'teammate'; label: 'Teammate' },
						{ value: 'guest'; label: 'Guest' }
					]
				}
			}
			/** Status. */
			status: {
				label: 'Status'
				type: FieldType.Text
				options: undefined
			}
			/** Total visits. */
			visits: {
				label: 'Total visits'
				type: FieldType.Number
				isRequired: true
				options: {
					choices: [
						{ value: 'owner'; label: 'Owner' },
						{ value: 'groupManager'; label: 'District/region manager' },
						{ value: 'manager'; label: 'Store manager' },
						{ value: 'teammate'; label: 'Teammate' },
						{ value: 'guest'; label: 'Guest' }
					]
				}
			}
			/** Last visit. */
			lastRecordedVisit: {
				label: 'Last visit'
				type: FieldType.DateTime
				options: undefined
			}
			/** Job. */
			job: {
				label: 'Job'
				type: FieldType.Schema
				isRequired: true
				options: { schemas: SpruceSchemas.Core.Job.IDefinition[] }
			}
			/** Location. */
			location: {
				label: 'Location'
				type: FieldType.Schema
				isRequired: true
				options: { schemas: SpruceSchemas.Core.Location.IDefinition[] }
			}
			/** User. */
			user: {
				label: 'User'
				type: FieldType.Schema
				isRequired: true
				options: { schemas: SpruceSchemas.Core.User.IDefinition[] }
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Core.UserLocation.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/** A directory that is autoloaded */
	export interface IAutoloader {
		/** Source directory. */
		lookupDir: SpruceSchema.IDirectoryFieldValue
		/** Destination. Where the file that does the autoloading is written */
		destination: SpruceSchema.IFileFieldValue
		/** Pattern. */
		pattern: string
	}
}

export declare namespace SpruceSchemas.Local.Autoloader {
	/** The interface for the schema definition for a Autoloader */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'autoloader'
		name: 'Autoloader'
		description: 'A directory that is autoloaded'
		fields: {
			/** Source directory. */
			lookupDir: {
				label: 'Source directory'
				type: FieldType.Directory
				isRequired: true
				options: undefined
			}
			/** Destination. Where the file that does the autoloading is written */
			destination: {
				label: 'Destination'
				type: FieldType.File
				isRequired: true
				hint: 'Where the file that does the autoloading is written'
				options: undefined
			}
			/** Pattern. */
			pattern: {
				label: 'Pattern'
				type: FieldType.Text
				isRequired: true
				defaultValue: '**/!(*.test).ts'
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.Autoloader.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/** A stripped down skill for the cli */
	export interface ICliSkill {
		/** Id. */
		id: string
		/** Id. */
		apiKey: string
		/** Name. */
		name: string
		/** Slug. */
		slug?: string | undefined | null
	}
}

export declare namespace SpruceSchemas.Local.CliSkill {
	/** The interface for the schema definition for a Skill */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'cliSkill'
		name: 'Skill'
		description: 'A stripped down skill for the cli'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Id. */
			apiKey: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Name. */
			name: {
				label: 'Name'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** Slug. */
			slug: {
				label: 'Slug'
				type: FieldType.Text
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.CliSkill.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/** A stripped down user for the cli */
	export interface ICliUser {
		/** Id. */
		id: string
		/** Casual name. Generated name that defaults to Friend! */
		casualName: string
	}
}

export declare namespace SpruceSchemas.Local.CliUser {
	/** The interface for the schema definition for a User */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'cliUser'
		name: 'User'
		description: 'A stripped down user for the cli'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Casual name. Generated name that defaults to Friend! */
			casualName: {
				label: 'Casual name'
				type: FieldType.Text
				isRequired: true
				hint: 'Generated name that defaults to Friend!'
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.CliUser.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/** A stripped down cli user with token details for login */
	export interface ICliUserWithToken {
		/** Id. */
		id: string
		/** Casual name. Generated name that defaults to Friend! */
		casualName: string

		token: string
		/** Logged in. */
		isLoggedIn?: boolean | undefined | null
	}
}

export declare namespace SpruceSchemas.Local.CliUserWithToken {
	/** The interface for the schema definition for a User */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'cliUserWithToken'
		name: 'User'
		description: 'A stripped down cli user with token details for login'
		fields: {
			/** Id. */
			id: {
				label: 'Id'
				type: FieldType.Id
				isRequired: true
				options: undefined
			}
			/** Casual name. Generated name that defaults to Friend! */
			casualName: {
				label: 'Casual name'
				type: FieldType.Text
				isRequired: true
				hint: 'Generated name that defaults to Friend!'
				options: undefined
			}
			/** . */
			token: {
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** Logged in. */
			isLoggedIn: {
				label: 'Logged in'
				type: FieldType.Boolean
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<
		SpruceSchemas.Local.CliUserWithToken.IDefinition
	>
}

export declare namespace SpruceSchemas.Local {
	/** Used to collect input on the names of a class or interface */
	export interface INamedTemplateItem {
		/** Readable name. The name people will read */
		nameReadable: string
		/** Camel case name. camelCase version of the name */
		nameCamel: string
		/** Plural camel case name. camelCase version of the name */
		nameCamelPlural: string
		/** Pascal case name. PascalCase of the name */
		namePascal: string
		/** Plural Pascal case name. PascalCase of the name */
		namePascalPlural: string
		/** Constant case name. CONST_CASE of the name */
		nameConst: string
		/** Description. */
		description: string
	}
}

export declare namespace SpruceSchemas.Local.NamedTemplateItem {
	/** The interface for the schema definition for a NamedTemplateItem */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'namedTemplateItem'
		name: 'NamedTemplateItem'
		description: 'Used to collect input on the names of a class or interface'
		fields: {
			/** Readable name. The name people will read */
			nameReadable: {
				label: 'Readable name'
				type: FieldType.Text
				isRequired: true
				hint: 'The name people will read'
				options: undefined
			}
			/** Camel case name. camelCase version of the name */
			nameCamel: {
				label: 'Camel case name'
				type: FieldType.Text
				isRequired: true
				hint: 'camelCase version of the name'
				options: undefined
			}
			/** Plural camel case name. camelCase version of the name */
			nameCamelPlural: {
				label: 'Plural camel case name'
				type: FieldType.Text
				isRequired: true
				hint: 'camelCase version of the name'
				options: undefined
			}
			/** Pascal case name. PascalCase of the name */
			namePascal: {
				label: 'Pascal case name'
				type: FieldType.Text
				isRequired: true
				hint: 'PascalCase of the name'
				options: undefined
			}
			/** Plural Pascal case name. PascalCase of the name */
			namePascalPlural: {
				label: 'Plural Pascal case name'
				type: FieldType.Text
				isRequired: true
				hint: 'PascalCase of the name'
				options: undefined
			}
			/** Constant case name. CONST_CASE of the name */
			nameConst: {
				label: 'Constant case name'
				type: FieldType.Text
				isRequired: true
				hint: 'CONST_CASE of the name'
				options: undefined
			}
			/** Description. */
			description: {
				label: 'Description'
				type: FieldType.Text
				isRequired: true
				description: 'Describe a bit more here'
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<
		SpruceSchemas.Local.NamedTemplateItem.IDefinition
	>
}

export declare namespace SpruceSchemas.Local {
	/** Track onboarding progress and tutorials &amp; quizzes completed. */
	export interface IOnboarding {
		/** Remote. */
		isEnabled: boolean
		/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
		runCount: number
	}
}

export declare namespace SpruceSchemas.Local.Onboarding {
	/** The interface for the schema definition for a Onboarding */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'onboarding'
		name: 'Onboarding'
		description: 'Track onboarding progress and tutorials & quizzes completed.'
		fields: {
			/** Remote. */
			isEnabled: {
				label: 'Remote'
				type: FieldType.Boolean
				isRequired: true
				options: undefined
			}
			/** Run count. How many times spruce onboarding has been called (the story changes based on count) */
			runCount: {
				label: 'Run count'
				type: FieldType.Number
				isRequired: true
				hint: 'How many times spruce onboarding has been called (the story changes based on count)'
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.Onboarding.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/**  */
	export interface ISkillFeature {
		/** What's the name of your skill?. */
		name: string
		/** How would you describe your skill?. */
		description: string
	}
}

export declare namespace SpruceSchemas.Local.SkillFeature {
	/** The interface for the schema definition for a Skill Feature */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'skillFeature'
		name: 'Skill Feature'
		fields: {
			/** What's the name of your skill?. */
			name: {
				label: "What's the name of your skill?"
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
			/** How would you describe your skill?. */
			description: {
				label: 'How would you describe your skill?'
				type: FieldType.Text
				isRequired: true
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.SkillFeature.IDefinition>
}

export declare namespace SpruceSchemas.Local {
	/**  */
	export interface ITestFeature {
		/** What file would you like to test?. */
		target: SpruceSchema.IFileFieldValue
	}
}

export declare namespace SpruceSchemas.Local.TestFeature {
	/** The interface for the schema definition for a Test Feature */
	export interface IDefinition extends SpruceSchema.ISchemaDefinition {
		id: 'testFeature'
		name: 'Test Feature'
		fields: {
			/** What file would you like to test?. */
			target: {
				label: 'What file would you like to test?'
				type: FieldType.File
				isRequired: true
				defaultValue: { path: '' }
				options: undefined
			}
		}
	}

	/** The type of a schema instance built off this definition */
	export type Instance = Schema<SpruceSchemas.Local.TestFeature.IDefinition>
}
