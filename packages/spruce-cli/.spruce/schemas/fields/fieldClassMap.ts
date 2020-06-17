import { FieldType } from '#spruce:schema/fields/fieldType'
import { FieldClass } from '#spruce:schema/fields/fields.types'

import { AddressField } from '@sprucelabs/schema'
import { BooleanField } from '@sprucelabs/schema'
import { DateField } from '@sprucelabs/schema'
import { DateTimeField } from '@sprucelabs/schema'
import { DirectoryField } from '@sprucelabs/schema'
import { DurationField } from '@sprucelabs/schema'
import { FileField } from '@sprucelabs/schema'
import { IdField } from '@sprucelabs/schema'
import { NumberField } from '@sprucelabs/schema'
import { PhoneField } from '@sprucelabs/schema'
import { RawField } from '@sprucelabs/schema'
import { SchemaField } from '@sprucelabs/schema'
import { SelectField } from '@sprucelabs/schema'
import { TextField } from '@sprucelabs/schema'


/** Value for looking up field classes by field type */
export const FieldClassMap: Record<FieldType, FieldClass> = {
		[FieldType.Address]: AddressField,
		[FieldType.Boolean]: BooleanField,
		[FieldType.Date]: DateField,
		[FieldType.DateTime]: DateTimeField,
		[FieldType.Directory]: DirectoryField,
		[FieldType.Duration]: DurationField,
		[FieldType.File]: FileField,
		[FieldType.Id]: IdField,
		[FieldType.Number]: NumberField,
		[FieldType.Phone]: PhoneField,
		[FieldType.Raw]: RawField,
		[FieldType.Schema]: SchemaField,
		[FieldType.Select]: SelectField,
		[FieldType.Text]: TextField,
}
