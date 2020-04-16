// Import base class
import AbstractService from '../../src/services/AbstractService'

// Import each matching class that will be autoloaded
import Child from '../../src/services/ChildService'
import Pin from '../../src/services/PinService'
import Vm from '../../src/services/VmService'

// Import necessary interface(s)
import { IServiceOptions } from '../../src/services/AbstractService'

export interface IServices {
	child: Child
	pin: Pin
	vm: Vm
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
	const pin = new Pin(constructorOptions)
	if (after) {
		await after(pin)
	}
	const vm = new Vm(constructorOptions)
	if (after) {
		await after(vm)
	}

	return {
		child,
		pin,
		vm
	}
}
