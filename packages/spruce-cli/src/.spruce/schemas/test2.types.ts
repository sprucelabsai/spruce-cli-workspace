import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import test2Definition from '../../schemas/test2.definition'

type Test2Definition = typeof test2Definition
export interface ITest2Definition extends Test2Definition {}

aoeuaoeu
export interface ITest2 extends SchemaDefinitionValues<ITest2Definition> {}
export interface ITest2Instance extends Schema<ITest2Definition> {}
