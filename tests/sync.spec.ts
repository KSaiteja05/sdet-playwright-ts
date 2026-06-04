import {test, expect} from '@playwright/test';
import {testUsers} from '../fixtures/test-users';

test.describe("Sync Test", () => {
    test("With timeout", async ({page}) => {
        await page.goto('/login');
        const log = page.getByRole('form', {name: 'login'});
        await log.getByLabel('Email').fill(testUsers.customer.email);
        await log.getByLabel('Password').fill(testUsers.customer.password);
        await log.getByRole('button', {name: 'Sign in'}).click();
        await page.waitForTimeout(3000);
    })

    test("Without timeout", async ({page}) => {
        await page.goto('/login');
        const log = page.getByRole('form', {name: 'login'});
        await log.getByLabel('Email').fill(testUsers.customer.email);
        await log.getByLabel('Password').fill(testUsers.customer.password);
        await log.getByRole('button', {name: 'Sign in'}).click();

        await expect(page.getByRole('heading', {name: /welcome/i})).toBeVisible();

        await page.getByRole('heading', {name: /welcome/i}).waitFor({state: 'visible'});
    })
    test("Wait for spinner", async ({page}) => {
        await page.goto('/sync-lab');
        const responsePromise = page.waitForResponse(
            (response) => response.url().includes('/api/products') && response.status() === 200
        );
        await page.getByRole('button', {name: 'Load'}).click();
        await page.getByTestId('spinner').waitFor({state: 'visible'});
        await responsePromise;
        await expect(page.getByText('Retail product results')).toBeVisible();
        // await expect(page.getByTestId('cart-count')).toHaveText('3');
        const c = await page.getByTestId('cart-count').textContent();
        expect(c).toBe('3');
        await expect(page.getByRole('table').first()).toContainText('Name');
        await expect(page.getByRole('row', {name: /category/i})).toBeVisible();
        // await expect(page.getByRole('row').first()).toContainText('Category');
        await expect(page.getByRole('cell', {name: 'Laptop Stand'})).toBeVisible();
    })
    test("Wait for the Response", async ({page}) => {
        await page.goto('/login');
        const responsePromise = page.waitForResponse(
            (response) => response.url().includes('/api/login') && response.status() === 200
        );
        const log = page.getByRole('form', {name: 'login'});
        await log.getByLabel('Email').fill(testUsers.customer.email);
        await log.getByLabel('Password').fill(testUsers.customer.password);
        await log.getByRole('button', {name: 'Sign in'}).click();
        await responsePromise;
        await expect(page.getByRole('heading', {name: /welcome/i})).toBeVisible();
    })
});