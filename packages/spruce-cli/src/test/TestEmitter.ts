import CliGlobalEmitter, { globalContract } from '../GlobalEmitter'

export default class TestEmitter extends CliGlobalEmitter {
	public static TestEmitter() {
		return new TestEmitter(globalContract)
	}

	public hasListeners(eventName: string) {
		return !!this.listenersByEvent[eventName]
	}
}
