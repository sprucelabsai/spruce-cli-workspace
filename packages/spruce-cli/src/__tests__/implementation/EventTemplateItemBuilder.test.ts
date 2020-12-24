import { EventContract } from '@sprucelabs/mercury-types'
import { buildSchema, SchemaTemplateItem } from '@sprucelabs/schema'
import {
	MERCURY_API_NAMESPACE,
	namesUtil,
} from '@sprucelabs/spruce-skill-utils'
import { EventContractTemplateItem } from '@sprucelabs/spruce-templates'
import { test, assert } from '@sprucelabs/test'
import EventTemplateItemBuilder from '../../templateItemBuilders/EventTemplateItemBuilder'
import AbstractCliTest from '../../tests/AbstractCliTest'
import coreEventContract from '../support/coreEventContract'

const bookContract: EventContract = {
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
	namespace: namesUtil.toKebab(MERCURY_API_NAMESPACE),
	namespaceCamel: namesUtil.toCamel(MERCURY_API_NAMESPACE),
	namespacePascal: namesUtil.toPascal(MERCURY_API_NAMESPACE),
	imports: [],
	eventSignatures: {
		'did-book': {},
	},
}

const willBookTemplateItem: EventContractTemplateItem = {
	namePascal: 'WillBook',
	nameCamel: 'willBook',
	namespace: namesUtil.toKebab(MERCURY_API_NAMESPACE),
	imports: [],
	namespaceCamel: namesUtil.toCamel(MERCURY_API_NAMESPACE),
	namespacePascal: namesUtil.toPascal(MERCURY_API_NAMESPACE),
	eventSignatures: {
		'will-book': {},
	},
}

const didBookWithNamespaceTemplateItem: EventContractTemplateItem = {
	namePascal: 'DidBook',
	nameCamel: 'didBook',
	namespace: 'appointments',
	namespaceCamel: 'appointments',
	namespacePascal: 'Appointments',
	imports: [],
	eventSignatures: {
		'appointments.did-book': {},
	},
}

const willBookWithNamespaceTemplateItem: EventContractTemplateItem = {
	namePascal: 'WillBook',
	nameCamel: 'willBook',
	namespace: 'appointments',
	namespaceCamel: 'appointments',
	namespacePascal: 'Appointments',
	imports: [],
	eventSignatures: {
		'appointments.will-book': {},
	},
}

const relatedToRelatedToProximitySchema = buildSchema({
	id: 'relatedToRelatedToProximitySchema',
	fields: {
		onlyField: {
			type: 'text',
		},
	},
})

const relatedToRelatedToProximitySchemaTemplateItem: SchemaTemplateItem = {
	namespace: 'Proximity',
	id: relatedToRelatedToProximitySchema.id,
	nameCamel: 'relatedToRelatedToProximitySchema',
	namePascal: 'RelatedToRelatedToProximitySchema',
	nameReadable: 'relatedToRelatedToProximitySchema',
	schema: {
		...relatedToRelatedToProximitySchema,
		namespace: 'Proximity',
	},
	isNested: true,
	destinationDir: '#spruce/events',
}

const relatedToProximitySchema = buildSchema({
	id: 'relatedToProximitySchema',
	fields: {
		boolField: {
			type: 'boolean',
		},
		relatedToRelatedSchema: {
			type: 'schema',
			options: {
				schema: relatedToRelatedToProximitySchema,
			},
		},
	},
})

const relatedToProximitySchemaTemplateItem: SchemaTemplateItem = {
	namespace: 'Proximity',
	id: relatedToProximitySchema.id,
	nameCamel: 'relatedToProximitySchema',
	namePascal: 'RelatedToProximitySchema',
	nameReadable: 'relatedToProximitySchema',
	schema: {
		id: 'relatedToProximitySchema',
		namespace: 'Proximity',
		fields: {
			boolField: {
				type: 'boolean',
			},
			relatedToRelatedSchema: {
				type: 'schema',
				options: {
					schemaIds: [
						{ id: 'relatedToRelatedToProximitySchema', namespace: 'Proximity' },
					],
				},
			},
		},
	},
	isNested: true,
	destinationDir: '#spruce/events',
}

const proximityEmitPayloadSchema = buildSchema({
	id: 'proximityEmitPayload',
	fields: {
		textField: {
			type: 'text',
		},
		relatedSchema: {
			type: 'schema',
			options: {
				schema: relatedToProximitySchema,
			},
		},
	},
})

const proximityEmitPayloadTemplateItem: SchemaTemplateItem = {
	namespace: 'Proximity',
	id: proximityEmitPayloadSchema.id,
	nameCamel: 'proximityEmitPayload',
	namePascal: 'ProximityEmitPayload',
	nameReadable: 'proximityEmitPayload',
	schema: {
		id: 'proximityEmitPayload',
		namespace: 'Proximity',
		fields: {
			textField: {
				type: 'text',
			},
			relatedSchema: {
				type: 'schema',
				options: {
					schemaIds: [
						{ id: 'relatedToProximitySchema', namespace: 'Proximity' },
					],
				},
			},
		},
	},
	isNested: false,
	destinationDir: '#spruce/events',
}

const contractWithEmitPayload: EventContract = {
	eventSignatures: {
		'proximity.did-enter': {
			emitPayloadSchema: proximityEmitPayloadSchema,
		},
	},
}

const contractWithEmitPayloadTemplateItem: EventContractTemplateItem = {
	namePascal: 'DidEnter',
	nameCamel: 'didEnter',
	namespace: 'proximity',
	namespaceCamel: 'proximity',
	namespacePascal: 'Proximity',
	imports: [
		{
			package: '#spruce/schemas/proximity/proximityEmitPayload.schema',
			importAs: 'proximityEmitPayloadSchema',
		},
	],
	eventSignatures: {
		'proximity.did-enter': {
			emitPayloadSchema: {
				...proximityEmitPayloadTemplateItem,
			},
		},
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
		assert.isFunction(this.itemBuilder.buildTemplateItems)
	}

	@test()
	protected static turnsSingleContractIntoTemplateItem() {
		const { eventContractTemplateItems } = this.itemBuilder.buildTemplateItems([
			bookContract,
		])

		const actual = eventContractTemplateItems[0]

		assert.isEqualDeep(actual, didBookTemplateItem)
	}

	@test(
		'builds emit payload schema into a template item',
		[contractWithEmitPayload],
		[contractWithEmitPayloadTemplateItem],
		[
			relatedToRelatedToProximitySchemaTemplateItem,
			relatedToProximitySchemaTemplateItem,
			proximityEmitPayloadTemplateItem,
		]
	)
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
		expectedEventContractTemplateItems: EventContractTemplateItem[],
		expectedSchemaTemplateItems: SchemaTemplateItem[] = []
	) {
		const {
			eventContractTemplateItems,
			schemaTemplateItems,
		} = this.itemBuilder.buildTemplateItems(contracts)

		assert.isEqualDeep(
			eventContractTemplateItems,
			expectedEventContractTemplateItems
		)

		assert.isEqualDeep(schemaTemplateItems, expectedSchemaTemplateItems)
	}

	@test()
	protected static canPullEventContractSchemaFromCoreEventContract() {
		const { schemaTemplateItems } = this.itemBuilder.buildTemplateItems([
			{
				eventSignatures: {
					'register-events':
						coreEventContract.eventSignatures['register-events'],
				},
			},
		])

		const match = schemaTemplateItems.find(
			(item) => item.id === 'eventContract'
		)
		assert.isTruthy(match)
	}
}
