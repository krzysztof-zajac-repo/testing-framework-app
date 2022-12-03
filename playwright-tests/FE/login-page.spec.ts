import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
var usernameField;
var passwordField;
var submitButton;

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    usernameField = page.locator('#username');
    passwordField = page.locator('#password');
    submitButton = page.locator('data-test=signin-submit');
});

test('Log into app with correct credentials', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await expect(usernameField).toBeVisible();
    await usernameField.fill('Allie2');
    await expect(passwordField).toBeVisible();
    await passwordField.fill('s3cret');
    await submitButton.click();

    //Assert
    var balance = page.locator('data-test=sidenav-user-balanse');
    await expect(balance).toHaveText('$1,648.67');
});

test('Log into app with incorrect credentials', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await usernameField.fill('Allie2');
    await passwordField.fill('s3cret');
    await submitButton.click();

    //Assert
    var error_message = page.locator('data-test=signin-error');
    await expect(error_message).toHaveText('Username or password is invalid');
});

test('Check fields error messages', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await passwordField.fill('123');
    var remember_me_checkbox = page.locator('data-test=signin-remember-me:input[type=checkbox]');
    
    //Assert
    const username_error_message = page.locator('#username-helper-text');
    await expect(username_error_message).toHaveText('Username is required');
    // const password_error_message = page.locator('#password-helper-text');
    // await expect(password_error_message).toHaveText('Password must contain at least 4 characters');
});
