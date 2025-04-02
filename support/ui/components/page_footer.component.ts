import { Page } from 'playwright';

export default class PageFooterComponent {
    readonly container;
    private readonly page;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('.__footer');
    }
}
