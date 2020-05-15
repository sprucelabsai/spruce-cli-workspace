/* eslint-disable spruce/prefer-pascal-case-enums */
// Import base class
import AbstractService from '../../src/services/AbstractService'
// Import each matching class that will be autoloaded
import { IServiceOptions } from '../../src/services/AbstractService'
import Child from '../../src/services/ChildService'
import Feature from '../../src/services/FeatureService'
import Lint from '../../src/services/LintService'
import Pin from '../../src/services/PinService'
import Pkg from '../../src/services/PkgService'
import ValueType from '../../src/services/ValueTypeService'
import Vm from '../../src/services/VmService'
import VsCode from '../../src/services/VsCodeService'

// Import necessary interface(s)

export interface IServices {
	[service: string]:
		| Child
		| Feature
		| Lint
		| Pin
		| Pkg
		| ValueType
		| Vm
		| VsCode
	child: Child
	feature: Feature
	lint: Lint
	pin: Pin
	pkg: Pkg
	valueType: ValueType
	vm: Vm
	vsCode: VsCode
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

export default async function autoloader(options: {
	constructorOptions: IServiceOptions
	after?: (instance: AbstractService) => Promise<void>
}): Promise<IServices> {
	const { constructorOptions, after } = options

	const child = new Child(constructorOptions)
	if (after) {
		await after(child)
	}
	const feature = new Feature(constructorOptions)
	if (after) {
		await after(feature)
	}
	const lint = new Lint(constructorOptions)
	if (after) {
		await after(lint)
	}
	const pin = new Pin(constructorOptions)
	if (after) {
		await after(pin)
	}
	const pkg = new Pkg(constructorOptions)
	if (after) {
		await after(pkg)
	}
	const valueType = new ValueType(constructorOptions)
	if (after) {
		await after(valueType)
	}
	const vm = new Vm(constructorOptions)
	if (after) {
		await after(vm)
	}
	const vsCode = new VsCode(constructorOptions)
	if (after) {
		await after(vsCode)
	}

	const siblings: IServices = {
		child,
		feature,
		lint,
		pin,
		pkg,
		valueType,
		vm,
		vsCode
	}

	return siblings
}
