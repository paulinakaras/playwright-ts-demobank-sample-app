import { Locator, Page } from '@playwright/test';

export class QuickPaymentPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  doTranferButton: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.doTranferButton = this.page.getByRole('button', { name: 'wykonaj' });
  }
}
