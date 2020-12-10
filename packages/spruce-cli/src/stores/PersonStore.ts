import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'
import personWithTokenSchema from '#spruce/schemas/spruceCli/v2020_07_22/personWithToken.schema'
import AbstractLocalStore, { LocalStoreSettings } from './AbstractLocalStore'

export type PersonWithToken = SpruceSchemas.SpruceCli.v2020_07_22.PersonWithToken

interface Settings extends LocalStoreSettings {
	loggedInPerson: PersonWithToken | null
}

export default class PersonStore extends AbstractLocalStore<Settings> {
	public readonly name = 'person'

	public getLoggedInPerson(): PersonWithToken | null {
		return this.readValue('loggedInPerson') ?? null
	}

	public setLoggedInPerson(person: PersonWithToken) {
		validateSchemaValues(personWithTokenSchema, person)
		this.writeValue('loggedInPerson', { ...person, isLoggedIn: true })
	}

	public logOutPerson() {
		this.writeValue('loggedInPerson', null)
	}
}
