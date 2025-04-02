import { Page } from 'playwright';

export default class MetamaskConfirmationModal {
    readonly page;
    readonly container;
    private readonly confirmButton;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('.confirmation-page');
        this.confirmButton = this.container.getByTestId('confirmation-submit-button');
    }

    async confirm(): Promise<void> {
        await this.confirmButton.click();
    }
}
