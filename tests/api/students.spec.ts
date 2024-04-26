import { test, expect } from '../../fixtures/test-data-fixtures'
import compareResponseWithRequest from '../../helpers/compareResponseWithRequest'
import runQuery from '../../helpers/dbUtils'

test.describe.configure({ mode: 'serial' })

test.describe('Students', async () => {
  let studentId

  test('Create a new student using POST', async ({ request, studentsData }) => {
    const response = await request.post(process.env.API_ENDPOINT, {
      // headers: {
      //   Accept: 'application/json',
      //   Authorization: 'Bearer 12312dawmdm21d12de12'
      // },
      data: studentsData.postRequestBody,
    })

    expect(response.ok()).toBeTruthy()

    const statusCode = response.status()
    console.log('Status Code: ' + statusCode)

    const responseBody = await response.json()
    console.log(responseBody)

    const name = responseBody.FIRST_NAME
    console.log(name + ' IS THE RESPONSE')

    studentId = responseBody.ID

    // expect(responseBody).toEqual(studentsData.postRequestBody)

    // for (const key in studentsData.postRequestBody) {
    //   if (key === 'DOB') {
    //     const receivedString = responseBody[key].split('T')[0]
    //     expect(receivedString).toBe(studentsData.postRequestBody[key])
    //   } else {
    //     expect(responseBody[key]).toBe(studentsData.postRequestBody[key])
    //   }
    // }

    compareResponseWithRequest(responseBody, studentsData.postRequestBody)

    const query = `SELECT * FROM student WHERE email = '${studentsData.postRequestBody.EMAIL}'`

    const result = await runQuery(query)
    console.log(result)

    expect(result).toBeDefined()
    expect(result.length).toBe(1)
  })

  test('Create a new request using GET', async ({ request, studentsData }) => {
    const response = await request.get(`${process.env.API_ENDPOINT}/${studentId}`)

    expect(response.ok()).toBeTruthy()
    const responseBody = await response.json()
    console.log(responseBody)

    compareResponseWithRequest(responseBody, studentsData.postRequestBody)
  })

  test('Update a request using PUT', async ({ request, studentsData }) => {
    const response = await request.put(`${process.env.API_ENDPOINT}/${studentId}`, {
      data: studentsData.putRequestBody
    })

    expect(response.ok()).toBeTruthy()
    const responseBody = await response.text()
    console.log(responseBody)
  })

  test('Delete the user using DELETE', async ({ request, studentsData }) => {
    const response = await request.delete(`${process.env.API_ENDPOINT}/${studentId}`)
    expect(response.ok()).toBeTruthy()
  
    const query = `SELECT * FROM student WHERE email = '${studentsData.putRequestBody.EMAIL}'`
    const result = await runQuery(query)

    expect(result.length).toBe(0)
  })
})
