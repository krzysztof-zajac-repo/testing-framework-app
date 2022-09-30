import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

const baseURL = 'http://localhost:3000';
var firstName = faker.name.findName.toString();
var secondName = faker.name.lastName.toString();
var username = faker.internet.domainName.toString();
var password = faker.internet.password.toString();

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    var singUpLink = page.locator('data-test=signup');
    await singUpLink.press('Enter');
    var pageTitle = page.locator('data-test=signup-title');
    await expect(pageTitle).toBeVisible();    
});

test('Register new user with correct data', async ({ page }) => {
    //Arrange
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(secondName); 
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#confirmPassword').fill(password);
    await page.locator('data-test=signup-submit').click();
    
    //Act
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('data-test=signin-submit').click();

    //Assert
    await expect(page.locator('data-test=user-onboarding-dialog-title')).toBeVisible();
});

test('Check password length validation', async ({ page }) => {
    //Arrange
    var tooShortPassword = "123"

   //Act
   await page.locator('#firstName').fill(firstName);
   await page.locator('#lastName').fill(secondName); 
   await page.locator('#username').fill(username);
   await page.locator('#password').fill(tooShortPassword);

   //Assert
   await expect(await page.locator('#password-helper-text')).toHaveText("Password must contain at least 4 characters");
});

test('Check password validation in confirmPassword field', async ({ page }) => {
    //Arrange
    var wrongPasword = "1233"
    
   //Act
   await page.locator('#firstName').fill(firstName);
   await page.locator('#lastName').fill(secondName); 
   await page.locator('#username').fill(username);
   await page.locator('#password').fill(password);
   await page.locator('#confirmPassword').fill(wrongPasword);

   //Assert
   await expect(await page.locator('#confirmPassword-helper-text')).toHaveText("Password does not match");
});