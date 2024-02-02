// @ts-check
const { test, expect } = require('@playwright/test');

test('should switch to russian language', async ({page}) => {
    await page.goto('/');
    await page.getByRole('img', { name: 'Menu' }).click();
    await page.locator('#headerMenuDrawer').getByText('Ру').click();
    expect (page.url()).toBe('https://tv8.md/ru');
})

test('should switch to economic news', async ({page}) => {
    await page.goto('/');
    await page.locator('//span[normalize-space()="economic"]').click();
    await page.waitForSelector('//h1[text()="economic"]');
    expect (page.url()).toContain('category/economic');
    await page.close();
})

test('should open side menu', async ({page}) => {
    await page.goto('/');
    await page.getByRole('img', { name: 'Menu' }).click();
    await expect(page.getByRole('link', { name: 'Despre TV8' })).toBeVisible();
    await expect (page.getByRole('img', { name: 'Menu' })).toBeVisible();
    await expect (page.getByRole('img', { name: 'Inchide' })).toBeVisible();
    await page.close();
})


