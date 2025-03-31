import { defineConfig } from 'playwright/test';
import { timeouts } from '@e2e-support/constants';
import testConfig from '@e2e-testConfig';

export default defineConfig({
    forbidOnly: true,
    testDir: 'tests',
    timeout: timeouts.one_minute,
    outputDir: 'test-results',
    workers: 1,
    retries: 0,
    expect: {
        timeout: timeouts.twenty_seconds,
    },
    use: {
        baseURL: testConfig.baseURL,
        ignoreHTTPSErrors: true,
        headless: testConfig.headless,
        locale: 'en-US',
        screenshot: 'only-on-failure',
        timezoneId: 'Europe/Warsaw',
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        actionTimeout: timeouts.thirty_seconds,
    },
    projects: [
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                permissions: [],
                viewport: { width: 1600, height: 900 },
            },
        },
    ],
    reporter: [['html', { open: 'always' }]],
});
