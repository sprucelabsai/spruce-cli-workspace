/** Field Types */
export enum FieldType {
	/** An address with geocoding ability *coming soon* */
	Address = 'address',
	/** A true/false. Converts false string to false, all other strings to true. */
	Boolean = 'boolean',
	/** Date and time support. */
	DateTime = 'dateTime',
	/** A span of time represented in { hours, minutes, seconds, ms } */
	Duration = 'duration',
	/** A way to handle files. Supports mime-type lookups. */
	File = 'file',
	/** A unique identifier field, UUID\'s in our case. */
	Id = 'id',
	/** Casts things to numbers. String numbers are supported. */
	Number = 'number',
	/** Takes anything close to a phone number and formats it. Also great at validating numbers. */
	Phone = 'phone',
	/** Deprecated. For internal purposes only (will be deleted soon) */
	Raw = 'raw',
	/** A way to map relationships. You only need to map relationships one way, two way is currently not supported. */
	Schema = 'schema',
	/** Stored as string, lets user select between available options. */
	Select = 'select',
	/** A text field. Converts non-strings into strings by calling toString(). Size set by options. */
	Text = 'text',
}
