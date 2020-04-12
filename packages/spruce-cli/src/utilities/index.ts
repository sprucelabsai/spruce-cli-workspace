import NamesUtility from './NamesUtility'
import PackageUtility from './PackageUtility'
import SchemaUtility from './SchemaUtility'
import TsConfigUtility from './TsConfigUtility'
import BootstrapUtility from './BootstrapUtility'

export interface IUtilities {
	names: NamesUtility
	package: PackageUtility
	schema: SchemaUtility
	tsConfig: TsConfigUtility
	bootstrap: BootstrapUtility
}
