import NamesUtility from './NamesUtility'
import PkgUtility from './PkgUtility'
import SchemaUtility from './SchemaUtility'
import TsConfigUtility from './TsConfigUtility'
import BootstrapUtility from './BootstrapUtility'

export interface IUtilities {
	names: NamesUtility
	pkg: PkgUtility
	schema: SchemaUtility
	tsConfig: TsConfigUtility
	bootstrap: BootstrapUtility
}
