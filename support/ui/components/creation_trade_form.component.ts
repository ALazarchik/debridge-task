import { Page } from 'playwright';

export default class CreationTradeFormComponent {
    readonly container;
    private readonly connectWalletButton;
    private readonly page;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('.__creation-trade-form');
        this.connectWalletButton = this.container.locator('.btn-primary', { hasText: 'Connect wallet' });
    }

    async connectWallet(): Promise<void> {
        await this.connectWalletButton.click();
    }
}
