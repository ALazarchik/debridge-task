import { TestBrowser } from './browser_context';
import { pages } from './ui/pages/pages_index';
import { Browser } from 'playwright';
import { test as base } from 'playwright/test';

export { expect } from 'playwright/test';

type ExtendedFixtures = {
    pw: PlaywrightExtended;
};

export const test = base.extend<ExtendedFixtures>({
    pw: async ({ browser }, use) => {
        const pw = new PlaywrightExtended(browser);
        await use(pw);
        await pw.testBrowser.close();
    },
});

class PlaywrightExtended {
    readonly testBrowser: TestBrowser;
    readonly pages;

    constructor(browser: Browser) {
        this.testBrowser = new TestBrowser(browser);
        this.pages = pages;
    }
}
