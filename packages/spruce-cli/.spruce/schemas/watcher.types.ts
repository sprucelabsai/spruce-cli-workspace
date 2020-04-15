import Schema, {
	SchemaDefinitionValues
} from '@sprucelabs/schema'

import watcherDefinition from '../../src/schemas/watcher.definition'

type WatcherDefinition = typeof watcherDefinition
export interface IWatcherDefinition extends WatcherDefinition {}

// Configuration for spruce CLI file watching
export interface IWatcher extends SchemaDefinitionValues<IWatcherDefinition> {}
export interface IWatcherInstance extends Schema<IWatcherDefinition> {}
