import SchemaGenerator from './SchemaGenerator'
import CoreGenerator from './CoreGenerator'
import ErrorGenerator from './ErrorGenerator'

export interface IGenerators {
	schema: SchemaGenerator
	core: CoreGenerator
	error: ErrorGenerator
}
