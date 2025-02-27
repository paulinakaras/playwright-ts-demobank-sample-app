import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('User login to Demobank', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with correct credentials', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const userPassword = loginData.userPassword;
    const expectedUserName = 'Jan Demobankowy';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    // Assert
    const pulpitPage = new PulpitPage(page);
    await expect(pulpitPage.usernameText).toHaveText(expectedUserName);
  });

  test('unsuccessful login with too short username', async ({ page }) => {
    // Arrange
    const invalidUserId = 'tester';
    const expectedErrorLoginMessage = 'identyfikator ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(invalidUserId);
    await loginPage.passwordInput.click();

    // Assert
    await expect(loginPage.errorLoginMessage).toHaveText(
      expectedErrorLoginMessage,
    );
  });

  test('unsuccessful login with too short password', async ({ page }) => {
    // Arrange
    const userId = loginData.userId;
    const invalidUserPassword = 'test';
    const expectedErrorPasswordMessage = 'hasło ma min. 8 znaków';

    // Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(invalidUserPassword);
    await loginPage.passwordInput.blur();

    // Assert
    await expect(loginPage.errorPasswordMessage).toHaveText(
      expectedErrorPasswordMessage,
    );
  });
});
