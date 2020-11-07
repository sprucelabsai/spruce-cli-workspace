import { ISchema } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import featuresUtil from '../../features/feature.utilities'
import AbstractCliTest from '../../test/AbstractCliTest'

export default class CommandGeneratorTest extends AbstractCliTest {
	@test()
	protected static hasAliasGenerated() {
		assert.isFunction(featuresUtil.generateCommandAliases)
	}

	@test()
	protected static canAliasOneField() {
		const person: ISchema = {
			id: 'alias-person',
			name: 'person alias',
			fields: {
				firstName: {
					type: 'text',
				},
			},
		}

		const aliases = featuresUtil.generateCommandAliases(person)

		assert.isLength(Object.keys(aliases), 1)
		assert.doesInclude(aliases, {
			firstName: '--fn <firstName>, --firstName <firstName>',
		})
	}

	@test()
	protected static canAliasTwoFields() {
		const person: ISchema = {
			id: 'alias-person',
			name: 'person alias',
			fields: {
				firstName: {
					type: 'text',
				},
				lastName: {
					type: 'text',
				},
			},
		}

		const aliases = featuresUtil.generateCommandAliases(person)

		assert.isLength(Object.keys(aliases), 2)
		assert.doesInclude(aliases, {
			firstName: '--fn <firstName>, --firstName <firstName>',
		})
		assert.doesInclude(aliases, {
			lastName: '--ln <lastName>, --lastName <lastName>',
		})
	}

	@test()
	protected static properlyHandlesBooleans() {
		const person: ISchema = {
			id: 'alias-person',
			name: 'person alias',
			fields: {
				defaultTrue: {
					type: 'boolean',
					defaultValue: true,
				},
				defaultFalse: {
					type: 'boolean',
					defaultValue: false,
				},
				boolNoDefault: {
					type: 'boolean',
				},
			},
		}

		const aliases = featuresUtil.generateCommandAliases(person)

		assert.isLength(Object.keys(aliases), 3)
		assert.doesInclude(aliases, {
			defaultTrue: '--dt [true|false], --defaultTrue [true|false]',
		})
		assert.doesInclude(aliases, {
			defaultFalse: '--df [true|false], --defaultFalse [true|false]',
		})

		assert.doesInclude(aliases, {
			boolNoDefault: '--bnd [true|false], --boolNoDefault [true|false]',
		})
	}
}
