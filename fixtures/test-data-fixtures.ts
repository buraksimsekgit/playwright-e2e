import { test as base } from '@playwright/test'
import studentsData from '../test-data/studentsData.json'

export const test = base.extend({
  studentsData: async ({}, use) => {
    await use(studentsData)
  },
})

export { expect } from '@playwright/test'
