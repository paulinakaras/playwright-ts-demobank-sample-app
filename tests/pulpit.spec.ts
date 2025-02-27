import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); // configuration for flaky test

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
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

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.transferReceiver.selectOption(receiverId);
    await pulpitPage.transferAmount.fill(transferAmount);
    await pulpitPage.transferTitle.fill(transferTitle);
    await pulpitPage.doTranferButton.click();
    await pulpitPage.closeButton.click();

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

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiver.selectOption(topupReceiver);
    await pulpitPage.topupAmount.fill(topupAmount);
    await pulpitPage.topUpAgreementCheckbox.click();
    await pulpitPage.topUpMobileButton.click();
    await pulpitPage.closeButton.click();

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

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.topupReceiver.selectOption(topupReceiver);
    await pulpitPage.topupAmount.fill(topupAmount);
    await pulpitPage.topUpAgreementCheckbox.click();
    await pulpitPage.topUpMobileButton.click();
    await pulpitPage.closeButton.click();

    // Assert
    await expect(pulpitPage.moneyValue).toHaveText(`${expectedBalance}`);
  });
});
