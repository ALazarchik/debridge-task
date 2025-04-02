import { test, expect } from '../test_fixture';
import { faker } from '@faker-js/faker';
import testConfig from '@e2e-testConfig';

test.describe('Connect Metamask wallet', () => {
    test('should check balance and address for test wallet', async ({ context, pages, extensionId }) => {
        test.slow();

        const temporaryPassword = faker.internet.password();
        const walletSeed = `${testConfig.walletSeed}`;

        const page = context.pages()[0];
        const metamaskPage = new pages.MetamaskPage(page);

        await metamaskPage.visit(extensionId);
        await context.pages()[0].bringToFront();
        await metamaskPage.metamaskOnboardingComponent.importWallet(walletSeed, temporaryPassword);

        await expect(metamaskPage.loadingSpinner).toHaveCount(0);
        await expect(metamaskPage.appContainer).toHaveCount(1);

        await metamaskPage.selectNetwork('Polygon Mainnet');

        const [newPage] = await Promise.all([context.waitForEvent('page'), context.newPage()]);
        const applicationPage = new pages.ApplicationPage(newPage);
        await applicationPage.visit();

        await expect(applicationPage.pageHeader.container).toHaveCount(1);
        await expect(applicationPage.pageFooter.container).toHaveCount(1);
        await expect(applicationPage.createTradeForm.container).toHaveCount(1);

        await applicationPage.createTradeForm.connectWallet();

        await expect(applicationPage.selectWalletModal.container).toHaveCount(1);

        await applicationPage.selectWalletModal.selectWallet('Metamask');

        await context.pages()[0].bringToFront();
        await metamaskPage.page.reload();

        await expect(metamaskPage.connectModal.container).toHaveCount(1);

        await metamaskPage.connectModal.connect();

        await expect(metamaskPage.loadingSpinner).toHaveCount(0);
        await expect(metamaskPage.appContainer).toHaveCount(1);

        const extensionWalletBalance = await metamaskPage.getWalletBalance();
        const extensionWalletAddress = await metamaskPage.getWalletAddress();

        await context.pages()[2].bringToFront();

        const appAccountBalance = await applicationPage.pageHeader.getAccountBalance();
        const appAccountAddress = await applicationPage.pageHeader.getAccountAddress();

        expect(extensionWalletAddress.slice(0, 4)).toEqual(appAccountAddress.slice(0, 4));
        expect(extensionWalletAddress.slice(extensionWalletAddress.length - 5, 4)).toEqual(
            appAccountAddress.slice(appAccountAddress.length - 5, 4),
        );
        expect(Number(extensionWalletBalance.slice(1, extensionWalletAddress.length - 1))).toEqual(
            Number(appAccountBalance),
        );
    });
});
