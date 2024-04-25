import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/')

  await page.getByRole('link', { name: 'Log in' }).click()
  await page.locator('#loginusername').fill('test')
  await page.locator('#loginpassword').fill('test')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()

  // const storagePaths = {
  //   admin: './admin_authorzation.json',
  //   user: './user_authorazation.json',
  //   guest: './guest_authorazation.json'
  // }

  // const getStoragePath = (username) => {
  //   const userType = (username === 'admin') ? 'admin' : 'user'
    
  //   return storagePaths[userType] || storagePaths['guest']
  // }

  // const storagePath = getStoragePath('admin')

  // await page.context().storageState({ path: storagePath})

  await page.context().storageState({ path: './authorization.json'})
})
