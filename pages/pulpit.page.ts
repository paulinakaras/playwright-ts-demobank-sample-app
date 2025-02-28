import { Locator, Page } from '@playwright/test';
import { SideMenuComponent } from '../components/side-menu.component';

export class PulpitPage {
  transferReceiver: Locator;
  transferAmount: Locator;
  transferTitle: Locator;
  doTranferButton: Locator;

  closeButton: Locator;

  messageText: Locator;

  topupReceiver: Locator;
  topupAmount: Locator;
  topUpAgreementCheckbox: Locator;
  topUpMobileButton: Locator;

  moneyValue: Locator;
  usernameText: Locator;

  sideMenu: SideMenuComponent;

  constructor(private page: Page) {
    this.transferReceiver = this.page.locator('#widget_1_transfer_receiver');
    this.transferAmount = this.page.locator('#widget_1_transfer_amount');
    this.transferTitle = this.page.locator('#widget_1_transfer_title');
    this.doTranferButton = this.page.getByRole('button', { name: 'wykonaj' });

    this.closeButton = this.page.getByTestId('close-button');

    this.messageText = this.page.locator('#show_messages');

    this.topupReceiver = this.page.locator('#widget_1_topup_receiver');
    this.topupAmount = this.page.locator('#widget_1_topup_amount');
    this.topUpAgreementCheckbox = this.page.locator(
      '#uniform-widget_1_topup_agreement span',
    );
    this.topUpMobileButton = this.page.getByRole('button', {
      name: 'doładuj telefon',
    });

    this.moneyValue = this.page.locator('#money_value');
    this.usernameText = this.page.getByTestId('user-name');

    this.sideMenu = new SideMenuComponent(this.page);
  }
}
