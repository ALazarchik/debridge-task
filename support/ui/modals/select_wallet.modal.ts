import { Page } from 'playwright';

export default class SelectWalletModal {
    readonly container;
    private readonly walletButton;
    private readonly page;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('mat-dialog-container');
        this.walletButton = (wallet: string) => this.page.getByRole('button', { name: wallet });
    }

    async selectWallet(wallet: string): Promise<void> {
        await this.walletButton(wallet).scrollIntoViewIfNeeded();
        await this.walletButton(wallet).click();
    }
}
