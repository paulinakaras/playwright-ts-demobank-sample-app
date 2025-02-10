import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    // test.describe.configure({ retries: 3 }); // configuration for flaky test

    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerLO');
        await page.getByTestId('password-input').fill('asdfgh12');
        await page.getByTestId('login-button').click();

        await page.waitForLoadState('domcontentloaded');

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('zwrot srodkow');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Chuck Demobankowy - 120,00PLN - zwrot srodkow');
    });

    test('successful mobile top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerLO');
        await page.getByTestId('password-input').fill('asdfg123');
        await page.getByTestId('login-button').click();

        await page.waitForLoadState('domcontentloaded');

        await page.locator('#widget_1_topup_receiver').selectOption('500 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('40');
        await page.locator('#uniform-widget_1_topup_agreement span').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 500 xxx xxx');
    });
});