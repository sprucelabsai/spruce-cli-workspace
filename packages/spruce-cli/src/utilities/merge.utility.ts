import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'

const mergeUtil = {
	mergeActionResults(...objects: any[]) {
		const isObject = (obj: any) => obj && typeof obj === 'object'
		return objects.reduce((prev, obj) => {
			Object.keys(obj || {}).forEach((key) => {
				const pVal = prev[key]
				const oVal = obj[key]
				if (Array.isArray(pVal) && Array.isArray(oVal)) {
					prev[key] = pVal.concat(...oVal)
					prev[key] = this.makeUnique(prev[key])
				} else if (isObject(pVal) && isObject(oVal)) {
					prev[key] = this.mergeActionResults(pVal, oVal)
				} else {
					prev[key] = oVal
				}
			})
			return prev
		}, {})
	},

	makeUnique(val: any[]): any[] {
		return uniqWith(val, (a: any, b: any) => {
			return isEqual(a, b) || (a.path && b.path && a.path === b.path)
		})
	},
}

export default mergeUtil
