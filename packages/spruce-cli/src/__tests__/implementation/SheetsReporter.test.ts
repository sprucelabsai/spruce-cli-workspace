import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import { GoogleSpreadsheet } from 'google-spreadsheet'
import { TEST_JEST_PASSED, TEST_JEST_FAILED } from '../../constants'
import GoogleSpreadsheetAdapter from '../../jest/GoogleSpreadsheetAdapter'
import SheetsReporter, {
	SheetsReporterUtil,
	ITestMap
} from '../../jest/SheetsReporter'
import { IGoogleSheetsAdapter, IJestTestResult } from '../../types/jest.types'

export default class SheetsReporterTest extends AbstractSpruceTest {
	private static adapter: IGoogleSheetsAdapter
	private static reporter: SheetsReporter
	private static privateKey =
		'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDgdaghhpm2GErk\nOMV5fW0k/cVCF5IGQYiOwhdCY1IVgYibnTkY7QCQ/LcxYVLOjvF3E5pLaHs0LLmR\npw9FjJRmf2YaBeXaEaKil/1B48dvTxHgMsG06APzoXYJ1eavxpGPW6HNCJXq3kGe\nz2fFBINQp3P0pnpboNBX7ax4JVotQ3x0wH1cH8chKZbRxtLZgZIWykEfuKZGmZCy\nRr4WPJfB/pa+YflbquFB8oCGdlRFyETaC0vhp9qnqAZ+12fGVVmLrMbD8xAGBDnX\na2EATdAK24kvAbt9cqPfsp+ZOQFyUSBoxdfDMq5REpUO3B/icrUiE0Qir+4hJfZN\nYDRWkpGdAgMBAAECggEAKwaSqH6HJ28np/Cz9dJToiQc9ErVXGqidQ8Ca2DjgqjW\nWVH9eGgx1BkFOqt3to2S/qrcyDiqaTlrht55oHDOn4krNrDLuw3nWXh9/OvfNlh3\nSj0ggX96BnD8Ue1VL3uGOm8rqERNjHx3IqyKLStsyoCWyx5AVSER3tD53vv1+bfa\nkY/fyovOIaZEype+fdsgYnmHkDYsgS57LVOYcvNHBUwZGDSP8mFSD6ta+urEswQM\nqaVvHi+sm8P5L1o5wWeZiubk/mrdTFiJ3xqpi13mpYLgyw5RVfc+eK+ljePA50CG\ngKJktcnEC/7U4k00za/DNPShxaVKVP8729q3OF76xwKBgQDzmOBzCK4NG6i2fuI+\niksxOIanpiMrG6Wsgqe9nbm8KrhAnIIId6jB9XB79CqqwRp8tgBGdD0796cfnPkr\n5fU26XnigHM6YOH8lgPkrzTYFjUe6jYixiOTgS14c6eHRhY//QIrQD9rkLr3Eg/g\nVaFlNCcwoFzYzuEWlJkofnDwCwKBgQDr41Wvp7nkYNmvbendoLjyO8AZSq3JrWnk\nx+lOFHCZfjUO2oxWMQBkLVTBSZ9FbOcXcsrTJFhGCKWJorfZemVvRo9Jwruj0Phr\nQZOm8nurcAn8jejh0RXk+benuMDKC27QtMf/SKDqihPsa40QU3Ov6oB+2vU2RFQ9\n8CyEfbhF9wKBgQDMXWeAWrna2WeTo6OfoFow8yFVKTa8BbfaoMqlc9vNF3H5EtSs\n0ebMwmMaOuBI3TShh/d3JDHzS3P0O7d3srck2H+fHPCO+5TcWebuRmdpGkh6pTfB\nuMVEDM3fDfhwrsYf7N2S95W9YnDYs1iKdoyu4TA3xXHfmsCQNx6/MEUDvQKBgEp7\nBHIrHnnqzrEinmY5OkxZ62TQ/KCiXb48FQFvWMJOZEhlX0xTupDm80z4hw6vvSPd\nPgd/AVRTpJkZxL0pdV+2QsYCc6bc86NCGHHtPHk8LhsNX8v1bdlXs9KEdnMVOw8x\nFbkYYJ7NrE7JAsh14SBZhesIDcbtuj+4VwYagBWvAoGBALaWmR0vr19cYB+XBDB6\nV4c7SR7YxzRlV0Pni3RHL5aw+9MgK7lUInjPDwCd08G6I7e3tgP/QOqYzlsFm7VQ\npP9/1Ob+D8aXl3QGN5C+3Zc66cvJwdwF3fQC0wkVr+6fqLpTlxvE4c6/GSWxZagC\nyFZ/+Aw1nQoC5iKjjvUA7u2H\n-----END PRIVATE KEY-----\n'
	private static serviceEmail = 'sprucebot@appspot.gserviceaccount.com'

	protected static async beforeEach() {
		super.beforeEach()
		this.reporter = new SheetsReporter({
			sheetId: '1DoWM7mYgGDa-PJXptLomrZmbIBZiuxS1YiAsRXU2Gm0',
			worksheetId: '843037832',
			testMap: {}
		})
		this.adapter = new GoogleSpreadsheetAdapter({
			serviceEmail: this.serviceEmail,
			privateKey: this.privateKey
		})
	}

	@test()
	protected static canCreateSheetReporter() {
		assert.isOk(this.reporter)
	}

	@test()
	protected static async canFilterMappedTests() {
		const testResults: IJestTestResult[] = [
			{
				title: 'willPass',
				status: TEST_JEST_PASSED
			},
			{
				title: 'canBootCli',
				status: TEST_JEST_PASSED
			},
			{
				title: 'canSetupSchemas',
				status: TEST_JEST_FAILED
			},
			{
				title: 'canSyncSchemas',
				status: TEST_JEST_FAILED
			}
		]

		const testMap: ITestMap = {
			canBootCli: 'A1',
			didSyncSchemas: 'A2'
		}

		const results = SheetsReporterUtil.getMappedTests(testMap, testResults)
		const cliTest = results.map(r => r.title === 'canBootCli')
		const canSyncTest = results.map(r => r.title === 'canSyncSchemas')

		assert.isOk(cliTest)
		assert.isOk(canSyncTest)
	}

	@test()
	protected static async canCreateGoogleSheetAdapter() {
		assert.isOk(this.adapter)
	}

	@test()
	protected static async canUpdateCellToString() {
		const sheetId = '1MFb9AkB8sm7rurYew8hgzrXTz3JDxOFhl4kN9sNQVxw'
		const worksheetId = 610631892

		await this.adapter.updateCell({
			sheetId,
			worksheetId,
			cell: 'A1',
			value: 'It worked!'
		})

		// make sure it actually worked
		const doc = new GoogleSpreadsheet(sheetId)

		await doc.useServiceAccountAuth({
			// eslint-disable-next-line @typescript-eslint/camelcase
			client_email: this.serviceEmail,
			// eslint-disable-next-line @typescript-eslint/camelcase
			private_key: this.privateKey
		})

		await doc.loadInfo()

		debugger
	}
}
