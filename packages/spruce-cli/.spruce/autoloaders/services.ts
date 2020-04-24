// Import base class
import AbstractService from '../../src/services/AbstractService'

// Import each matching class that will be autoloaded
import Pin from '../../src/services/PinService'
import ValueType from '../../src/services/ValueTypeService'
import Vm from '../../src/services/VmService'

// Import necessary interface(s)
import { IServiceOptions } from '../../src/services/AbstractService'

export interface IServices {
	pin: Pin
	valueType: ValueType
	vm: Vm
}

export default async function autoloader(options: {
	constructorOptions: IServiceOptions
	after?: (instance: AbstractService) => Promise<void>
}): Promise<IServices> {
	const { constructorOptions, after } = options

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
		pin,
		valueType,
		vm
	}

	if (typeof pin.afterAutoload === 'function') {
		pin.afterAutoload(siblings)
	}
	if (typeof valueType.afterAutoload === 'function') {
		valueType.afterAutoload(siblings)
	}
	if (typeof vm.afterAutoload === 'function') {
		vm.afterAutoload(siblings)
	}

	return siblings
}
