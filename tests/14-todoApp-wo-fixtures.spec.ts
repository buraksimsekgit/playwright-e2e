/**
 * Visits the todo page
 * before every test it will add item 1 and item 2 to the todolist
 * first test will add their own todo for eg. test1: 'own item'
 * second test will remove any todo for eg. remove 'item1'
 * after each test we will remove everything on the list
 */

import { test } from '@playwright/test'
import { TodoPage } from '../pages/TodoPage'

test.describe('todo tests', async () => {
  let todoPage: TodoPage
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page)

    await todoPage.goto()

    await todoPage.addTodo('item1')
    await todoPage.addTodo('item2')
  })

  test.afterEach(async () => {
    await todoPage.removeAll()
  })

  test('should add an item', async() => {
    await todoPage.addTodo('My Item')
  })

  test('should remove an item', async() => {
    await todoPage.remove('Item1')
  })
})

/**
 * Before each test, it will add 'item12 and 'item2'
 * Then it runs the first test block, and add 'My Item'
 * And afterEach block runs, and removes all the items n the todo list
 * 
 * 2n test starts
 * Before each test, it will add 'item12 and 'item2'
 * Then second test runs, and removes 'item1' from the list so only 'item2' remains
 * And afterEach block runs, and removes all the items n the todo list
 */
