import { test, expect } from '@playwright/test';

const baseURL = 'http://localhost:3000';
var amount = "200";
var comment = "testing note";

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL+'/signin');
  await page.locator('input[name="username"]').fill('Allie2');
  await page.locator('input[name="password"]').fill('s3cret');
  await page.locator('data-test=signin-submit').click();
  await page.locator('data-test=nav-top-new-transaction').click();
});

test('New transaction - choose profile by search bar', async ({ page }) => {
  //Arrange
  var existingProfile = "Ibrahim Dickens";
  var searchBar = page.locator('#user-list-search-input');
  await searchBar.fill(existingProfile);
  await page.locator('text=Ibrahim Dickens').click();

  //Act
  await page.locator('#amount').fill(amount);
  await page.locator('#transaction-create-description-input').fill(comment);
  await page.locator('data-test=transaction-create-submit-payment').click();

  //Assert  
  await expect(page.locator('text=Paid $200.00 for testing note')).toBeTruthy();  
});

test('New transaction - choose visible profile', async ({ page }) => {
  
  //Arrange
  var userList = page.locator('data-test=users-list');
  await userList.locator('text=Edgar Johns').click();

  //Act
  await page.locator('#amount').fill(amount);
  await page.locator('#transaction-create-description-input').fill(comment);
  await page.locator('data-test=transaction-create-submit-payment').click();

  //Assert  
  await expect(page.locator('text=Paid $200.00 for testing note')).toBeTruthy();  
});