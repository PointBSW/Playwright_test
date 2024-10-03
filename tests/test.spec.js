// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test('TC01', async ({ page }) => {
    // await page.goto('https://practicetestautomation.com/practice-test-login/');
    // await page.getByLabel('Username').fill('student');
    await page.locator('#username').fill('student');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    const currentURL = page.url();
    expect(currentURL).toBe('https://practicetestautomation.com/logged-in-successfully/');
    console.log(page.url('https://practicetestautomation.com/logged-in-successfully/'));
    await page.screenshot({ path: './tests/img/login.png' });

});

test('TC02', async ({ page }) => {
    await page.locator('#username').fill('incorrectUser');
    await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();
    // await expect(page.locator('#error')).toHaveText('Your username is invalid!'); //ex1
    // await expect(page.locator('#error')).toContainText('Your username is invalid!'); //ex2
    // const errorText = await page.locator('#error').textContent(); //ex3
    // expect(errorText).toContain('Your username is invalid!'); //ex3

    const errorLocator = page.locator('#error'); //ex4
    const errorText = await errorLocator.textContent();
    console.log('Error text:', errorText);
    expect(errorText).toContain('Your username is invalid!', `Expected error message not found. Actual text: "${errorText}"`);
    await expect(errorLocator).toBeVisible('The error message should be visible to the user.');

});

test('TC03', async ({ page }) => {
    await page.locator('#username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.locator('#error')).toHaveText('Your password is invalid!');

});