import { expect } from '@playwright/test'

/**
 * Utility function to compare response body against the request body
 * 
 * @param responseBody 
 * @param requestBody 
 */

function compareResponseWithRequest(responseBody, requestBody) {

  for (const key in requestBody) {
    if (key === 'DOB') {
      const receivedString = responseBody[key].split('T')[0]
      expect(receivedString).toBe(requestBody[key])
    } else {
      expect(responseBody[key]).toBe(requestBody[key])
    }
  }
}

export default compareResponseWithRequest