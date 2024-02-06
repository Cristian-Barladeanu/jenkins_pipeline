// @ts-check
const { test, expect } = require('@playwright/test');

test('should open search bar', async ({page}) => {
    await page.goto('/');
    await page.locator('img[alt="Search"]').click();
    const searchBar = page.locator('#input-with-icon-grid-label');
    await expect (searchBar).toBeVisible();
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
    await page.locator('#menuDrawerTrigger').click();
    await expect(page.getByRole('link', { name: 'Despre TV8' })).toBeVisible();
    await expect (page.getByRole('img', { name: 'Inchide' })).toBeVisible();
    await page.close();
})


