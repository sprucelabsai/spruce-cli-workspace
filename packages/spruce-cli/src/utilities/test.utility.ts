function hasArg(regex: RegExp) {
	return !!process.argv?.find(arg => arg.search(regex) > -1)
}

const testUtil = {
	shouldClearCache() {
		return hasArg(/clear.*?skill.*?cache/gi)
	},
	isCacheEnabled() {
		return !hasArg(/no.*?skill.*?cache/gi)
	}
}

export default testUtil
