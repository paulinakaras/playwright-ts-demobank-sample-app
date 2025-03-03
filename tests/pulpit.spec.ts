import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); // configuration for flaky test
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);

    pulpitPage = new PulpitPage(page);
  });

  test('quick payment with correct data', async ({ page }) => {
    // Arrange
    const receiverId = '2';
    const transferAmount = '120';
    const transferTitle = 'zwrot srodkow';
    const expectedTransferReceiver = 'Chuck Demobankowy';
    const expectedMessagge = `Przelew wykonany! ${expectedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    // Act
    await page.waitForLoadState('domcontentloaded');

    await pulpitPage.doQuickPayment(receiverId, transferAmount, transferTitle);

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedMessagge);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '40';
    const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act
    await page.waitForLoadState('domcontentloaded');

    await pulpitPage.topUpMobile(topupReceiver, topupAmount);

    // Assert
    await expect(pulpitPage.messageText).toHaveText(expectedTopupMessage);
  });

  test('correct balance after successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '40';
    const initialBalance = await page.locator('#money_value').innerText();
    const expectedBalance = Number(initialBalance) - Number(topupAmount);

    // Act
    await page.waitForLoadState('domcontentloaded');

    await pulpitPage.topUpMobile(topupReceiver, topupAmount);

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
