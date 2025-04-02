import { Page } from 'playwright';
import { expect } from '../../../test_fixture';

export default class SelectNetworkModal {
    readonly page;
    readonly container;
    private readonly searchInput;
    private readonly searchResults;
    private readonly searchResult;
    private readonly addNetworkButton;

    constructor(page: Page) {
        this.page = page;
        this.container = this.page.locator('[role="dialog"]');
        this.searchInput = this.container.getByTestId('network-redesign-modal-search-input');
        this.searchResults = this.container.locator('[data-testid*="popular-network-"]');
        this.searchResult = (network: string) => this.searchResults.filter({ hasText: network });
        this.addNetworkButton = (network: string) => this.searchResult(network).getByTestId('test-add-button');
    }

    async addNetwork(network: string): Promise<void> {
        await this.searchInput.fill(network);

        await expect(this.searchResult(network)).toHaveCount(1);

        await this.addNetworkButton(network).click();
    }
}
