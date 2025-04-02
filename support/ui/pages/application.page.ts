import { Page } from 'playwright';
import { components } from '@e2e-components/components_index';
import { modals } from '@e2e-modals/modals_index';
import testConfig from '@e2e-testConfig';

export default class ApplicationPage {
    readonly pageHeader;
    readonly pageFooter;
    readonly createTradeForm;
    readonly selectWalletModal;
    private readonly page;

    constructor(page: Page) {
        this.page = page;
        this.pageFooter = new components.PageFooterComponent(page);
        this.pageHeader = new components.PageHeaderComponent(page);
        this.createTradeForm = new components.CreationTradeFormComponent(page);
        this.selectWalletModal = new modals.SelectWalletModal(page);
    }

    async visit(): Promise<void> {
        await this.page.goto(testConfig.baseURL);
    }
}
