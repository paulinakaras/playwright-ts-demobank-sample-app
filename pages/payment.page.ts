import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PaymentPage {
  transferReceiver: Locator;
  transferAccount: Locator;
  transferAmount: Locator;
  doTransferButton: Locator;

  closeButton: Locator;

  messageText: Locator;

  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiver = this.page.getByTestId('transfer_receiver');
    this.transferAccount = this.page.getByTestId('form_account_to');
    this.transferAmount = this.page.getByTestId('form_amount');
    this.doTransferButton = this.page.getByRole('button', {
      name: 'wykonaj przelew',
    });

    this.closeButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');

    this.sideMenu = new SideMenuComponent(this.page);
  }

  async makeTransfer(
    transferReceiver: string,
    transferAccount: string,
    transferAmount: string,
  ): Promise<void> {
    await this.transferReceiver.fill(transferReceiver);
    await this.transferAccount.fill(transferAccount);
    await this.transferAmount.fill(transferAmount);

    await this.doTransferButton.click();
    await this.closeButton.click();
  }
}
