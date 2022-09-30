import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

const baseURL = 'http://localhost:3000';
var firstName = faker.name.findName.toString();
var lastName = faker.name.lastName.toString();
var email = faker.internet.email.toString();
var phone = faker.phone.toString();

test.beforeEach(async ({ page }) => {
  await page.goto(baseURL+'/signin');
  await page.locator('input[name="username"]').fill('Allie2');
  await page.locator('input[name="password"]').fill('s3cret');
  await page.locator('data-test=signin-submit').click();
  await page.locator('data-test=nav-top-new-transaction').click();
});

test('Verify on bank accounts list new added item', async ({ page }) => {
  //Arrange
  await page.locator('data-test=sidenav-bankaccounts').click();
  await page.locator('data-test=bankaccount-new').click();

  //Act
  await page.locator('#bankaccount-bankName-input').fill("Mbank");
  await page.locator('#bankaccount-routingNumber-input').fill("123456789");
  await page.locator('#bankaccount-accountNumber-input').fill("123456789");
  await page.locator('data-test=bankaccount-submit').click();

  //Assert  
  await expect(page.locator('text=Mbank').isVisible).toBeTruthy();  
});

test('Delete create bank account', async ({ page }) => {
  //Arrange
  await page.locator('data-test=sidenav-bankaccounts').click();
  await page.locator('data-test=bankaccount-new').click();

  //Act
  await page.locator('#bankaccount-bankName-input').fill("Mbank");
  await page.locator('#bankaccount-routingNumber-input').fill("123456789");
  await page.locator('#bankaccount-accountNumber-input').fill("123456789");
  await page.locator('data-test=bankaccount-submit').click();

  //Assert  
  var createBankAccount = page.locator('text=Mbank');
  await createBankAccount.locator('data-test=bankaccount-delete').click();  
});

test('Verify MyAccount page data', async ({ page }) => {
  //Arrange
  await page.locator('data-test=sidenav-user-settings').click();
  var firstNameInput = page.locator('#user-settings-firstName-input');
  var lastNameInput = page.locator('#user-settings-lastName-input');
  var emailInput = page.locator('#user-settings-email-input');
  var phoneInput = page.locator('#user-settings-phoneNumber-input');

  //Act
  await firstNameInput.fill(firstName);
  await lastNameInput.fill(lastName);
  await emailInput.fill(email);
  await phoneInput.fill(phone);
  await page.locator('data-test=user-settings-submit').click();

  //Assert  
  await expect(firstNameInput).toBe(firstName);  
  await expect(lastNameInput).toBe(lastName);  
  await expect(emailInput).toBe(email);  
  await expect(phoneInput).toBe(phone);  
});