import {
	ISpruceSchema,
	FieldType,
	SchemaToValues,
	SpruceSchema,
	SchemaFieldNames,
	IFieldSelectChoice,
	IField,
	ISchemaValidationError
} from '@sprucelabs/spruce-types'
import ITerminal, { ITerminalEffect } from '../utilities/Terminal'

export enum FormBuilderActionType {
	Done = 'done',
	Cancel = 'cancel',
	EditField = 'edit_field'
}

/** in overview mode, this is when the user selects "done" */
export interface IFormBuilderActionDone {
	type: FormBuilderActionType.Done
}

/** in overview mode, this is when the user select "cancel". TODO: in normal mode, this is if they escape out of the questions. */
export interface IFormBuilderActionCancel {
	type: FormBuilderActionType.Cancel
}

/** in overview mode, this is when the user selects to edit a field */
export type IFormBuilderActionEditField<T extends ISpruceSchema> = {
	type: FormBuilderActionType.EditField
	fieldName: SchemaFieldNames<T>
}
/** actions that can be taken in overview mode */
export type IFormBuilderAction<T extends ISpruceSchema> =
	| IFormBuilderActionDone
	| IFormBuilderActionCancel
	| IFormBuilderActionEditField<T>

/** controls for when presenting the form */
export interface IPresentationOptions<T extends ISpruceSchema> {
	headline?: string
	showOverview?: boolean
	fields?: SchemaFieldNames<T>
}

export default class FormBuilder<T extends ISpruceSchema> extends SpruceSchema<
	T
> {
	term: ITerminal

	constructor(
		term: ITerminal,
		definition: T,
		initialValues: Partial<SchemaToValues<T>> = {}
	) {
		// setup schema
		super(definition, initialValues)

		// save term for writing, saving
		this.term = term
	}

	/** pass me a schema and i'll give you back an object that conforms to it based on user input */
	public present = async (
		options: IPresentationOptions<T> = {}
	): Promise<SchemaToValues<T>> => {
		const { term } = this
		const { headline, showOverview } = options

		let done = false
		let valid = false

		do {
			// hard to read as menus build on menus
			term.clear()

			// start with headline
			if (headline) {
				term.headline(headline)
			}

			if (showOverview) {
				// overview mode
				const action = await this.renderOverview()

				switch (action.type) {
					case FormBuilderActionType.EditField: {
						// editing a field
						const fieldName = action.fieldName
						const answer = await this.askQuestion(fieldName)

						// set the new value
						this.set(fieldName, answer)

						break
					}
					case FormBuilderActionType.Done: {
						done = true
					}
				}
			} else {
				// asking one question at a time
				const namedFields = this.getNamedFields()
				await Promise.all(
					namedFields.map(async namedField => {
						const { name } = namedField
						const answer = await this.askQuestion(name)
						this.set(name, answer)
					})
				)
				done = true
			}

			if (done) {
				const errors = this.validate()

				if (errors.length > 0) {
					this.renderErrors(errors)
					valid = false
				} else {
					valid = true
				}
			}
		} while (!done && !valid)

		return this.getValues()
	}

	/** ask a question based on a field */
	public askQuestion(fieldName: SchemaFieldNames<T>) {
		const field = this.fields[fieldName]
		// TODO: why is this requiring me to cast?
		const definition = field.definition as IField
		return this.term.prompt(definition)
	}

	/** pass it schema errors */
	public renderErrors = (errors: ISchemaValidationError<T>[]) => {
		this.term.bar()
		this.term.headline('Please fix the following...', [
			ITerminalEffect.Red,
			ITerminalEffect.Bold
		])

		errors.forEach(error => {
			const { fieldName, errors } = error
			const field = this.fields[fieldName]
			this.term.error(`${field.getLabel()} errors: ${errors.join(', ')}`)
		})
	}

	/** render every field and a select to chose what to edit (or done/cancel) */
	public renderOverview = async (): Promise<IFormBuilderAction<T>> => {
		const { term } = this

		// track actions while building choices
		const actionMap: Record<string, IFormBuilderAction<T>> = {}

		// create all choices
		const choices: IFieldSelectChoice[] = this.getNamedFields().map(item => {
			const { field, name } = item

			const actionKey = `field:${name}`
			const action: IFormBuilderActionEditField<T> = {
				type: FormBuilderActionType.EditField,
				fieldName: name
			}

			// track the action for checking after selection
			actionMap[actionKey] = action

			// get the current value, don't validate
			const value = this.get(name, { validate: false })

			return {
				value: actionKey,
				label: `${field.getLabel()}: ${value ? value : '***missing***'}`
			}
		})

		// done choice
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
