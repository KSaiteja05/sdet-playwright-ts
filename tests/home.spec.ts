import {test,expect} from '@playwright/test';

test("should display welcome message", async ({ page }, testInfo) => {
  await page.goto('/');
  await expect.soft(page).toHaveTitle(/SDET Retail Automa tion Lab/);
  await expect(page).toHaveURL(/\/$/);
  await expect.soft(page.getByRole('heading', {name: 'SDET Retail Automation Lab'})).toBeVisible();
  await page.screenshot({path: `test-results/${testInfo.title}.png`});
});