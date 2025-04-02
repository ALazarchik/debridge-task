import { Page } from 'playwright';
import { expect } from '../../../test_fixture';

export default class MetamaskOnboardingComponent {
    readonly welcomeScreen;
    readonly createPasswordScreen;
    readonly creationSuccessScreen;
    readonly pinExtensionScreen;
    readonly metametricsScreen;
    readonly importSrpScreen;
    private readonly onboardingTermsCheckbox;
    private readonly importWalletButton;
    private readonly rejectMetametricsButton;
    private readonly importSrpInputs;
    private readonly importSrpConfirmButton;
    private readonly createPasswordInput;
    private readonly confirmPasswordInput;
    private readonly createPasswordTermsCheckbox;
    private readonly createPasswordImportButton;
    private readonly onboardingCompleteButton;
    private readonly pinExtensionNextButton;
    private readonly pinExtensionDoneButton;
    private readonly page;

    constructor(page: Page) {
        this.page = page;
        this.welcomeScreen = this.page.getByTestId('onboarding-welcome');
        this.onboardingTermsCheckbox = this.welcomeScreen.getByTestId('onboarding-terms-checkbox');
        this.importWalletButton = this.welcomeScreen.getByTestId('onboarding-import-wallet');
        this.metametricsScreen = this.page.getByTestId('onboarding-metametrics');
        this.rejectMetametricsButton = this.metametricsScreen.getByTestId('metametrics-no-thanks');
        this.importSrpScreen = this.page.getByTestId('import-srp');
        this.importSrpInputs = this.importSrpScreen.locator('[type="password"]');
        this.importSrpConfirmButton = this.importSrpScreen.getByTestId('import-srp-confirm');
        this.createPasswordScreen = this.page.getByTestId('create-password');
        this.createPasswordInput = this.createPasswordScreen.getByTestId('create-password-new');
        this.confirmPasswordInput = this.createPasswordScreen.getByTestId('create-password-confirm');
        this.createPasswordTermsCheckbox = this.createPasswordScreen.getByTestId('create-password-terms');
        this.createPasswordImportButton = this.createPasswordScreen.getByTestId('create-password-import');
        this.creationSuccessScreen = this.page.getByTestId('creation-successful');
        this.onboardingCompleteButton = this.creationSuccessScreen.getByTestId('onboarding-complete-done');
        this.pinExtensionScreen = this.page.getByTestId('onboarding-pin-extension');
        this.pinExtensionNextButton = this.pinExtensionScreen.getByTestId('pin-extension-next');
        this.pinExtensionDoneButton = this.pinExtensionScreen.getByTestId('pin-extension-done');
    }

    async submitWalletSeed(walletSeed: string): Promise<void> {
        const seedWords = walletSeed.split(' ');
        const allPasswordInputs = await this.importSrpInputs.all();

        expect(seedWords).toHaveLength(allPasswordInputs.length);

        for (let i = 0; i < allPasswordInputs.length; i++) {
            await allPasswordInputs[i].fill(seedWords[i]);
        }
        await this.importSrpConfirmButton.click();
    }

    async submitNewPassword(password: string): Promise<void> {
        await this.createPasswordInput.fill(password);
        await this.confirmPasswordInput.fill(password);
        await this.createPasswordTermsCheckbox.click();
        await this.createPasswordImportButton.click();
    }

    async importWallet(walletSeed: string, password: string): Promise<void> {
        await expect(this.welcomeScreen).toHaveCount(1);

        await this.onboardingTermsCheckbox.click();
        await this.importWalletButton.click();

        await expect(this.metametricsScreen).toHaveCount(1);

        await this.rejectMetametricsButton.click();

        await expect(this.importSrpScreen).toHaveCount(1);

        await this.submitWalletSeed(walletSeed);

        await expect(this.createPasswordScreen).toHaveCount(1);

        await this.submitNewPassword(password);

        await expect(this.creationSuccessScreen).toHaveCount(1);

        await this.onboardingCompleteButton.click();

        await expect(this.pinExtensionScreen).toHaveCount(1);

        await this.pinExtensionNextButton.click();
        await this.pinExtensionDoneButton.click();
    }
}
