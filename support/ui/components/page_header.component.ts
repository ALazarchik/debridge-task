import { Page } from 'playwright';
import { expect } from '../../../test_fixture';

export default class PageHeaderComponent {
    readonly container;
    private readonly page;
    private readonly walletContainer;
    private readonly accountBalance;
    private readonly accountAddress;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('.page-header');
        this.walletContainer = this.page.locator('.wallet-account');
        this.accountBalance = this.walletContainer.locator('.__native-balance');
        this.accountAddress = this.walletContainer.locator('.wallet-account__address');
    }

    async getAccountBalance(): Promise<string> {
        await expect(this.accountBalance).toHaveCount(1);
        return this.accountBalance.innerText();
    }

    async getAccountAddress(): Promise<string> {
        await expect(this.accountAddress).toHaveCount(1);
        return this.accountAddress.innerText();
    }
}
