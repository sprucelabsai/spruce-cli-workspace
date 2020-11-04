const durationUtil = {
	msToFriendly(duration: number): string {
		let milliseconds = (duration % 1000) / 100,
			seconds = Math.floor((duration / 1000) % 60),
			minutes = Math.floor((duration / (1000 * 60)) % 60),
			hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

		let durationStr = ''

		if (hours > 0) {
			durationStr += `${hours}h `
		}

		if (hours > 0 || minutes > 0) {
			durationStr += `${minutes < 10 ? '0' + minutes : minutes}m `
		}

		if (durationStr.length > 0 || seconds > 0) {
			durationStr += `${
				durationStr.length > 0 && seconds < 10 ? '0' + seconds : seconds
			}s `
		}

		if (durationStr.length > 0 || milliseconds > 0) {
			durationStr += `${milliseconds}ms`
		}

		return durationStr
	},
}

export default durationUtil
