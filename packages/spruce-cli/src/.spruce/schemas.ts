import * as SpruceSchema from "@sprucelabs/schema";

export namespace SpruceSchemas.core.User {
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

				options: {}
			},
			defaultProfileImages: {
				label: "Default profile photos",
				type: SpruceSchema.FieldType.Schema,

				options: {}
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

				options: {};
			};
			defaultProfileImages: {
				label: "Default profile photos";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.ProfileImage {
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

				options: {}
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

				options: {};
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

				options: {}
			},
			status: {
				label: "Status",
				type: SpruceSchema.FieldType.Text,

				options: {}
			},
			visits: {
				label: "Total visits",
				type: SpruceSchema.FieldType.Number,

				options: {}
			},
			lastRecordedVisit: {
				label: "Last visit",
				type: SpruceSchema.FieldType.DateTime,

				options: {}
			},
			job: {
				label: "Job",
				type: SpruceSchema.FieldType.Schema,

				options: {}
			},
			location: {
				label: "Location",
				type: SpruceSchema.FieldType.Schema,

				options: {}
			},
			user: {
				label: "User",
				type: SpruceSchema.FieldType.Schema,

				options: {}
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

				options: {};
			};
			status: {
				label: "Status";
				type: SpruceSchema.FieldType.Text;

				options: {};
			};
			visits: {
				label: "Total visits";
				type: SpruceSchema.FieldType.Number;

				options: {};
			};
			lastRecordedVisit: {
				label: "Last visit";
				type: SpruceSchema.FieldType.DateTime;

				options: {};
			};
			job: {
				label: "Job";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
			location: {
				label: "Location";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
			user: {
				label: "User";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.Job {
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

				options: {}
			},
			inStoreAcls: {
				label: "On work permissions",
				type: SpruceSchema.FieldType.Schema,

				options: {}
			},
			acls: {
				label: "Off work permissions",
				type: SpruceSchema.FieldType.Schema,

				options: {}
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

				options: {};
			};
			inStoreAcls: {
				label: "On work permissions";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
			acls: {
				label: "Off work permissions";
				type: SpruceSchema.FieldType.Schema;

				options: {};
			};
		};
	}
}

export namespace SpruceSchemas.core.Acl {
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
