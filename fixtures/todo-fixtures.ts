import { test as base } from '@playwright/test'
import { TodoPage } from '../pages/TodoPage'

// Declare the types for our fixture
type MyFixtures = {
  todoPage: TodoPage
}

// Extend the test runner to create your custom fixture
export const test = base.extend<MyFixtures>({

  // Now, we will define the fixture, and provide the fixture function in it
  todoPage: async({ page }, use) => {
    // Create the fixutre instance
    const todoPage = new TodoPage(page)

    await todoPage.goto()

    // Setup pjase: It will navigate to the app and add the todo items
    // since its before the 'use()' method, this setup will be done before each test that uses this fixture.
    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')

    // Pauses the test here, allowing the test to perform your actions
    // The 'use()' call here seperates the beforeEach, and afterEach phases
    await use(todoPage)

    // When you provide a code after 'use()' method, it will be treated as afterEach phase
    await todoPage.removeAll()
  }
})

export { expect } from '@playwright/test'

