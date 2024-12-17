import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');
  const consentButton = page.getByRole("button", { name: "Consent" });
  if (await consentButton.isVisible()) {
    await consentButton.click()
  }
  await page.getByRole('link', { name: ' Products' }).click();
  const searchBar = page.getByPlaceholder('Search Product');
  expect(searchBar).toBeVisible;
  const blueTopInfoContainer = page.locator('div.productinfo a[data-product-id="1"]')
  await blueTopInfoContainer.hover();
  const addBlueTopButton = page.locator('div.overlay-content a[data-product-id="1"]')
  await addBlueTopButton.waitFor({ state: "visible" })
  await addBlueTopButton.click()
  const modalHeading = page.getByRole("heading", { name: "Added!"});
  expect(modalHeading).toBeVisible;
  await page.getByRole('button', { name: 'Continue Shopping' }).click();
  await page.getByRole('link', { name: 'Cart'}).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByRole('link', { name: 'Register / Login'}).click();
  const signupHeading = page.getByRole('heading', { name: 'New User Signup!'});
  expect(signupHeading).toBeVisible;
});