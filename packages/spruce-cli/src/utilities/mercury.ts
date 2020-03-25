import { Mercury } from '@sprucelabs/mercury'
import config from './Config'

const mercury = new Mercury({
	spruceApiUrl: config.getApiUrl(config.remote)
})

export default mercury
