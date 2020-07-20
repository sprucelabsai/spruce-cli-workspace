import { ISchemaDefinition } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import FieldType from '#spruce/schemas/fields/fieldTypeEnum'
import AbstractCliTest from '../../AbstractCliTest'
import featuresUtil from '../../features/feature.utilities'

export default class CommandGeneratorTest extends AbstractCliTest {
	@test()
	protected static async hasAliasGenerated() {
		assert.isFunction(featuresUtil.generateCommandAliases)
	}

	@test()
	protected static async canAliasOneField() {
		const person: ISchemaDefinition = {
			id: 'alias-person',
			name: 'person alias',
			fields: {
				firstName: {
					type: FieldType.Text,
				},
			},
		}

		const aliases = featuresUtil.generateCommandAliases(person)

		assert.isLength(Object.keys(aliases), 1)
		assert.doesInclude(aliases, { firstName: '--fn, --firstName <firstName>' })
	}

	@test()
	protected static async canAliasTwoFields() {
		const person: ISchemaDefinition = {
			id: 'alias-person',
			name: 'person alias',
			fields: {
				firstName: {
					type: FieldType.Text,
				},
				lastName: {
					type: FieldType.Text,
				},
			},
		}

		const aliases = featuresUtil.generateCommandAliases(person)

		assert.isLength(Object.keys(aliases), 2)
		assert.doesInclude(aliases, { firstName: '--fn, --firstName <firstName>' })
		assert.doesInclude(aliases, { lastName: '--ln, --lastName <lastName>' })
	}
}
