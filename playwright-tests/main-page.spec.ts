import { test, expect } from '@playwright/test';
import { Console } from 'console';

const baseURL = 'http://localhost:3000';

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL+'/signin');
  await page.locator('input[name="username"]').fill('Allie2');
  await page.locator('input[name="password"]').fill('s3cret');
  await page.locator('data-test=signin-submit').click();
});

test('Verify data on side navigation bar', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);
  
  //Act
  var userName = page.locator('data-test=sidenav-username');
  var homeAnchor = page.locator('data-test=sidenav-home');
  var myAccountAnchor = page.locator('data-test=sidenav-user-settings');
  var bankAccountsAnchor = page.locator('data-test=sidenav-bankaccounts');
  var notificationsAnchor = page.locator('data-test=sidenav-notifications');
  var logoutAnchor = page.locator('data-test=sidenav-signout');

  //Assert
  await expect(userName).toHaveText('@Allie2');
  await expect(homeAnchor).toHaveText('Home');
  await expect(myAccountAnchor).toHaveText('My Account');
  await expect(bankAccountsAnchor).toHaveText('Bank Accounts');
  await expect(notificationsAnchor).toHaveText('Notifications');
  await expect(logoutAnchor).toHaveText('Logout');
});

test('Verify myAccount url', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=sidenav-user-settings').click();

  //Assert
  var pageUrl = await page.url();
  await expect(pageUrl).toBe(baseURL+"/user/settings");
});

test('Verify Bank Accounts url', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=sidenav-bankaccounts').click();

  //Assert
  var pageUrl = await page.url();
  await expect(pageUrl).toBe(baseURL+"/bankaccounts");
});

test('Verify side navigation Notifications url', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=sidenav-notifications').click();

  //Assert
  var pageUrl = await page.url();
  await expect(pageUrl).toBe(baseURL+"/notifications");
});

test('Verify top navigation Notifications url', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=nav-top-notifications-count').click();

  //Assert
  var pageUrl = await page.url();
  await expect(pageUrl).toBe(baseURL+"/notifications");
});

test('Verify new transaction url', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=nav-top-new-transaction').click();

  //Assert
  var pageUrl = await page.url();
  await expect(pageUrl).toBe(baseURL+"/transaction/new");
});

test('Verify side navigation toggle', async ({ page }) => {
  
  //Arrange
  await page.goto(baseURL);

  //Act
  await page.locator('data-test=sidenav-toggle').click();
  var sidenav = await page.locator('data-test=sidenav').locator('.MuiPaper-elevation0').isHidden();

  //Assert
  await expect(sidenav).toBeTruthy();
});