import * as SpruceSchema from "@sprucelabs/schema";

export namespace SpruceSchemas.core.User {
	export const id = "user";
	export type id = "user";

	/* A human being. */
	export interface IUser {
		/* Id. */
		id?: string;
		/* First name. */
		firstName?: string;
		/* Last name. */
		lastName?: string;
		/* Casual name. Generated name that defaults to Friend! */
		casualName: string;
		/* Phone. The person&#x27;s phone number! */
		phoneNumber: string;
		/* Profile photos. */
		profileImages?: SpruceSchemas.core.ProfileImage.IProfileImage;
		/* Default profile photos. */
		defaultProfileImages: SpruceSchemas.core.ProfileImage.IProfileImage;
	}

	/* the schema definition for a User */
	export const definition: SpruceSchemas.core.User.IUserDefinition = {
		id: "user",
		name: "User",
		description: "A human being.",

		fields: {
			id: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			firstName: {
				label: "First name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			lastName: {
				label: "Last name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			casualName: {
				label: "Casual name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			phoneNumber: {
				label: "Phone",
				type: SpruceSchema.FieldType.Phone,

				options: {}
			},
			profileImages: {
				label: "Profile photos",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.ProfileImage.id }
			},
			defaultProfileImages: {
				label: "Default profile photos",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.ProfileImage.id }
			}
		}
	};

	/* the interface for the schema definition for a User */
	export interface IUserDefinition {
		id: "user";
		name: "User";
		description: "A human being.";

		fields: {
			id: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			firstName: {
				label: "First name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			lastName: {
				label: "Last name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			casualName: {
				label: "Casual name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			phoneNumber: {
				label: "Phone";
				type: SpruceSchema.FieldType.Phone;

				options: {};
			};
			profileImages: {
				label: "Profile photos";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.ProfileImage.id };
			};
			defaultProfileImages: {
				label: "Default profile photos";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.ProfileImage.id };
			};
		};
	}
}

export namespace SpruceSchemas.core.ProfileImage {
	export const id = "profileImage";
	export type id = "profileImage";

	/* Profile images at various helpful sizes and resolutions. */
	export interface IProfileImage {
		/* 60x60. */
		profile60: string;
		/* 150x150. */
		profile150: string;
		/* 60x60. */
		"profile60@2x": string;
		/* 150x150. */
		"profile150@2x": string;
	}

	/* the schema definition for a ProfileImage */
	export const definition: SpruceSchemas.core.ProfileImage.IProfileImageDefinition = {
		id: "profileImage",
		name: "Profile Image Sizes",
		description: "Profile images at various helpful sizes and resolutions.",

		fields: {
			profile60: {
				label: "60x60",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			profile150: {
				label: "150x150",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			"profile60@2x": {
				label: "60x60",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			"profile150@2x": {
				label: "150x150",
				type: SpruceSchema.FieldType.Text,

				options: {}
			}
		}
	};

	/* the interface for the schema definition for a ProfileImage */
	export interface IProfileImageDefinition {
		id: "profileImage";
		name: "Profile Image Sizes";
		description: "Profile images at various helpful sizes and resolutions.";

		fields: {
			profile60: {
				label: "60x60";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			profile150: {
				label: "150x150";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			"profile60@2x": {
				label: "60x60";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			"profile150@2x": {
				label: "150x150";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.Skill {
	export const id = "skill";
	export type id = "skill";

	/* An ability Sprucebot has learned. */
	export interface ISkill {
		/* Id. */
		id?: string;
		/* Id. */
		apiKey?: string;
		/* Name. */
		name: string;
		/* Description. */
		description?: string;
		/* Slug. */
		slug?: string;
		/* Icon. */
		icon?: string;
	}

	/* the schema definition for a Skill */
	export const definition: SpruceSchemas.core.Skill.ISkillDefinition = {
		id: "skill",
		name: "Skill",
		description: "An ability Sprucebot has learned.",

		fields: {
			id: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			apiKey: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			name: {
				label: "Name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			description: {
				label: "Description",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			slug: {
				label: "Slug",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			icon: {
				label: "Icon",
				type: SpruceSchema.FieldType.Text,

				options: {}
			}
		}
	};

	/* the interface for the schema definition for a Skill */
	export interface ISkillDefinition {
		id: "skill";
		name: "Skill";
		description: "An ability Sprucebot has learned.";

		fields: {
			id: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			apiKey: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			name: {
				label: "Name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			description: {
				label: "Description";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			slug: {
				label: "Slug";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			icon: {
				label: "Icon";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.Location {
	export const id = "location";
	export type id = "location";

	/* A physical location where people meet. An organization has at least one of them. */
	export interface ILocation {
		/* Id. */
		id?: string;
		/* Name. */
		name: string;
		/* Store number. You can use other symbols, like # or dashes. #123 or 32-US-5 */
		num?: string;
		/* Public. Is this location viewable by guests? */
		isPublic?: boolean;
		/* Main Phone. */
		phone?: string;
		/* Timezone. */
		timezone?: string;
		/* Address. */
		address: SpruceSchema.IFieldAddressValue;
	}

	/* the schema definition for a Location */
	export const definition: SpruceSchemas.core.Location.ILocationDefinition = {
		id: "location",
		name: "Location",
		description:
			"A physical location where people meet. An organization has at least one of them.",

		fields: {
			id: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			name: {
				label: "Name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			num: {
				label: "Store number",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			isPublic: {
				label: "Public",
				type: SpruceSchema.FieldType.Boolean,

				options: {}
			},
			phone: {
				label: "Main Phone",
				type: SpruceSchema.FieldType.Phone,

				options: {}
			},
			timezone: {
				label: "Timezone",
				type: SpruceSchema.FieldType.Select,

				options: {
					choices: [
						{ value: "etc/gmt+12", label: "International Date Line West" },
						{ value: "pacific/midway", label: "Midway Island, Samoa" },
						{ value: "pacific/honolulu", label: "Hawaii" },
						{ value: "us/alaska", label: "Alaska" },
						{
							value: "america/los_Angeles",
							label: "Pacific Time (US & Canada)"
						},
						{ value: "america/tijuana", label: "Tijuana, Baja California" },
						{ value: "us/arizona", label: "Arizona" },
						{
							value: "america/chihuahua",
							label: "Chihuahua, La Paz, Mazatlan"
						},
						{ value: "us/mountain", label: "Mountain Time (US & Canada)" },
						{ value: "america/managua", label: "Central America" },
						{ value: "us/central", label: "Central Time (US & Canada)" },
						{
							value: "america/mexico_City",
							label: "Guadalajara, Mexico City, Monterrey"
						},
						{ value: "Canada/Saskatchewan", label: "Saskatchewan" },
						{
							value: "america/bogota",
							label: "Bogota, Lima, Quito, Rio Branco"
						},
						{ value: "us/eastern", label: "Eastern Time (US & Canada)" },
						{ value: "us/east-indiana", label: "Indiana (East)" },
						{ value: "Canada/atlantic", label: "Atlantic Time (Canada)" },
						{ value: "america/caracas", label: "Caracas, La Paz" },
						{ value: "america/manaus", label: "Manaus" },
						{ value: "america/Santiago", label: "Santiago" },
						{ value: "Canada/Newfoundland", label: "Newfoundland" },
						{ value: "america/Sao_Paulo", label: "Brasilia" },
						{
							value: "america/argentina/buenos_Aires",
							label: "Buenos Aires, Georgetown"
						},
						{ value: "america/godthab", label: "Greenland" },
						{ value: "america/montevideo", label: "Montevideo" },
						{ value: "america/Noronha", label: "Mid-Atlantic" },
						{ value: "atlantic/cape_Verde", label: "Cape Verde Is." },
						{ value: "atlantic/azores", label: "Azores" },
						{
							value: "africa/casablanca",
							label: "Casablanca, Monrovia, Reykjavik"
						},
						{
							value: "etc/gmt",
							label: "Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London"
						},
						{
							value: "europe/amsterdam",
							label: "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna"
						},
						{
							value: "europe/belgrade",
							label: "Belgrade, Bratislava, Budapest, Ljubljana, Prague"
						},
						{
							value: "europe/brussels",
							label: "Brussels, Copenhagen, Madrid, Paris"
						},
						{
							value: "europe/Sarajevo",
							label: "Sarajevo, Skopje, Warsaw, Zagreb"
						},
						{ value: "africa/lagos", label: "West Central Africa" },
						{ value: "asia/amman", label: "Amman" },
						{ value: "europe/athens", label: "Athens, Bucharest, Istanbul" },
						{ value: "asia/beirut", label: "Beirut" },
						{ value: "africa/cairo", label: "Cairo" },
						{ value: "africa/Harare", label: "Harare, Pretoria" },
						{
							value: "europe/Helsinki",
							label: "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius"
						},
						{ value: "asia/Jerusalem", label: "Jerusalem" },
						{ value: "europe/minsk", label: "Minsk" },
						{ value: "africa/Windhoek", label: "Windhoek" },
						{ value: "asia/Kuwait", label: "Kuwait, Riyadh, Baghdad" },
						{
							value: "europe/moscow",
							label: "Moscow, St. Petersburg, Volgograd"
						},
						{ value: "africa/Nairobi", label: "Nairobi" },
						{ value: "asia/tbilisi", label: "Tbilisi" },
						{ value: "asia/tehran", label: "Tehran" },
						{ value: "asia/muscat", label: "Abu Dhabi, Muscat" },
						{ value: "asia/baku", label: "Baku" },
						{ value: "asia/Yerevan", label: "Yerevan" },
						{ value: "asia/Kabul", label: "Kabul" },
						{ value: "asia/Yekaterinburg", label: "Yekaterinburg" },
						{ value: "asia/Karachi", label: "Islamabad, Karachi, Tashkent" },
						{
							value: "asia/calcutta",
							label: "Chennai, Kolkata, Mumbai, New Delhi"
						},
						{ value: "asia/calcutta", label: "Sri Jayawardenapura" },
						{ value: "asia/Katmandu", label: "Kathmandu" },
						{ value: "asia/almaty", label: "Almaty, Novosibirsk" },
						{ value: "asia/Dhaka", label: "Astana, Dhaka" },
						{ value: "asia/Rangoon", label: "Yangon (Rangoon)" },
						{ value: "asia/bangkok", label: "Bangkok, Hanoi, Jakarta" },
						{ value: "asia/Krasnoyarsk", label: "Krasnoyarsk" },
						{
							value: "asia/Hong_Kong",
							label: "Beijing, Chongqing, Hong Kong, Urumqi"
						},
						{ value: "asia/Kuala_Lumpur", label: "Kuala Lumpur, Singapore" },
						{ value: "asia/Irkutsk", label: "Irkutsk, Ulaan Bataar" },
						{ value: "Australia/Perth", label: "Perth" },
						{ value: "asia/taipei", label: "Taipei" },
						{ value: "asia/tokyo", label: "Osaka, Sapporo, Tokyo" },
						{ value: "asia/Seoul", label: "Seoul" },
						{ value: "asia/Yakutsk", label: "Yakutsk" },
						{ value: "Australia/adelaide", label: "Adelaide" },
						{ value: "Australia/Darwin", label: "Darwin" },
						{ value: "Australia/brisbane", label: "Brisbane" },
						{
							value: "Australia/canberra",
							label: "Canberra, Melbourne, Sydney"
						},
						{ value: "Australia/Hobart", label: "Hobart" },
						{ value: "pacific/guam", label: "Guam, Port Moresby" },
						{ value: "asia/Vladivostok", label: "Vladivostok" },
						{
							value: "asia/magadan",
							label: "Magadan, Solomon Is., New Caledonia"
						},
						{ value: "pacific/auckland", label: "Auckland, Wellington" },
						{ value: "pacific/Fiji", label: "Fiji, Kamchatka, Marshall Is." },
						{ value: "pacific/tongatapu", label: "Nuku'alofa" }
					]
				}
			},
			address: {
				label: "Address",
				type: SpruceSchema.FieldType.Address,

				options: {}
			}
		}
	};

	/* the interface for the schema definition for a Location */
	export interface ILocationDefinition {
		id: "location";
		name: "Location";
		description: "A physical location where people meet. An organization has at least one of them.";

		fields: {
			id: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			name: {
				label: "Name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			num: {
				label: "Store number";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			isPublic: {
				label: "Public";
				type: SpruceSchema.FieldType.Boolean;

				options: {};
			};
			phone: {
				label: "Main Phone";
				type: SpruceSchema.FieldType.Phone;

				options: {};
			};
			timezone: {
				label: "Timezone";
				type: SpruceSchema.FieldType.Select;

				options: {
					choices: [
						{ value: "etc/gmt+12"; label: "International Date Line West" },
						{ value: "pacific/midway"; label: "Midway Island, Samoa" },
						{ value: "pacific/honolulu"; label: "Hawaii" },
						{ value: "us/alaska"; label: "Alaska" },
						{
							value: "america/los_Angeles";
							label: "Pacific Time (US & Canada)";
						},
						{ value: "america/tijuana"; label: "Tijuana, Baja California" },
						{ value: "us/arizona"; label: "Arizona" },
						{
							value: "america/chihuahua";
							label: "Chihuahua, La Paz, Mazatlan";
						},
						{ value: "us/mountain"; label: "Mountain Time (US & Canada)" },
						{ value: "america/managua"; label: "Central America" },
						{ value: "us/central"; label: "Central Time (US & Canada)" },
						{
							value: "america/mexico_City";
							label: "Guadalajara, Mexico City, Monterrey";
						},
						{ value: "Canada/Saskatchewan"; label: "Saskatchewan" },
						{
							value: "america/bogota";
							label: "Bogota, Lima, Quito, Rio Branco";
						},
						{ value: "us/eastern"; label: "Eastern Time (US & Canada)" },
						{ value: "us/east-indiana"; label: "Indiana (East)" },
						{ value: "Canada/atlantic"; label: "Atlantic Time (Canada)" },
						{ value: "america/caracas"; label: "Caracas, La Paz" },
						{ value: "america/manaus"; label: "Manaus" },
						{ value: "america/Santiago"; label: "Santiago" },
						{ value: "Canada/Newfoundland"; label: "Newfoundland" },
						{ value: "america/Sao_Paulo"; label: "Brasilia" },
						{
							value: "america/argentina/buenos_Aires";
							label: "Buenos Aires, Georgetown";
						},
						{ value: "america/godthab"; label: "Greenland" },
						{ value: "america/montevideo"; label: "Montevideo" },
						{ value: "america/Noronha"; label: "Mid-Atlantic" },
						{ value: "atlantic/cape_Verde"; label: "Cape Verde Is." },
						{ value: "atlantic/azores"; label: "Azores" },
						{
							value: "africa/casablanca";
							label: "Casablanca, Monrovia, Reykjavik";
						},
						{
							value: "etc/gmt";
							label: "Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London";
						},
						{
							value: "europe/amsterdam";
							label: "Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna";
						},
						{
							value: "europe/belgrade";
							label: "Belgrade, Bratislava, Budapest, Ljubljana, Prague";
						},
						{
							value: "europe/brussels";
							label: "Brussels, Copenhagen, Madrid, Paris";
						},
						{
							value: "europe/Sarajevo";
							label: "Sarajevo, Skopje, Warsaw, Zagreb";
						},
						{ value: "africa/lagos"; label: "West Central Africa" },
						{ value: "asia/amman"; label: "Amman" },
						{ value: "europe/athens"; label: "Athens, Bucharest, Istanbul" },
						{ value: "asia/beirut"; label: "Beirut" },
						{ value: "africa/cairo"; label: "Cairo" },
						{ value: "africa/Harare"; label: "Harare, Pretoria" },
						{
							value: "europe/Helsinki";
							label: "Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius";
						},
						{ value: "asia/Jerusalem"; label: "Jerusalem" },
						{ value: "europe/minsk"; label: "Minsk" },
						{ value: "africa/Windhoek"; label: "Windhoek" },
						{ value: "asia/Kuwait"; label: "Kuwait, Riyadh, Baghdad" },
						{
							value: "europe/moscow";
							label: "Moscow, St. Petersburg, Volgograd";
						},
						{ value: "africa/Nairobi"; label: "Nairobi" },
						{ value: "asia/tbilisi"; label: "Tbilisi" },
						{ value: "asia/tehran"; label: "Tehran" },
						{ value: "asia/muscat"; label: "Abu Dhabi, Muscat" },
						{ value: "asia/baku"; label: "Baku" },
						{ value: "asia/Yerevan"; label: "Yerevan" },
						{ value: "asia/Kabul"; label: "Kabul" },
						{ value: "asia/Yekaterinburg"; label: "Yekaterinburg" },
						{ value: "asia/Karachi"; label: "Islamabad, Karachi, Tashkent" },
						{
							value: "asia/calcutta";
							label: "Chennai, Kolkata, Mumbai, New Delhi";
						},
						{ value: "asia/calcutta"; label: "Sri Jayawardenapura" },
						{ value: "asia/Katmandu"; label: "Kathmandu" },
						{ value: "asia/almaty"; label: "Almaty, Novosibirsk" },
						{ value: "asia/Dhaka"; label: "Astana, Dhaka" },
						{ value: "asia/Rangoon"; label: "Yangon (Rangoon)" },
						{ value: "asia/bangkok"; label: "Bangkok, Hanoi, Jakarta" },
						{ value: "asia/Krasnoyarsk"; label: "Krasnoyarsk" },
						{
							value: "asia/Hong_Kong";
							label: "Beijing, Chongqing, Hong Kong, Urumqi";
						},
						{ value: "asia/Kuala_Lumpur"; label: "Kuala Lumpur, Singapore" },
						{ value: "asia/Irkutsk"; label: "Irkutsk, Ulaan Bataar" },
						{ value: "Australia/Perth"; label: "Perth" },
						{ value: "asia/taipei"; label: "Taipei" },
						{ value: "asia/tokyo"; label: "Osaka, Sapporo, Tokyo" },
						{ value: "asia/Seoul"; label: "Seoul" },
						{ value: "asia/Yakutsk"; label: "Yakutsk" },
						{ value: "Australia/adelaide"; label: "Adelaide" },
						{ value: "Australia/Darwin"; label: "Darwin" },
						{ value: "Australia/brisbane"; label: "Brisbane" },
						{
							value: "Australia/canberra";
							label: "Canberra, Melbourne, Sydney";
						},
						{ value: "Australia/Hobart"; label: "Hobart" },
						{ value: "pacific/guam"; label: "Guam, Port Moresby" },
						{ value: "asia/Vladivostok"; label: "Vladivostok" },
						{
							value: "asia/magadan";
							label: "Magadan, Solomon Is., New Caledonia";
						},
						{ value: "pacific/auckland"; label: "Auckland, Wellington" },
						{ value: "pacific/Fiji"; label: "Fiji, Kamchatka, Marshall Is." },
						{ value: "pacific/tongatapu"; label: "Nuku'alofa" }
					];
				};
			};
			address: {
				label: "Address";
				type: SpruceSchema.FieldType.Address;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.UserLocation {
	export const id = "userLocation";
	export type id = "userLocation";

	/* A location a person has given access to themselves. */
	export interface IUserLocation {
		/* Id. */
		id?: string;
		/* Name. */
		role: string;
		/* Status. */
		status?: string;
		/* Total visits. */
		visits: number;
		/* Last visit. */
		lastRecordedVisit?: SpruceSchema.IFieldDateTimeValue;
		/* Job. */
		job: SpruceSchemas.core.Job.IJob;
		/* Location. */
		location: SpruceSchemas.core.Location.ILocation;
		/* User. */
		user: SpruceSchemas.core.User.IUser;
	}

	/* the schema definition for a UserLocation */
	export const definition: SpruceSchemas.core.UserLocation.IUserLocationDefinition = {
		id: "userLocation",
		name: "User location",
		description: "A location a person has given access to themselves.",

		fields: {
			id: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			role: {
				label: "Name",
				type: SpruceSchema.FieldType.Select,

				options: {
					choices: [
						{ value: "owner", label: "Owner" },
						{ value: "groupManager", label: "District/region manager" },
						{ value: "manager", label: "Store manager" },
						{ value: "teammate", label: "Teammate" },
						{ value: "guest", label: "Guest" }
					]
				}
			},
			status: {
				label: "Status",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			visits: {
				label: "Total visits",
				type: SpruceSchema.FieldType.Number,

				options: {
					choices: [
						{ value: "owner", label: "Owner" },
						{ value: "groupManager", label: "District/region manager" },
						{ value: "manager", label: "Store manager" },
						{ value: "teammate", label: "Teammate" },
						{ value: "guest", label: "Guest" }
					]
				}
			},
			lastRecordedVisit: {
				label: "Last visit",
				type: SpruceSchema.FieldType.DateTime,

				options: {}
			},
			job: {
				label: "Job",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.Job.id }
			},
			location: {
				label: "Location",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.Location.id }
			},
			user: {
				label: "User",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.User.id }
			}
		}
	};

	/* the interface for the schema definition for a UserLocation */
	export interface IUserLocationDefinition {
		id: "userLocation";
		name: "User location";
		description: "A location a person has given access to themselves.";

		fields: {
			id: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			role: {
				label: "Name";
				type: SpruceSchema.FieldType.Select;

				options: {
					choices: [
						{ value: "owner"; label: "Owner" },
						{ value: "groupManager"; label: "District/region manager" },
						{ value: "manager"; label: "Store manager" },
						{ value: "teammate"; label: "Teammate" },
						{ value: "guest"; label: "Guest" }
					];
				};
			};
			status: {
				label: "Status";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			visits: {
				label: "Total visits";
				type: SpruceSchema.FieldType.Number;

				options: {
					choices: [
						{ value: "owner"; label: "Owner" },
						{ value: "groupManager"; label: "District/region manager" },
						{ value: "manager"; label: "Store manager" },
						{ value: "teammate"; label: "Teammate" },
						{ value: "guest"; label: "Guest" }
					];
				};
			};
			lastRecordedVisit: {
				label: "Last visit";
				type: SpruceSchema.FieldType.DateTime;

				options: {};
			};
			job: {
				label: "Job";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.Job.id };
			};
			location: {
				label: "Location";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.Location.id };
			};
			user: {
				label: "User";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.User.id };
			};
		};
	}
}

export namespace SpruceSchemas.core.Job {
	export const id = "job";
	export type id = "job";

	/* A position at a company. The answer to the question; What is your job? */
	export interface IJob {
		/* Id. */
		id?: string;
		/* Is default. Is this job one that comes with every org? Mapped to roles (owner, groupManager, managar, guest). */
		isDefault: string;
		/* Name. */
		name: string;
		/* Role. */
		role: string;
		/* On work permissions. */
		inStoreAcls?: SpruceSchemas.core.Acl.IAcl;
		/* Off work permissions. */
		acls?: SpruceSchemas.core.Acl.IAcl;
	}

	/* the schema definition for a Job */
	export const definition: SpruceSchemas.core.Job.IJobDefinition = {
		id: "job",
		name: "Job",
		description:
			"A position at a company. The answer to the question; What is your job?",

		fields: {
			id: {
				label: "Id",
				type: SpruceSchema.FieldType.Id,

				options: {}
			},
			isDefault: {
				label: "Is default",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			name: {
				label: "Name",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			role: {
				label: "Role",
				type: SpruceSchema.FieldType.Select,

				options: {
					choices: [
						{ value: "owner", label: "Owner" },
						{ value: "groupManager", label: "District/region manager" },
						{ value: "manager", label: "Store manager" },
						{ value: "teammate", label: "Teammate" },
						{ value: "guest", label: "Guest" }
					]
				}
			},
			inStoreAcls: {
				label: "On work permissions",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.Acl.id }
			},
			acls: {
				label: "Off work permissions",
				type: SpruceSchema.FieldType.Schema,

				options: { schemaId: SpruceSchemas.core.Acl.id }
			}
		}
	};

	/* the interface for the schema definition for a Job */
	export interface IJobDefinition {
		id: "job";
		name: "Job";
		description: "A position at a company. The answer to the question; What is your job?";

		fields: {
			id: {
				label: "Id";
				type: SpruceSchema.FieldType.Id;

				options: {};
			};
			isDefault: {
				label: "Is default";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			name: {
				label: "Name";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			role: {
				label: "Role";
				type: SpruceSchema.FieldType.Select;

				options: {
					choices: [
						{ value: "owner"; label: "Owner" },
						{ value: "groupManager"; label: "District/region manager" },
						{ value: "manager"; label: "Store manager" },
						{ value: "teammate"; label: "Teammate" },
						{ value: "guest"; label: "Guest" }
					];
				};
			};
			inStoreAcls: {
				label: "On work permissions";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.Acl.id };
			};
			acls: {
				label: "Off work permissions";
				type: SpruceSchema.FieldType.Schema;

				options: { schemaId: SpruceSchemas.core.Acl.id };
			};
		};
	}
}

export namespace SpruceSchemas.core.Acl {
	export const id = "acl";
	export type id = "acl";

	/*  */
	export interface IAcl {
		/* Permissions grouped by slug. */
		[slug: string]: string[];
	}

	/* the schema definition for a Acl */
	export const definition: SpruceSchemas.core.Acl.IAclDefinition = {
		id: "acl",
		name: "Access control list lookup table",
		description: "",
		dynamicKeySignature: {
			label: "Permissions grouped by slug",
			type: SpruceSchema.FieldType.Text,

			options: {}
		}
	};

	/* the interface for the schema definition for a Acl */
	export interface IAclDefinition {
		id: "acl";
		name: "Access control list lookup table";
		description: "";
		dynamicKeySignature: {
			label: "Permissions grouped by slug";
			type: SpruceSchema.FieldType.Text;

			options: {};
		};
	}
}
