import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payment tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenu.paymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test(
    'simple payment',
    { tag: ['@payment', '@integration'] },
    async ({ page }) => {
      // Arrange
      const transferReceiver = 'Jan Kowalski';
      const transferAccount = '12 3456 7876 5432 4567 7887 65246';
      const transferAmount = '111';
      const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

      // Act
      await page.waitForLoadState('domcontentloaded');

      await paymentPage.makeTransfer(
        transferReceiver,
        transferAccount,
        transferAmount,
      );

      // Assert
      await expect(paymentPage.messageText).toHaveText(expectedMessage);
    },
  );
});
