// Import base class
import  from ''

// Import each matching class that will be autoloaded
import Thing from '../../src/testing/Thing'
import ThingTwo from '../../src/testing/ThingTwo'

// Import necessary interface(s)

export interface ITesting {
	thing: Thing
	thingTwo: ThingTwo
}

export default async function autoloader(options: {
	constructorOptions: 
	after?: (instance: ) => Promise<void>
}): Promise<ITesting> {
	const { constructorOptions, after } = options

	const thing = new Thing(constructorOptions)
	if (after) {
		await after(thing)
	}
	const thingTwo = new ThingTwo(constructorOptions)
	if (after) {
		await after(thingTwo)
	}

	return {
		thing,
		thingTwo
	}
}
