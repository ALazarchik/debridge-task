import { BrowserContext, chromium } from 'playwright';
import { test as base } from 'playwright/test';
import path from 'node:path';
import { pages } from '@e2e-pages/pages_index';

export { expect } from 'playwright/test';

export const test = base.extend<ExtendedFixtures>({
    context: async ({}, use) => {
        const pathToExtension = path.join(__dirname, '/assets/metamask');
        const context = await chromium.launchPersistentContext('', {
            channel: 'chromium',
            args: [`--disable-extensions-except=${pathToExtension}`, `--load-extension=${pathToExtension}`],
        });
        await use(context);
        await context.close();
    },
    extensionId: async ({ context }, use) => {
        let [background] = context.serviceWorkers();
        if (!background) background = await context.waitForEvent('serviceworker');

        const extensionId = background.url().split('/')[2];
        await use(extensionId);
    },
    pages: async ({}, use) => {
        await use(pages);
    },
});

type ExtendedFixtures = {
    context: BrowserContext;
    extensionId: string;
    pages: typeof pages;
};
