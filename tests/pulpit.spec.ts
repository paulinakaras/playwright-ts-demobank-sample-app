import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {

    test('test', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('testerLO');
        await page.getByTestId('password-input').fill('asdfgh12');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('2');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('zwrot srodkow');
        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        await page.getByRole('link', { name: 'Przelew wykonany! Chuck Demobankowy - 120,00PLN - zwrot srodkow' })
        
        // await expect().toHaveText('hasło ma min. 8 znaków');
    });
});