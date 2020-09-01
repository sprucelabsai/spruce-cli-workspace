/*global const*/
export const HASH_SPRUCE_DIR = 'src/.spruce' as const
export const LATEST_TOKEN = '@latest' as const
export const LATEST_HANDLEBARS = `{{${LATEST_TOKEN}}}`
export const CORE_SCHEMA_VERSION = {
	intValue: 20200623,
	constValue: 'v2020_07_22',
	dirValue: 'v2020_07_22',
} as const

export const CORE_NAMESPACE = 'Spruce' as const
export const LOCAL_NAMESPACE = 'Local' as const
export const TEST_JEST_PASSED = 'passed' as const
export const TEST_JEST_FAILED = 'failed' as const
