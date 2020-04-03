import SchemaGenerator from './Schema'
import CoreGenerator from './Core'
import ErrorGenerator from './Error'

export interface IGenerators {
	schema: SchemaGenerator
	core: CoreGenerator
	error: ErrorGenerator
}
