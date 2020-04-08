import NamesUtility from './NamesUtility'
import PackageUtility from './PackageUtility'
import SchemaUtility from './SchemaUtility'

export interface IUtilities {
	names: NamesUtility
	package: PackageUtility
	schema: SchemaUtility
}
