import { Page } from 'playwright';

export default class ConnectPageModal {
    readonly page;
    readonly container;
    private readonly confirmButton;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.getByTestId('connect-page');
        this.confirmButton = this.container.getByTestId('confirm-btn');
    }

    async connect(): Promise<void> {
        await this.confirmButton.click();
    }
}
