import { Browser, BrowserContext, Page } from 'playwright';
import testConfig from '@e2e-testConfig';

export class TestBrowser {
    readonly browser: Browser;
    context: BrowserContext | null;

    constructor(browser: Browser) {
        this.browser = browser;
        this.context = null;
    }

    async close(): Promise<void> {
        if (this.context) {
            await this.context.close();
        }
    }
}
