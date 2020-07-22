import { test, assert } from '@sprucelabs/test'
import AbstractSchemaTest from '../../AbstractSchemaTest'
import { CORE_NAMESPACE, LOCAL_NAMESPACE } from '../../constants'
import diskUtil from '../../utilities/disk.utility'

export default class SchemaStoreTest extends AbstractSchemaTest {
	@test()
	protected static async canInstantiateSchemaStore() {
		assert.isOk(this.Store('schema'))
	}

	@test()
	protected static async hasFetchSchemaTemplateItemsMethod() {
		assert.isFunction(this.Store('schema').fetchSchemaTemplateItems)
	}

	@test()
	protected static async fetchesCoreSchemaTemplateItems() {
		const response = await this.Store('schema').fetchSchemaTemplateItems(
			this.resolvePath('nothing_found')
		)

		const { items } = response

		assert.isAbove(items.length, 0)

		const userTemplateItem = items.find(
			(item) => item.namespace === CORE_NAMESPACE && item.id === 'person'
		)

		assert.isOk(userTemplateItem)
	}

	@test()
	protected static async fetchesLocalSchemasToo() {
		await this.syncSchemas('schema-store')

		const schemasDir = this.resolvePath('src', 'schemas')
		diskUtil.copyDir(this.resolveTestPath('testSchemas'), schemasDir)

		const results = await this.Store('schema').fetchSchemaTemplateItems(
			schemasDir
		)

		const { items } = results

		const localItems = items.filter(
			(item) => item.namespace === LOCAL_NAMESPACE
		)

		assert.isEqual(localItems.length, 2)
	}
}
