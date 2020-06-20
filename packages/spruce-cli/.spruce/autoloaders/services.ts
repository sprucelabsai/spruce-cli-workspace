/* eslint-disable spruce/prefer-pascal-case-enums */
// Import necessary interface(s)
// Import each matching class that will be autoloaded
import PinService from '#spruce/../src/services/PinService'
import PkgService from '#spruce/../src/services/PkgService'
import VsCodeService from '#spruce/../src/services/VsCodeService'

export type Services =
	| PinService
	| PkgService
	| VsCodeService

export interface IServices {
	pin: PinService
	pkg: PkgService
	vsCode: VsCodeService
}

export enum Service {
	Child = 'child',
	Feature = 'feature',
	Lint = 'lint',
	Pin = 'pin',
	Pkg = 'pkg',
	ValueType = 'valueType',
	Vm = 'vm',
	VsCode = 'vsCode'
}
