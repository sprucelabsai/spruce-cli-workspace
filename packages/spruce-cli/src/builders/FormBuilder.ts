import AbstractSpruceError from '@sprucelabs/error'
import Schema, {
	ISchemaDefinition,
	SchemaDefinitionAllValues,
	SchemaDefinitionPartialValues,
	SchemaFieldNames,
	ISelectFieldDefinitionChoice,
	ErrorCode as SchemaErrorCode,
	SchemaError,
	IFieldDefinition
} from '@sprucelabs/schema'
import { pick } from 'lodash'
import ErrorCode from '#spruce/errors/errorCode'
import { FieldDefinition } from '#spruce/schemas/fields/fields.types'
import FieldType from '#spruce/schemas/fields/fieldType'
import SpruceError from '../errors/SpruceError'
import ITerminal, { ITerminalEffect } from '../utilities/TerminalUtility'

export enum FormBuilderActionType {
	Done = 'done',
	Cancel = 'cancel',
	EditField = 'edit_field'
}

/** In overview mode, this is when the user selects "done" */
export interface IFormActionDone {
	type: FormBuilderActionType.Done
}

/** In overview mode, this is when the user select "cancel". TODO: in normal mode, this is if they escape out of the questions. */
export interface IFormActionCancel {
	type: FormBuilderActionType.Cancel
}

/** In overview mode, this is when the user selects to edit a field */
export type IFormActionEditField<T extends ISchemaDefinition> = {
	type: FormBuilderActionType.EditField
	fieldName: SchemaFieldNames<T>
}
/** Actions that can be taken in overview mode */
export type IFormAction<T extends ISchemaDefinition> =
	| IFormActionDone
	| IFormActionCancel
	| IFormActionEditField<T>

/** Controls for when presenting the form */
export interface IFormPresentationOptions<
	T extends ISchemaDefinition,
	F extends SchemaFieldNames<T> = SchemaFieldNames<T>
> {
	headline?: string
	showOverview?: boolean
	fields?: F[]
}

export interface IFormOptions<T extends ISchemaDefinition> {
	term: ITerminal
	definition: T
	initialValues?: SchemaDefinitionPartialValues<T>
	onWillAskQuestion?: <K extends SchemaFieldNames<T>>(
		name: K,
		fieldDefinition: FieldDefinition,
		values: SchemaDefinitionPartialValues<T>
	) => FieldDefinition
}

interface IHandlers<T extends ISchemaDefinition> {
	onWillAskQuestion?: IFormOptions<T>['onWillAskQuestion']
}

export default class FormBuilder<T extends ISchemaDefinition> extends Schema<
	T
> {
	public term: ITerminal
	public handlers: IHandlers<T> = {}

	public constructor(options: IFormOptions<T>) {
		// Setup schema
		super(options.definition, options.initialValues)

		const { term } = options

		// Save term for writing, saving
		this.term = term

		// Handlers
		const { onWillAskQuestion } = options
		this.handlers.onWillAskQuestion = onWillAskQuestion
	}

	/** Pass me a schema and i'll give you back an object that conforms to it based on user input */
	public async present<F extends SchemaFieldNames<T> = SchemaFieldNames<T>>(
		options: IFormPresentationOptions<T, F> = {}
	): Promise<Pick<SchemaDefinitionAllValues<T>, F>> {
		const { term } = this
		const {
			headline,
			showOverview,
			fields = Object.keys(this.fields) as F[]
		} = options

		let done = false
		let valid = false

		do {
			// Hard to read as menus build on menus
			term.clear()

			// Start with headline
			if (headline) {
				term.headline(headline, [ITerminalEffect.SpruceHeader])
				term.writeLn('')
			}

			if (showOverview) {
				// Overview mode
				const action = await this.renderOverview({ fields })

				switch (action.type) {
					case FormBuilderActionType.EditField: {
						// Editing a field
						const fieldName = action.fieldName
						const answer = await this.askQuestion(fieldName)

						// Set the new value
						this.set(fieldName, answer)

						break
					}
					case FormBuilderActionType.Done: {
						done = true
					}
				}
			} else {
				// Asking one question at a time
				const namedFields = this.getNamedFields({ fields })

				for (const namedField of namedFields) {
					const { name } = namedField
					const answer = await this.askQuestion(name)

					this.set(name, answer)
				}

				done = true
			}

			if (done) {
				try {
					this.validate({ fields })
					valid = true
				} catch (err) {
					this.renderError(err)
					await this.term.wait()
				}
			}
		} while (!done || !valid)

		const values = this.getValues({ fields, createSchemaInstances: false })
		const cleanValues = pick(values, fields) as Pick<
			SchemaDefinitionAllValues<T>,
			F
		>

		return cleanValues
	}

	/** Ask a question based on a field */
	public askQuestion<F extends SchemaFieldNames<T>>(fieldName: F) {
		const field = this.fields[fieldName]

		let definition = { ...field.definition }
		const value = this.values[fieldName]
		if (definition.isArray) {
			throw new SpruceError({
				code: ErrorCode.NotImplemented,
				friendlyMessage: 'Form builder does not support isArray yet'
			})
		}

		if (value) {
			definition.defaultValue = value as IFieldDefinition['defaultValue']
		}

		// Do we have a lister?
		if (this.handlers.onWillAskQuestion) {
			definition = this.handlers.onWillAskQuestion(
				fieldName,
				definition,
				this.values
			)
		}

		return this.term.prompt(definition)
	}

	/** Pass it schema errors */
	public renderError(error: Error) {
		this.term.bar()
		this.term.headline('Please fix the following...', [
			ITerminalEffect.Red,
			ITerminalEffect.Bold
		])

		this.term.writeLn('')

		// Special handling for spruce errors
		if (error instanceof SchemaError) {
			const options = error.options

			switch (options.code) {
				// Invalid fields
				case SchemaErrorCode.InvalidField:
					// Output all errors under all fields
					options.errors.forEach(err => {
						const { name, friendlyMessage, error, code } = err
						this.term.error(
							friendlyMessage ?? `${name}: ${code} ${error?.message}`
						)
					})
					break
				default:
					this.term.error(error.friendlyMessage())
			}
		} else if (error instanceof AbstractSpruceError) {
			this.term.error(error.friendlyMessage())
		} else {
			this.term.error(`Unexpected error ${error.message}`)
		}

		this.term.writeLn('')
	}

	/** Render every field and a select to chose what to edit (or done/cancel) */
	public async renderOverview<F extends SchemaFieldNames<T>>(
		options: { fields?: F[] } = {}
	): Promise<IFormAction<T>> {
		const { term } = this
		const { fields = Object.keys(this.fields) } = options

		// Track actions while building choices
		const actionMap: Record<string, IFormAction<T>> = {}

		// Create all choices
		const choices: ISelectFieldDefinitionChoice[] = this.getNamedFields()
			.filter(namedField => fields.indexOf(namedField.name) > -1)
			.map(namedField => {
				const { field, name } = namedField

				const actionKey = `field:${name}`
				const action: IFormActionEditField<T> = {
					type: FormBuilderActionType.EditField,
					fieldName: name
				}

				// Track the action for checking after selection
				actionMap[actionKey] = action

				// Get the current value, don't validate
				const value = this.get(name, { validate: false })

				return {
					value: actionKey,
					label: `${field.label}: ${value ? value : '***missing***'}`
				}
			})

		// Done choice
		actionMap['done'] = {
			type: FormBuilderActionType.Done
		}

		choices.push({
			value: 'done',
			label: 'Done'
		})

		const response = await term.prompt({
			type: FieldType.Select,
			isRequired: true,
			label: 'Select any field to edit',
			options: {
				choices
			}
		})

		const action = actionMap[response]
		return action
	}
}
