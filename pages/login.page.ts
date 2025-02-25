import { Locator, Page } from '@playwright/test';

export class LoginPage {
  loginInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  errorLoginMessage: Locator;
  errorPasswordMessage: Locator;

  constructor(private page: Page) {
    this.loginInput = this.page.getByTestId('login-input');
    this.passwordInput = this.page.getByTestId('password-input');
    this.loginButton = this.page.getByTestId('login-button');
    this.errorLoginMessage = this.page.getByTestId('error-login-id');
    this.errorPasswordMessage = this.page.getByTestId('error-login-password');
  }
}
