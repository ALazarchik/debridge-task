import { Browser, BrowserContext } from 'playwright';

export class TestBrowser {
    readonly browser: Browser;
    context: BrowserContext | null;

    constructor(browser: Browser) {
        this.browser = browser;
        this.context = null;
    }

    async close() {
        if (this.context) {
            await this.context.close();
        }
    }
}
