import {test,expect} from '@playwright/test';
import {testUsers} from '../fixtures/test-users';

test.describe("Login Flow" , () => {

    test("Fill and Submit Form", async ({page}) => {
        await page.goto('/login');
        const LoginForm = page.getByRole('form', {name: 'login'});

        await LoginForm.getByLabel('Email').fill(testUsers.customer.email);
        await LoginForm.getByLabel('Password').fill(testUsers.customer.password);
        await LoginForm.getByRole('button', {name: 'Sign in'}).click();
        await expect(page.getByRole('heading', {name: /welcome/i, level: 1})).toBeVisible();
        await expect(page.getByRole('link', {name: 'Preview products'})).toBeVisible();
        await page.getByRole('button', {name: 'Sign out'}).click();
        
    })
    test("Failure Path", async ({page}) => {
        const Log = page.getByRole('form', {name: 'login'});
        await page.goto('/login');
        await Log.getByLabel('Email').pressSequentially(testUsers.invalid.email);
        await Log.getByLabel('Password').pressSequentially(testUsers.invalid.password);
        await Log.getByRole('button', {name: 'Sign in'}).click();
        await expect(page).toHaveURL(/\/login$/);
        await expect(page.getByRole('alert')).toContainText(/invalid credentials/i);
        await expect(page.getByRole('heading', {name: /welcome/i})).not.toBeVisible();
    })
});