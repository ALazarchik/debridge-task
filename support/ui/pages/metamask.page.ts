import { Page } from 'playwright';
import { components } from '@e2e-components/components_index';
import { modals } from '@e2e-modals/modals_index';
import { expect } from '../../../test_fixture';

export default class MetamaskPage {
    readonly metamaskOnboardingComponent;
    readonly appContainer;
    readonly loadingSpinner;
    readonly selectNetworkModal;
    readonly metamaskConfirmationModal;
    readonly connectModal;
    readonly page;
    private readonly walletBalance;
    private readonly networkDropdown;
    private readonly copyAddressButton;

    constructor(page: Page) {
        this.page = page;
        this.metamaskOnboardingComponent = new components.MetamaskOnboardingComponent(this.page);
        this.appContainer = this.page.locator('#app-content');
        this.loadingSpinner = this.page.locator('.spinner');
        this.networkDropdown = this.page.getByTestId('network-display');
        this.selectNetworkModal = new modals.SelectNetworkModal(this.page);
        this.metamaskConfirmationModal = new modals.MetamaskConfirmationModal(this.page);
        this.walletBalance = this.appContainer.getByTestId('account-value-and-suffix');
        this.connectModal = new modals.ConnectPageModal(this.page);
        this.copyAddressButton = this.appContainer.getByTestId('app-header-copy-button');
    }

    async visit(extensionId: string): Promise<void> {
        await this.page.goto(`chrome-extension://${extensionId}/home.html`);
    }

    async selectNetwork(network: string): Promise<void> {
        await this.networkDropdown.click();
        await this.selectNetworkModal.addNetwork(network);
        await this.metamaskConfirmationModal.confirm();
    }

    async getWalletBalance(): Promise<string> {
        await expect(this.walletBalance).toHaveCount(1);
        return this.walletBalance.innerText();
    }

    async getWalletAddress(): Promise<string> {
        await expect(this.copyAddressButton).toHaveCount(1);
        return this.copyAddressButton.innerText();
    }
}
