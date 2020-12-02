import { EventContract } from '@sprucelabs/mercury-types'
import { CORE_NAMESPACE } from '@sprucelabs/spruce-skill-utils'
import { EventContractTemplateItem } from '@sprucelabs/spruce-templates'
import { test, assert } from '@sprucelabs/test'
import EventTemplateItemBuilder from '../../templateItemBuilders/EventTemplateItemBuilder'
import AbstractCliTest from '../../test/AbstractCliTest'

const didBookContract: EventContract = {
	eventSignatures: {
		'did-book': {},
	},
}

const contractWith2Signatures: EventContract = {
	eventSignatures: {
		'did-book': {},
		'will-book': {},
	},
}

const contractWith2NamespacedSignatures: EventContract = {
	eventSignatures: {
		'appointments.did-book': {},
		'appointments.will-book': {},
	},
}

const didBookTemplateItem: EventContractTemplateItem = {
	namePascal: 'DidBook',
	nameCamel: 'didBook',
	namespace: CORE_NAMESPACE,
	eventSignatures: {
		'did-book': {},
	},
}

const willBookTemplateItem: EventContractTemplateItem = {
	namePascal: 'WillBook',
	nameCamel: 'willBook',
	namespace: CORE_NAMESPACE,
	eventSignatures: {
		'will-book': {},
	},
}

const didBookWithNamespaceTemplateItem: EventContractTemplateItem = {
	namePascal: 'DidBook',
	nameCamel: 'didBook',
	namespace: 'appointments',
	eventSignatures: {
		'appointments.did-book': {},
	},
}

const willBookWithNamespaceTemplateItem: EventContractTemplateItem = {
	namePascal: 'WillBook',
	nameCamel: 'willBook',
	namespace: 'appointments',
	eventSignatures: {
		'appointments.will-book': {},
	},
}

export default class EventTemplateItemBuilderTest extends AbstractCliTest {
	private static itemBuilder: EventTemplateItemBuilder

	protected static async beforeEach() {
		await super.beforeEach()
		this.itemBuilder = new EventTemplateItemBuilder()
	}

	@test()
	protected static async canCreateNewItemBuilder() {
		assert.isTruthy(this.itemBuilder)
	}

	@test()
	protected static async hasGenerateFunction() {
		assert.isFunction(this.itemBuilder.generateTemplateItems)
	}

	@test()
	protected static turnsSingleContractIntoTemplateItem() {
		const results = this.itemBuilder.generateTemplateItems([didBookContract])

		const actual = results[0]

		assert.isEqualDeep(actual, didBookTemplateItem)
	}

	@test(
		'turns 1 contract with 2 event signature into 2 template items',
		[contractWith2Signatures],
		[didBookTemplateItem, willBookTemplateItem]
	)
	@test(
		'turns 2 contract with 2 event signature into 4 template items',
		[contractWith2Signatures, contractWith2Signatures],
		[
			didBookTemplateItem,
			willBookTemplateItem,
			didBookTemplateItem,
			willBookTemplateItem,
		]
	)
	@test(
		'turns 1 contract with 2 namespaced event signatures to 2 template items',
		[contractWith2NamespacedSignatures],
		[didBookWithNamespaceTemplateItem, willBookWithNamespaceTemplateItem]
	)
	protected static generateItems(
		contracts: EventContract[],
		expected: EventContractTemplateItem[]
	) {
		const actual = this.itemBuilder.generateTemplateItems(contracts)
		assert.isEqualDeep(actual, expected)
	}
}
