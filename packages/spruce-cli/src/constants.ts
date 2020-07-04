export const HASH_SPRUCE_DIR = 'src/.spruce' as const
export const LATEST_TOKEN = '@latest' as const
export const LATEST_HANDLEBARS = `{{${LATEST_TOKEN}}}`
export const CORE_SCHEMA_VERSION = {
	stringVal: '2020-07-23',
	intVal: 20200623,
	constVal: '2020_07_23'
} as const

export const CORE_NAMESPACE = 'Spruce' as const
export const LOCAL_NAMESPACE = 'Local' as const
export const TEST_JEST_PASSED = 'passed' as const
export const TEST_JEST_FAILED = 'failed' as const
