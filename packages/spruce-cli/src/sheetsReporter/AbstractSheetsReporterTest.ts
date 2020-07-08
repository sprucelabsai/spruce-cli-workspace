import AbstractCliTest from '../AbstractCliTest'
import SheetsReporterTestAdapter from './adapters/TestAdapter'
import { SheetsReporterUtility } from './SheetsReporterUtility'

const sheetsAdapterPath = SheetsReporterUtility.resolveAdapterPath(
	process.env.SHEETS_REPORTER_ADAPTER_TEST ?? 'TestAdapter'
)

const AdapterClass = require(sheetsAdapterPath).default

export default class AbstractSheetsReporterTest extends AbstractCliTest {
	protected static sheetsAdapter: SheetsReporterTestAdapter = new AdapterClass({
		serviceEmail: process.env.GOOGLE_SERVICE_EMAIL_TEST as string,
		privateKey: process.env.GOOGLE_SERVICE_PRIVATE_KEY_TEST as string,
	})
}
