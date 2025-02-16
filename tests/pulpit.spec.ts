import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
  // test.describe.configure({ retries: 3 }); // configuration for flaky test

  test.beforeEach(async ({ page }) => {
    const userId = 'tester01';
    const userPassword = 'test1234';

    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();
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

    await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
    await page.locator('#widget_1_transfer_amount').fill(transferAmount);
    await page.locator('#widget_1_transfer_title').fill(transferTitle);
    await page.getByRole('button', { name: 'wykonaj' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessagge);
  });

  test('successful mobile top-up', async ({ page }) => {
    // Arrange
    const topupReceiver = '500 xxx xxx';
    const topupAmount = '40';
    const expectedTopupMessage = `Doładowanie wykonane! ${topupAmount},00PLN na numer ${topupReceiver}`;

    // Act
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#widget_1_topup_receiver').selectOption(topupReceiver);
    await page.locator('#widget_1_topup_amount').fill(topupAmount);
    await page.locator('#uniform-widget_1_topup_agreement span').click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    // Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedTopupMessage,
    );
  });
});
