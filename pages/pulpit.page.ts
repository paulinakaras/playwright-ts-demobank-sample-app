import { Locator, Page } from '@playwright/test';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  doTranferButton: Locator;

  topupReceiver: Locator;
  topupAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpMobileButton: Locator;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.doTranferButton = this.page.getByRole('button', { name: 'wykonaj' });

    this.topupReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topupAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topUpMobileButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });
  }
}
