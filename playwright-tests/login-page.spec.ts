import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
var username_field;
var password_field;
var submit_button;

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    username_field = page.locator('#username');
    password_field = page.locator('#password');
    submit_button = page.locator('data-test=signin-submit');
});

test('Log into app with correct credentials', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await expect(username_field).toBeVisible();
    await username_field.fill('Allie2');
    await expect(password_field).toBeVisible();
    await password_field.fill('s3cret');
    await submit_button.click();

    //Assert
    var balance = page.locator('data-test=sidenav-user-balance');
    await expect(balance).toHaveText('$1,648.67');
});

test('Log into app with incorrect credentials', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await username_field.fill('Allie2');
    await password_field.fill('s3cret1');
    await submit_button.click();

    //Assert
    var error_message = page.locator('data-test=signin-error');
    await expect(error_message).toHaveText('Username or password is invalid');
});

test('Check fields error messages', async ({ page }) => {
    //Arrange
    await expect(page).toHaveTitle(/Cypress Real World App/);

    //Act
    await password_field.fill('123');
    var remember_me_checkbox = page.check('data-test=signin-remember-me:input[type=checkbox]');
    
    //Assert
    const username_error_message = page.locator('#username-helper-text');
    await expect(username_error_message).toHaveText('Username is required');
    // const password_error_message = page.locator('#password-helper-text');
    // await expect(password_error_message).toHaveText('Password must contain at least 4 characters');
});
