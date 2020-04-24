// Import base class
import AbstractService from '../../src/services/AbstractService'

// Import each matching class that will be autoloaded
import Child from '../../src/services/ChildService'
import Feature from '../../src/services/FeatureService'
import Pin from '../../src/services/PinService'
import ValueType from '../../src/services/ValueTypeService'
import Vm from '../../src/services/VmService'

// Import necessary interface(s)
import { IServiceOptions } from '../../src/services/AbstractService'

export interface IServices {
	child: Child
	feature: Feature
	pin: Pin
	valueType: ValueType
	vm: Vm
}

export enum Service {
	Feature = 'feature',
	Pin = 'pin',
	ValueType = 'valueType',
	Vm = 'vm',
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
	const pin = new Pin(constructorOptions)
	if (after) {
		await after(pin)
	}
	const valueType = new ValueType(constructorOptions)
	if (after) {
		await after(valueType)
	}
	const vm = new Vm(constructorOptions)
	if (after) {
		await after(vm)
	}

	const siblings: IServices = {
		child,
		feature,
		pin,
		valueType,
		vm
	}

	// @ts-ignore method is optional
	if (typeof child.afterAutoload === 'function') {
		// @ts-ignore method is optional
		child.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof feature.afterAutoload === 'function') {
		// @ts-ignore method is optional
		feature.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof pin.afterAutoload === 'function') {
		// @ts-ignore method is optional
		pin.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof valueType.afterAutoload === 'function') {
		// @ts-ignore method is optional
		valueType.afterAutoload(siblings)
	}
	// @ts-ignore method is optional
	if (typeof vm.afterAutoload === 'function') {
		// @ts-ignore method is optional
		vm.afterAutoload(siblings)
	}

	return siblings
}
